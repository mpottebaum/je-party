import { createCategory } from '.'
import { mockApiCategories } from '../mock-data'

export async function getCategories(numCategories: number) {
  return mockApiCategories.slice(0, numCategories).map((apiCategory) => {
    const [cat, isValid] = createCategory(apiCategory)
    if (isValid) {
      return cat
    }
    return cat
  })
}
