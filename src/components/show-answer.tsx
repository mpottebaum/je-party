import { Clue } from '../types'

interface ShowAnswerProps {
    clue: Clue;
}

export function ShowAnswer({ clue }: ShowAnswerProps) {
    return (
        <div>
            <p>Answer: {clue.answer}</p>
        </div>
    )
}
