import { useEffect, useState } from 'react'
import { Category, Clue } from '../types'
import { Board } from './board'
import { AnswerForm } from './answer-form'
import { getCategories, isCorrectAnswer } from '../utils'
import { Answer } from './answer'

export function Game() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true)
  const [answeringQuestion, setAnsweringQuestion] = useState(false)
  const [money, setMoney] = useState(0)
  const [currentClue, setCurrentClue] = useState<Clue | undefined>()

  const handleSubmitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.persist()
    const currentClueValue = currentClue?.value ?? 0
    setMoney((prevMoney) =>
      isCorrectAnswer(
        (e.currentTarget.elements[0] as HTMLInputElement).value,
        currentClue?.answer ?? '',
      )
        ? prevMoney + currentClueValue
        : prevMoney - currentClueValue,
    )
    setAnsweringQuestion(false)
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
    getCategories(6).then((newCategories) => {
      setCategories(newCategories)
      setIsCategoriesLoading(false)
    })
  }, [])

  return (
    <div className="game-container">
      <Board
        handleClueClick={handleClueClick}
        categories={categories}
        isCategoriesLoading={isCategoriesLoading}
        currentClue={currentClue}
        answeringQuestion={answeringQuestion}
      />
      <p className="money">${money}</p>
      <AnswerForm
        answeringQuestion={answeringQuestion}
        handleSubmitAnswer={handleSubmitAnswer}
        clue={currentClue}
      />
      <Answer answeringQuestion={answeringQuestion} currentClue={currentClue} />
    </div>
  )
}
