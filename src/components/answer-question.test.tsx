import { expect, it, describe, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { AnswerQuestion } from './answer-question'
import { mockCategories } from '../mock-data'

describe('AnswerQuestion', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render', () => {
    const mockClue = mockCategories[0].clues[100]
    const { baseElement } = render(
      <AnswerQuestion
        clue={mockClue}
        handleSubmitAnswer={vi.fn()}
      />
    )

    expect(baseElement).toBeTruthy()
  })
})
