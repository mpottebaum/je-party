import { expect, it, describe } from 'vitest'
import { createClue } from './create-clue'
import { mockCategories } from '../mock-data'


describe('createClue', () => {
  const mockClue = mockCategories[0].clues[100]
  it('should return a clue with an answered property', () => {
    const expectedProperty = 'answered'
    expect(createClue(mockClue)).toHaveProperty(expectedProperty)
  })

  it('should allow for overriding value', () => {
    expect(createClue(mockClue).value).toBe(100)
    const expectedValue = 200
    expect(createClue(mockClue, expectedValue).value).toBe(expectedValue)
  })
})
