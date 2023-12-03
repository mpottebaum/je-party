import { expect, it, describe, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { Answer } from './answer'
import { mockCategories } from '../mock-data'

describe('Answer', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render', () => {
    const mockClue = mockCategories[0].clues[100]
    const { baseElement } = render(
      <Answer answeringQuestion={false} currentClue={mockClue} />,
    )

    expect(baseElement).toBeTruthy()
  })
})
