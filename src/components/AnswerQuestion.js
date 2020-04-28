import React from 'react'

class AnswerQuestion extends React.Component {
    constructor() {
        super()

        this.state = {
            answer: ""
        }
    }
    
    handleChangeAnswer = event => {
        this.setState({
            answer: event.target.value
        })
    }

    render() {
        return (
            <div>
                <p>{this.props.clue.question}</p>
                <form onSubmit={this.props.handleSubmitAnswer}>
                    <input onChange={this.handleChangeAnswer} type="text" name="answer" value={this.state.answer}/>
                    <input type="submit" value="Submit Answer" />
                </form>
            </div>
        )
    }
}

export default AnswerQuestion