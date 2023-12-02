import React from 'react'
import { Clue } from '../types';

interface AnswerQuestionProps {
    clue?: Clue;
    handleSubmitAnswer: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface AnswerQuestionState {
    answer: string;
}

class AnswerQuestion extends React.Component<AnswerQuestionProps, AnswerQuestionState> {
    constructor(props: AnswerQuestionProps) {
        super(props)

        this.state = {
            answer: ""
        }
    }
    
    handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            answer: event.target.value
        })
    }

    formatAirdate = () => {
        const date = new Date(this.props.clue?.airdate.split("T")[0] ?? '')
        return date.toDateString()
    }

    render() {
        console.log(this.props.clue)
        return (
            <div>
                <p>{this.props.clue?.question}</p>
                <form onSubmit={this.props.handleSubmitAnswer}>
                    <input onChange={this.handleChangeAnswer} type="text" name="answer" value={this.state.answer}/>
                    <input type="submit" value="Submit Answer" />
                </form>
                <p className="airdate">This clue aired on {this.formatAirdate()}</p>
            </div>
        )
    }
}

export default AnswerQuestion