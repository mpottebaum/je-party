import { Clue } from '../types'

interface AnswerProps {
  answeringQuestion: boolean
  currentClue?: Clue
}

export function Answer({ answeringQuestion, currentClue }: AnswerProps) {
  return !answeringQuestion && currentClue ? (
    <p className="answer">Answer: {currentClue.answer}</p>
  ) : null
}
