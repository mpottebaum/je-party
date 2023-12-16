import { expect, it, describe } from 'vitest'
import { getCategories } from './get-categories'

describe('getCategories', () => {
  it('should return a list of categories', async () => {
    const expected = 6

    const result = await getCategories(expected)
    expect(result).toHaveLength(expected)
  })
})
