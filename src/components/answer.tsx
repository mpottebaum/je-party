import { Clue } from '../types'

interface AnswerProps {
  answeringQuestion: boolean
  currentClue?: Clue
}

export function Answer({ answeringQuestion, currentClue }: AnswerProps) {
  return !answeringQuestion && currentClue ? (
    <div>
      <p>Answer: {currentClue.answer}</p>
    </div>
  ) : null
}
