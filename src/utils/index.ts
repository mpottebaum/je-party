import { ApiCategory, ApiClue, Category, Clue } from '../types'

export function sanitizeAnswer(answer: string) {
  return answer
    .replace(/["',!.$-]|(<i>|<\/i>|^a |^the )/g, "")
    .replace(/( and | & )/g, " ")
    .toLowerCase()
}

export function isCorrectAnswer(userAnswer: string, correctAnswer: string) {
  const sanitizedCorrectAnswer = sanitizeAnswer(correctAnswer)
  const sanitizedUserAnswer = sanitizeAnswer(userAnswer)
  const splitClueAnswer = sanitizedCorrectAnswer.split(/\/| /g)
  const splitUserAnswer = sanitizedUserAnswer.split(/\/| /g)
  return splitUserAnswer.every(word => splitClueAnswer.includes(word))
}

export function allClues(categories: Category[]) {
  return categories.map(category => Object.values(category.clues)).flat()
}

export function formatAirdate(airdate: string) {
  return new Date(airdate.split("T")[0]).toDateString()
}

export function createClueObj(clue: ApiClue, value?: number): Clue {
  return {
      ...clue,
      categoryId: clue.category_id,
      answered: false,
      airdate: formatAirdate(clue.airdate),
      value: value ?? clue.value,
  }
}

const singleClueValues = [100, 200, 300, 400, 500]

export function createCategoryObj(category: ApiCategory): [Category, boolean] {
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
          if(!cluesObj[clueValue] && clueValue <= 500 && clueValue % 100 === 0) {
            cluesObj[clueValue] = createClueObj(clue, clueValue)
            clueValues.push(clueValue)
          }
        }
        return cluesObj
      }, {} as Record<number, Clue>)
  }
  const isValid = isSingleJep || isDoubleJep
  return [ newCategory, isValid ]
}
