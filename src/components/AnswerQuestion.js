import React from 'react'

const AnswerQuestion = props => {
    return (
        <div>
            <p>{props.clue.question}</p>
            <form onSubmit={props.handleSubmitAnswer}>
                <input onChange={props.handleChangeAnswer} type="text" value={props.answer}/>
                <input type="submit" value="Submit Answer" />
            </form>
        </div>
    )
}

export default AnswerQuestion