import { fetchCategory } from '../api'
import { Category } from '../types'

export async function getCategories(numCategories: number, maxAttempts = 20) {
  const newCats: Category[] = []
  let remaining = numCategories
  let attempts = 0
  while (remaining > 0 && attempts < 20) {
    const promises = Array.from({ length: remaining }).map(() => {
      return fetchCategory()
    })
    const results = await Promise.all(promises)
    const validCats = results
      .filter(([, isValid]) => isValid)
      .map(([cat]) => cat)
    newCats.push(...validCats)
    remaining = numCategories - newCats.length
    attempts++
  }
  if (attempts >= maxAttempts) {
    console.log(`get categories: too many attempts ${attempts}`)
  }
  return newCats
}
