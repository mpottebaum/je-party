import { expect, it, describe } from 'vitest'
import { allClues } from './all-clues'
import { mockCategories } from '../mock-data'

describe('allClues', () => {
  it('should return a list of every clue in a list of categories', () => {
    const expectedLength = 30
    const expectedClueProp = 'answer'
    expect(allClues(mockCategories)).toHaveLength(expectedLength)
    allClues(mockCategories).forEach((clue) => {
      expect(clue).toHaveProperty(expectedClueProp)
    })
  })
})
