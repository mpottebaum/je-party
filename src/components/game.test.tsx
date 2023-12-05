import { expect, it, describe, vi, afterEach, beforeEach } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Game } from './game'
import { mockCategories } from '../mock-data'
import * as utils from '../utils'

describe('Game', () => {
  beforeEach(() => {
    vi.spyOn(utils, 'getCategories').mockResolvedValue(mockCategories)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render', async () => {
    const { baseElement } = render(<Game />)

    const firstCategoryTitle = await screen.findByText(
      mockCategories[0].title.toUpperCase(),
    )
    expect(firstCategoryTitle).toBeTruthy()
    expect(baseElement).toBeTruthy()
  })

  it('should allow user to select a clue', async () => {
    render(<Game />)

    const [firstCategoryClue] = await screen.findAllByText(`$${100}`)
    fireEvent.click(firstCategoryClue)

    expect(firstCategoryClue.parentElement?.className).toContain('selected')
  })

  it('should allow user to answer a clue', async () => {
    const mockInput = 'yo'
    render(<Game />)

    const [firstCategoryClue] = await screen.findAllByText(`$${100}`)
    fireEvent.click(firstCategoryClue)
    const answer = (await screen.findByRole('textbox')) as HTMLInputElement
    fireEvent.change(answer, {
      target: {
        value: mockInput,
      },
    })

    expect(answer.value).toBe(mockInput)
  })

  it('should increase money on correct answer', async () => {
    const mockClueValue = 100
    const mockClue = mockCategories[0].clues[mockClueValue]
    const mockInput = mockClue.answer

    render(<Game />)

    const money = screen.getByText('$0')
    const [firstCategoryClue] = await screen.findAllByText(`$${mockClueValue}`)
    fireEvent.click(firstCategoryClue)
    const answer = (await screen.findByRole('textbox')) as HTMLInputElement
    fireEvent.change(answer, {
      target: {
        value: mockInput,
      },
    })
    fireEvent.click(screen.getByRole('button', { name: /submit answer/i }))

    expect(money.innerHTML).toBe(`$${mockClueValue}`)
  })

  it('should decrease money on wrong answer', async () => {
    const mockClueValue = 100
    mockCategories[0].clues[mockClueValue]
    const mockInput = 'zoinked it'

    render(<Game />)

    const money = screen.getByText('$0')
    const [firstCategoryClue] = await screen.findAllByText(`$${mockClueValue}`)
    fireEvent.click(firstCategoryClue)
    const answer = (await screen.findByRole('textbox')) as HTMLInputElement
    fireEvent.change(answer, {
      target: {
        value: mockInput,
      },
    })
    fireEvent.click(screen.getByRole('button', { name: /submit answer/i }))

    expect(money.innerHTML).toBe(`$-${mockClueValue}`)
  })
})
