import { expect, it, describe, vi, afterEach } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Board } from './board'
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

  it('should give control of clue click behavior thru props', async () => {
    const mockCategory = mockCategories[0]
    const mockClue = mockCategory.clues[100]
    const clueClickSpy = vi.fn()
    render(
      <Board
        categories={mockCategories}
        isCategoriesLoading={false}
        answeringQuestion={true}
        currentClue={mockClue}
        handleClueClick={clueClickSpy}
      />,
    )

    fireEvent.click(screen.getAllByText('$100')[0])
    expect(clueClickSpy).toHaveBeenCalledTimes(1)
    expect(clueClickSpy).toHaveBeenCalledWith(mockClue)
  })

  it('should highlight selected clue', async () => {
    const mockCategory = mockCategories[0]
    const mockClue = mockCategory.clues[100]
    render(
      <Board
        categories={mockCategories}
        isCategoriesLoading={false}
        answeringQuestion={true}
        currentClue={mockClue}
        handleClueClick={vi.fn()}
      />,
    )

    const [clueText] = screen.getAllByText(`$${mockClue.value}`)
    const clueContainer = clueText.parentElement
    expect(clueContainer?.className).toContain('selected')
  })

  it('should hide answered clues', async () => {
    const mockCategory = mockCategories[0]
    mockCategory.clues[100].answered = true
    render(
      <Board
        categories={mockCategories}
        isCategoriesLoading={false}
        answeringQuestion={false}
        handleClueClick={vi.fn()}
      />,
    )

    const categoryTitle = screen.getByText(mockCategory.title)
    const clueContainer = categoryTitle.parentElement?.nextElementSibling
    const valueText = clueContainer?.children[0]
    expect(clueContainer?.className).toContain('answered')
    // value text is hidden
    expect(valueText?.children).toHaveLength(0)
  })

  it('should hide clues with invalid values', async () => {
    const mockCategory = mockCategories[0]
    const mockClue = {
      ...mockCategory.clues[100],
      id: 999999999999999,
      value: 600,
    }
    mockCategory.clues[mockClue.value] = mockClue

    render(
      <Board
        categories={mockCategories}
        isCategoriesLoading={false}
        answeringQuestion={false}
        handleClueClick={vi.fn()}
      />,
    )

    const clueText = screen.queryByText(`$${mockClue.value}`)
    expect(clueText).toBeFalsy()
  })
})
