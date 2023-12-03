import { useState } from 'react'
import { Clue } from '../types'

interface AnswerFormProps {
  answeringQuestion: boolean
  clue?: Clue
  handleSubmitAnswer: (e: React.FormEvent<HTMLFormElement>) => void
}

export function AnswerForm({
  answeringQuestion,
  clue,
  handleSubmitAnswer,
}: AnswerFormProps) {
  const [answer, setAnswer] = useState('')
  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value)
  }

  return answeringQuestion ? (
    <div>
      <p>{clue?.question}</p>
      <form onSubmit={handleSubmitAnswer}>
        <input
          onChange={handleChangeAnswer}
          type="text"
          name="answer"
          value={answer}
        />
        <input type="submit" value="Submit Answer" />
      </form>
      <p className="airdate">This clue aired on {clue?.airdate}</p>
    </div>
  ) : null
}
