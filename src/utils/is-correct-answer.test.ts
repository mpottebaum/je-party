import { expect, it, describe } from 'vitest'
import { isCorrectAnswer } from './is-correct-answer'

describe('isCorrectAnswer', () => {
  it('should sanitize correct answer', () => {
    const userAnswer = 'police'
    const correctAnswer = 'The Police'
    const expected = true
    expect(isCorrectAnswer(userAnswer, correctAnswer)).toBe(expected)
  })

  it('should not allow extra words', () => {
    const userAnswer = 'metropolitan police'
    const correctAnswer = 'The Police'
    const expected = false
    expect(isCorrectAnswer(userAnswer, correctAnswer)).toBe(expected)
  })
})
