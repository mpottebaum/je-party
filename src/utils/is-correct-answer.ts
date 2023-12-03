import { sanitizeAnswer } from './sanitize-answer'

export function isCorrectAnswer(userAnswer: string, correctAnswer: string) {
  const sanitizedCorrectAnswer = sanitizeAnswer(correctAnswer)
  const sanitizedUserAnswer = sanitizeAnswer(userAnswer)
  const splitClueAnswer = sanitizedCorrectAnswer.split(/\/| /g)
  const splitUserAnswer = sanitizedUserAnswer.split(/\/| /g)
  return splitUserAnswer.every((word) => splitClueAnswer.includes(word))
}
