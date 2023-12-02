import React from 'react'
import { Clue } from '../types'

interface ShowAnswerProps {
    clue: Clue;
}

const ShowAnswer: React.FC<ShowAnswerProps> = props => {
    return (
        <div>
            <p>Answer: {props.clue.answer}</p>
        </div>
    )
}

export default ShowAnswer