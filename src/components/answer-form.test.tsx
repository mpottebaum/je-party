import { expect, it, describe, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { AnswerForm } from './answer-form'
import { mockCategories } from '../mock-data'

describe('AnswerForm', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render', () => {
    const mockClue = mockCategories[0].clues[100]
    const { baseElement } = render(
      <AnswerForm
        answeringQuestion={true}
        clue={mockClue}
        handleSubmitAnswer={vi.fn()}
      />,
    )

    expect(baseElement).toBeTruthy()
  })
})
