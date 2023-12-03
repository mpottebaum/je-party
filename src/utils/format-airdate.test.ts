import { expect, it, describe } from 'vitest'
import { formatAirdate } from './format-airdate'
import { mockCategories } from '../mock-data'


describe('formatAirdate', () => {
  const mockClue = mockCategories[0].clues[100]
  it('should return a list of every clue in a list of categories', () => {
    const expectedDateStr = 'Sun Apr 07 1985'
    expect(formatAirdate(mockClue.airdate)).toBe(expectedDateStr)
  })
})
