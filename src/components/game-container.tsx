import { useEffect, useState } from 'react'
import { ApiCategory, ApiClue, Category, Clue } from '../types'
import { Board } from './board'
import { AnswerQuestion } from './answer-question'
import { ShowAnswer } from './show-answer'

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
          category.clues[currentClue.value] = {
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

  const handleClueClick = (clueId: string) => {
    const clue = allClues().find(clue => clue.id === clueId)
    if(!answeringQuestion && clue?.answered === false) {
      setAnsweringQuestion(true)
      setCurrentClue(clue)
    }
  }

  const hasFirstRoundClues = (category: ApiCategory) => {
    return category.clues.some(clue => clue.value === 100)
  }

  const createClueObj = (clue: ApiClue): Clue => {
    return {
        ...clue,
        categoryId: parseInt(clue.category_id),
        answered: false
    }
  }

  const createCategoryObj = (category: ApiCategory): Category => {
    let cluesObj: Record<number, Clue> = {}
    category.clues.forEach(clue => {
        if(!cluesObj[clue.value] && clue.value <= 500 && clue.value !== null) {
            cluesObj[clue.value] = createClueObj(clue)
        }
    })
    return {
        id: parseInt(category.id),
        title: category.title.toUpperCase(),
        clues: cluesObj
    }
  }

  const getCategory = () => {
    const id = Math.round(Math.random() * 18418)
    const url = URL + `/category?id=${id}`
    fetch(url)
    .then(resp => resp.json())
    .then((category: ApiCategory) => {
        const newCategoryObj = createCategoryObj(category)
        const clueValues = Object.keys(newCategoryObj.clues)
        const keys = ["100", "200", "300", "400", "500"]
        if(hasFirstRoundClues(category) && keys.every(key => clueValues.includes(key)) ) {
          setCategories(prevCategories => {
            return [
              ...prevCategories,
              newCategoryObj
            ]
          })  
        } else {
            getCategory()
        }
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getCategory()
    getCategory()
    getCategory()
    getCategory()
    getCategory()
    getCategory()
  }, [])

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
