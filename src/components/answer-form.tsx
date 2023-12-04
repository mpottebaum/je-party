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
      <p className="question">{clue?.question}</p>
      <form onSubmit={handleSubmitAnswer} className="answer-form">
        <input
          onChange={handleChangeAnswer}
          type="text"
          name="answer"
          value={answer}
        />
        <button type="submit" className="answer-submit">
          Submit Answer
        </button>
      </form>
      <p className="airdate">This clue aired on {clue?.airdate}</p>
    </div>
  ) : null
}
