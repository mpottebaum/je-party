import { ApiCategory, ApiClue, Category, Clue } from '../types'

export function sanitizeAnswer(answer: string) {
  let sanitized = answer.replace(/["',!.$-]|(<i>|<\/i>|^a |^the )/g, "")
  sanitized = sanitized.replace(/( and | & )/g, " ")
  return sanitized
}

export function isCorrectAnswer(answer: string, correctAnswer: string) {
  const sanitizedClueAnswer = sanitizeAnswer(correctAnswer).toLowerCase()
  const sanitizedUserAnswer = sanitizeAnswer(answer).toLowerCase()
  const splitClueAnswer = sanitizedClueAnswer.split(/\/| /g)
  const splitUserAnswer = sanitizedUserAnswer.split(/\/| /g)
  return splitUserAnswer.every(word => splitClueAnswer.includes(word))
}

export function allClues(categories: Category[]) {
  return categories.map(category => Object.values(category.clues)).flat()
}

export function createClueObj(clue: ApiClue): Clue {
  return {
      ...clue,
      categoryId: clue.category_id,
      answered: false
  }
}

export function createCategoryObj(category: ApiCategory): [Category, boolean] {
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
