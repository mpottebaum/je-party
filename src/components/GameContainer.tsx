import React from 'react'
import Board from './Board'
import AnswerQuestion from './AnswerQuestion'
import ShowAnswer from './ShowAnswer'
import { URL } from '../constants'
import { ApiCategory, ApiClue, Category, Clue } from '../types'

interface GameContainerProps {

}

interface GameContainerState {
    categories: Category[];
    answeringQuestion: boolean;
    money: number;
    currentClue?: Clue;
}

class GameContainer extends React.Component<GameContainerProps, GameContainerState> {
    constructor(props: GameContainerProps) {
        super(props)

        this.state = {
            categories: [],
            answeringQuestion: false,
            money: 0
        }
    }

    sanitizeAnswer = (answer: string) => {
        let sanitized = answer.replace(/["',!.$-]|(<i>|<\/i>|^a |^the )/g, "")
        sanitized = sanitized.replace(/( and | & )/g, " ")
        return sanitized
    }

    isCorrectAnswer = (answer: string) => {
        const sanitizedClueAnswer = this.sanitizeAnswer(this.state.currentClue?.answer ?? '').toLowerCase()
        const sanitizedUserAnswer = this.sanitizeAnswer(answer).toLowerCase()
        const splitClueAnswer = sanitizedClueAnswer.split(/\/| /g)
        const splitUserAnswer = sanitizedUserAnswer.split(/\/| /g)
        return splitUserAnswer.every(word => splitClueAnswer.includes(word))
    }

    updateClueToAnswered = (category: Category, prevState: GameContainerState) => {
        if(category.id === prevState.currentClue?.categoryId) {
            category.clues[prevState.currentClue.value] = {
                ...prevState.currentClue,
                answered: true
            }
            return category
        } else {
            return category
        }
    }

    handleSubmitAnswer = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.persist()
        this.setState(prevState => {
            let updatedMoney
            if(this.isCorrectAnswer((event.currentTarget.elements[0] as HTMLInputElement).value)) {
                updatedMoney = prevState.money + (prevState.currentClue?.value ?? 0)
            } else {
                updatedMoney = prevState.money - (prevState.currentClue?.value ?? 0)
            }

            return {
                answeringQuestion: false,
                money: updatedMoney,
                categories: prevState.categories.map(category => {
                    return this.updateClueToAnswered(category, prevState)
                })
            }
        })
        
    }

    allClues = () => {
        return this.state.categories.map(category => Object.values(category.clues)).flat()
    }

    handleClueClick = (clueId: string) => {
        const clue = this.allClues().find(clue => clue.id === clueId)
        if(!this.state.answeringQuestion && clue?.answered === false) {
            this.setState({
                    answeringQuestion: true,
                    currentClue: clue
            })
        }
    }

    hasFirstRoundClues = (category: ApiCategory) => {
        return category.clues.some(clue => clue.value === 100)
    }


    createClueObj = (clue: ApiClue): Clue => {
        return {
            ...clue,
            categoryId: parseInt(clue.category_id),
            answered: false
        }
    }

    createCategoryObj = (category: ApiCategory): Category => {
        let cluesObj: Record<number, Clue> = {}
        category.clues.forEach(clue => {
            if(!cluesObj[clue.value] && clue.value <= 500 && clue.value !== null) {
                cluesObj[clue.value] = this.createClueObj(clue)
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
        .then((category: ApiCategory) => {
            const newCategoryObj = this.createCategoryObj(category)
            const clueValues = Object.keys(newCategoryObj.clues)
            const keys = ["100", "200", "300", "400", "500"]
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
        return (
            <div className="game-container">
                <Board
                    handleClueClick={this.handleClueClick}
                    categories={this.state.categories}
                    currentClue={this.state.currentClue}
                    answeringQuestion={this.state.answeringQuestion}
                />
                <p>${this.state.money}</p>
                {
                    this.state.answeringQuestion ?
                    <AnswerQuestion
                        handleSubmitAnswer={this.handleSubmitAnswer}
                        // handleChangeAnswer={this.handleChangeAnswer}
                        clue={this.state.currentClue}
                    />
                    :
                    this.state.currentClue ? <ShowAnswer clue={this.state.currentClue}/> : null
                }
            </div>
        )
    }
}

export default GameContainer