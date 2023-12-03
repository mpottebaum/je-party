import { expect, it, describe, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { Board } from './new-board'
import { mockCategories } from '../mock-data'

describe('Board', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render', async () => {
    const { baseElement } = render(
      <Board
        categories={mockCategories}
        isCategoriesLoading={false}
        answeringQuestion={false}
        handleClueClick={vi.fn()}
      />,
    )
    expect(baseElement).toBeTruthy()
  })
})
