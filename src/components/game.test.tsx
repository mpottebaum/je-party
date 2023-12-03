import { expect, it, describe, vi, afterEach, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Game } from './game'
import { mockApiCategories } from '../mock-data'
describe('Game', () => {
  beforeEach(() => {
    vi.spyOn(window, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify(mockApiCategories[0])))
      .mockResolvedValueOnce(new Response(JSON.stringify(mockApiCategories[1])))
      .mockResolvedValueOnce(new Response(JSON.stringify(mockApiCategories[2])))
      .mockResolvedValueOnce(new Response(JSON.stringify(mockApiCategories[3])))
      .mockResolvedValueOnce(new Response(JSON.stringify(mockApiCategories[4])))
      .mockResolvedValueOnce(new Response(JSON.stringify(mockApiCategories[5])))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render', async () => {
    const { baseElement } = render(<Game />)

    const firstCategoryTitle = await screen.findByText(
      mockApiCategories[0].title.toUpperCase(),
    )
    expect(firstCategoryTitle).toBeTruthy()
    expect(baseElement).toBeTruthy()
  })
})
