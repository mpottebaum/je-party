import { useEffect, useState } from 'react'
import { ApiCategory, Category, Clue } from '../types'
import { Board } from './new-board'
import { AnswerQuestion } from './answer-question'
import { API_URL } from '../constants'
import { mockApiCategories } from '../mock-data'
import { allClues, createCategoryObj, isCorrectAnswer } from '../utils'

export function GameContainer() {
  const [ categories, setCategories ] = useState<Category[]>([])
  const [ isCategoriesLoading, setIsCategoriesLoading ] = useState(true)
  const [ answeringQuestion, setAnsweringQuestion ] = useState(false)
  const [ money, setMoney ] = useState(0)
  const [ currentClue, setCurrentClue ] = useState<Clue | undefined>()

  const handleSubmitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.persist()
    setMoney(prevMoney => {
      let updatedMoney
      if(isCorrectAnswer((e.currentTarget.elements[0] as HTMLInputElement).value, currentClue?.answer ?? '')) {
          updatedMoney = prevMoney + (currentClue?.value ?? 0)
      } else {
          updatedMoney = prevMoney - (currentClue?.value ?? 0)
      }
      return updatedMoney
    })
    setAnsweringQuestion(false)
    setCategories(prevCategories => {
      return prevCategories.map(category => {
        if(category.id === currentClue?.categoryId) {
          category.clues[currentClue.value ?? 0] = {
            ...currentClue,
            answered: true,
          }
          return category 
        }
        return category
      })
    })
  }

  const handleClueClick = (clueId: number) => {
    const clue = allClues(categories).find(clue => clue.id === clueId)
    if(!answeringQuestion && clue?.answered === false) {
      setAnsweringQuestion(true)
      setCurrentClue(clue)
    }
  }

  const getCategory = async (): Promise<[Category, boolean]> => {
    const id = Math.round(Math.random() * 18418)
    const url = API_URL + `/category?id=${id}`
    const resp = await fetch(url)
    const category: ApiCategory = await resp.json()

    return createCategoryObj(category)
  }

  // @ts-expect-error @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getCategories = async (numCategories: number) => {
    const newCats: Category[] = []
    let remaining = numCategories
    let attempts = 0
    while(remaining > 0 && attempts < 20) {
      const promises = Array.from({ length: remaining }).map(() => {
        return getCategory()
      })
      const results = await Promise.all(promises)
      const validCats = results
        .filter(([, isValid]) => isValid)
        .map(([cat]) => cat)
      newCats.push(...validCats)
      remaining = numCategories - newCats.length
      attempts++
    }
    if(attempts >= 20) {
      console.log(`get categories: too many attempts ${attempts}`)
    }
    return newCats
  }

  useEffect(() => {
    setIsCategoriesLoading(true)
    // getCategories(6)
    Promise.all(mockApiCategories.map(async c => {
      const [newCategoryObj] = createCategoryObj(c)
      return newCategoryObj
    }))
    .then(newCategories => {
      setCategories(newCategories)
      setIsCategoriesLoading(false)
    })
  }, [])
  console.log({
    categories,
  })

  return (
<div className="game-container">
  <Board
      handleClueClick={handleClueClick}
      categories={categories}
      isCategoriesLoading={isCategoriesLoading}
      currentClue={currentClue}
      answeringQuestion={answeringQuestion}
  />
  <p>${money}</p>
  {answeringQuestion && (
    <AnswerQuestion
        handleSubmitAnswer={handleSubmitAnswer}
        clue={currentClue}
    />
  )}
  {!answeringQuestion && currentClue && (
    <div>
      <p>Answer: {currentClue.answer}</p>
    </div>
  )}
</div>
  )
}
