import { expect, it, describe } from 'vitest'
import { sanitizeAnswer } from './sanitize-answer'

describe('sanitizeAnswer', () => {
  it('should remove <i> tags', () => {
    const mockAnswer = '<i>The Exorcist</i>'
    const expected = 'the exorcist'
    expect(sanitizeAnswer(mockAnswer)).toBe(expected)
  })

  it('should remove lowercase "the"', () => {
    const mockAnswer = 'the aluminum can'
    const expected = 'aluminum can'
    expect(sanitizeAnswer(mockAnswer)).toBe(expected)
  })

  it('should remove " and "', () => {
    const mockAnswer = 'Ebony and Ivory'
    const expected = 'ebony ivory'
    expect(sanitizeAnswer(mockAnswer)).toBe(expected)
  })

  it('should remove quotes', () => {
    const mockAnswer = '"Sup Dude"'
    const expected = 'sup dude'
    expect(sanitizeAnswer(mockAnswer)).toBe(expected)
  })

  it('should format to lower case', () => {
    const mockAnswer = 'The Exorcist'
    const expected = 'the exorcist'
    expect(sanitizeAnswer(mockAnswer)).toBe(expected)
  })
})
