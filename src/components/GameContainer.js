import React from 'react'
import Board from './Board'
import AnswerQuestion from './AnswerQuestion'
import ShowAnswer from './ShowAnswer'
import { URL } from '../api_url'

class GameContainer extends React.Component {
    constructor() {
        super()

        this.state = {
            categories: [],
            answeringQuestion: false,
            answer: "",
            currentClue: {answer: ""},
            money: 0
        }
    }

    sanitizeAnswer = answer => {
        let sanitized = answer.replace(/["',!.$-]|(<i>|<\/i>|^a |^the )/g, "")
        sanitized = sanitized.replace(/( and | & )/g, " ")
        return sanitized
    }

    isCorrectAnswer = answer => {
        const sanitizedClueAnswer = this.sanitizeAnswer(this.state.currentClue.answer).toLowerCase()
        const sanitizedUserAnswer = this.sanitizeAnswer(answer).toLowerCase()
        console.log(sanitizedClueAnswer)
        console.log(sanitizedUserAnswer)
        const splitClueAnswer = sanitizedClueAnswer.split(/\/| /g)
        const splitUserAnswer = sanitizedUserAnswer.split(/\/| /g)
        return splitUserAnswer.every(word => splitClueAnswer.includes(word))
    }

    handleSubmitAnswer = event => {
        event.preventDefault()
        this.state.currentClueNode.style.border = "solid black"
        this.state.currentClueNode.children[0].innerText = ""
        if(this.isCorrectAnswer(event.target["answer"].value)) {
            this.setState(prevState => {
                return {
                    answeringQuestion: false,
                    money: prevState.money + parseInt(prevState.currentClue.value),
                }
            })
        } else {
            this.setState(prevState => {
                return {
                    answeringQuestion: false,
                    money: prevState.money - parseInt(prevState.currentClue.value),
                }
            })
        }
    }

    handleClueClick = e => {
        let clueNode
        if(e.target.tagName === "P") {
            clueNode = e.target.parentNode
        } else {
            clueNode = e.target
        }
        console.log(clueNode)
        if(!this.state.answeringQuestion && clueNode.children[0].innerText !== "") {
            clueNode.style.border = "solid yellow"
            const category = this.state.categories.find(category => {
                return category.id === parseInt(clueNode.dataset.categoryId)
            })
            console.log(category)
            console.log(clueNode.dataset.value)
            const clue = category.clues[clueNode.dataset.value]
            this.setState({
                    answeringQuestion: true,
                    currentClue: clue,
                    currentClueNode: clueNode
            })
        }
    }

    hasFirstRoundClues = category => {
        return category.clues.some(clue => clue.value === 100)
    }

    createCategoryObj = category => {
        let cluesObj = {}
        category.clues.forEach(clue => {
            if(!cluesObj[clue.value] && clue.value <= 500) {
                cluesObj[clue.value] = clue
            }
        })
        return {
            id: parseInt(category.id),
            title: category.title.toUpperCase(),
            clues: cluesObj
        }
    }

    getCategory = () => {
        const id = Math.round(Math.random() * 18418)
        const url = URL + `/category?id=${id}`
        fetch(url)
        .then(resp => resp.json())
        .then(category => {
            const newCategoryObj = this.createCategoryObj(category)
            const clueValues = Object.keys(newCategoryObj.clues)
            const keys = ["100", "200", "300", "400", "500"]
            console.log(clueValues)
            if(this.hasFirstRoundClues(category) && keys.every(key => clueValues.includes(key)) ) {
                this.setState(prevState => ({
                    categories: [...prevState.categories, newCategoryObj]
                }))
            } else {
                this.getCategory()
            }
        })
        .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getCategory()
        this.getCategory()
        this.getCategory()
        this.getCategory()
        this.getCategory()
        this.getCategory()
    }

    render() {
        console.log("game container", this.state)
        return (
            <div className="game-container">
                <Board handleClueClick={this.handleClueClick} categories={this.state.categories}/>
                <p>${this.state.money}</p>
                {
                    this.state.answeringQuestion ?
                    <AnswerQuestion
                        handleSubmitAnswer={this.handleSubmitAnswer}
                        handleChangeAnswer={this.handleChangeAnswer}
                        clue={this.state.currentClue}
                        answer={this.state.answer}
                    />
                    :
                    <ShowAnswer clue={this.state.currentClue}/>
                }
            </div>
        )
    }
}

export default GameContainer