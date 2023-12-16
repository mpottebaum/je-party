import { createClue } from './create-clue'
import type { ApiCategory, Category, Clue } from '../types'

const singleClueValues = [100, 200, 300, 400, 500]

export function createCategory(category: ApiCategory): [Category, boolean] {
  const apiClueValues = category.clues.map((clue) => clue.value)
  const isSingleJep = singleClueValues.every((val) =>
    apiClueValues.includes(val),
  )
  const isDoubleJep = singleClueValues.every((val) =>
    apiClueValues.includes(val * 2),
  )
  const clueValues: number[] = []
  const newCategory: Category = {
    id: category.id,
    title: category.title.toUpperCase(),
    clues: category.clues.reduce(
      (cluesObj, clue) => {
        if (clue.value) {
          const clueValue = isDoubleJep ? clue.value / 2 : clue.value
          if (
            !cluesObj[clueValue] &&
            clueValue <= 500 &&
            clueValue % 100 === 0
          ) {
            cluesObj[clueValue] = createClue(clue, clueValue)
            clueValues.push(clueValue)
          }
        }
        return cluesObj
      },
      {} as Record<number, Clue>,
    ),
  }
  const isValid = isSingleJep || isDoubleJep
  return [newCategory, isValid]
}
