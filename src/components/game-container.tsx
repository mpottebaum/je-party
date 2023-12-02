import { useEffect, useState } from 'react'
import { ApiCategory, ApiClue, Category, Clue } from '../types'
import { Board } from './board'
import { AnswerQuestion } from './answer-question'
import { ShowAnswer } from './show-answer'
import { API_URL } from '../constants'
import { mockApiCategories } from '../mock-data'

export function GameContainer() {
  const [ categories, setCategories ] = useState<Category[]>([])
  const [ answeringQuestion, setAnsweringQuestion ] = useState(false)
  const [ money, setMoney ] = useState(0)
  const [ currentClue, setCurrentClue ] = useState<Clue | undefined>()

  const sanitizeAnswer = (answer: string) => {
    let sanitized = answer.replace(/["',!.$-]|(<i>|<\/i>|^a |^the )/g, "")
    sanitized = sanitized.replace(/( and | & )/g, " ")
    return sanitized
  }

  const isCorrectAnswer = (answer: string) => {
    const sanitizedClueAnswer = sanitizeAnswer(currentClue?.answer ?? '').toLowerCase()
    const sanitizedUserAnswer = sanitizeAnswer(answer).toLowerCase()
    const splitClueAnswer = sanitizedClueAnswer.split(/\/| /g)
    const splitUserAnswer = sanitizedUserAnswer.split(/\/| /g)
    return splitUserAnswer.every(word => splitClueAnswer.includes(word))
  }

  const handleSubmitAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.persist()
    setMoney(prevMoney => {
      let updatedMoney
      if(isCorrectAnswer((event.currentTarget.elements[0] as HTMLInputElement).value)) {
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

  const allClues = () => {
    return categories.map(category => Object.values(category.clues)).flat()
  }

  const handleClueClick = (clueId: number) => {
    const clue = allClues().find(clue => clue.id === clueId)
    if(!answeringQuestion && clue?.answered === false) {
      setAnsweringQuestion(true)
      setCurrentClue(clue)
    }
  }



  const createClueObj = (clue: ApiClue): Clue => {
    return {
        ...clue,
        categoryId: clue.category_id,
        answered: false
    }
  }

  const createCategoryObj = (category: ApiCategory): [Category, boolean] => {
    const singleClueValues = [100, 200, 300, 400, 500]
    const apiClueValues = category.clues.map(clue => clue.value)
    const isSingleJep = singleClueValues.every(val => apiClueValues.includes(val))
    const isDoubleJep = singleClueValues.every(val => apiClueValues.includes(val * 2))
    const clueValues: number[] = []
    const newCategory: Category = {
        id: category.id,
        title: category.title.toUpperCase(),
        clues: category.clues.reduce((cluesObj, clue) => {
          if(clue.value) {
            const clueValue = isDoubleJep ? clue.value / 2 : clue.value
            if(!cluesObj[clueValue] && clueValue <= 500) {
              cluesObj[clueValue] = createClueObj(clue)
              clueValues.push(clueValue)
            }
          }
          return cluesObj
        }, {} as Record<number, Clue>)
    }
    const isValid = isSingleJep || isDoubleJep
    return [ newCategory, isValid ]
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
    while(remaining > 0) {
      const promises = Array.from({ length: remaining }).map(() => {
        return getCategory()
      })
      const results = await Promise.all(promises)
      const validCats = results
        .filter(([, isValid]) => isValid)
        .map(([cat]) => cat)
      newCats.push(...validCats)
      remaining = numCategories - newCats.length

    }
    return newCats
  }

  useEffect(() => {
    // getCategories(6)
    Promise.all(mockApiCategories.map(async c => {
      const [newCategoryObj] = createCategoryObj(c)
      return newCategoryObj
    }))
    .then(newCategories => {
      setCategories(newCategories)
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
      currentClue={currentClue}
      answeringQuestion={answeringQuestion}
  />
  <p>${money}</p>
  {
      answeringQuestion ?
      <AnswerQuestion
          handleSubmitAnswer={handleSubmitAnswer}
          // handleChangeAnswer={this.handleChangeAnswer}
          clue={currentClue}
      />
      :
      currentClue ? <ShowAnswer clue={currentClue}/> : null
  }
</div>
  )
}
