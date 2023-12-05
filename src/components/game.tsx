import { useEffect, useState } from 'react'
import { Category, Clue } from '../types'
import { Board } from './board'
import { getCategories, isCorrectAnswer } from '../utils'

const NUM_CATEGORIES = 6

export function Game() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true)
  const [answeringQuestion, setAnsweringQuestion] = useState(false)
  const [money, setMoney] = useState(0)
  const [currentClue, setCurrentClue] = useState<Clue | undefined>()
  const [answer, setAnswer] = useState('')

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value)
  }
  const handleSubmitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const currentClueValue = currentClue?.value ?? 0
    setMoney((prevMoney) =>
      isCorrectAnswer(answer, currentClue?.answer ?? '')
        ? prevMoney + currentClueValue
        : prevMoney - currentClueValue,
    )
    setAnsweringQuestion(false)
    setAnswer('')
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === currentClue?.categoryId) {
          category.clues[currentClueValue].answered = true
        }
        return category
      }),
    )
  }
  const handleClueClick = (clue: Clue) => {
    if (!answeringQuestion && clue.answered === false) {
      setAnsweringQuestion(true)
      setCurrentClue(clue)
    }
  }

  useEffect(() => {
    setIsCategoriesLoading(true)
    getCategories(NUM_CATEGORIES).then((newCategories) => {
      setCategories(newCategories)
      setIsCategoriesLoading(false)
    })
  }, [])

  return (
    <section className="game-container">
      <Board
        handleClueClick={handleClueClick}
        categories={categories}
        isCategoriesLoading={isCategoriesLoading}
        currentClue={currentClue}
        answeringQuestion={answeringQuestion}
      />
      <section>
        <p className="money">${money}</p>
        {answeringQuestion && (
          <article>
            <p className="question">{currentClue?.question}</p>
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
            <p className="airdate">This clue aired on {currentClue?.airdate}</p>
          </article>
        )}
        {!answeringQuestion && currentClue && (
          <article>
            <p className="answer">Answer: {currentClue.answer}</p>
          </article>
        )}
      </section>
    </section>
  )
}
