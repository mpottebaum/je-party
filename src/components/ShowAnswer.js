import React from 'react'

const ShowAnswer = props => {
    return (
        <div>
            <p>Answer: {props.clue.answer}</p>
        </div>
    )
}

export default ShowAnswer