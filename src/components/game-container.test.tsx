import { expect, it, describe, vi, afterEach, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GameContainer } from './game-container'
import { mockApiCategories } from '../mock-data'
describe('GameContainer', () => {
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
    const { baseElement } = render(
      <GameContainer />
    )

    const firstCategoryTitle = await screen.findByText(mockApiCategories[0].title.toUpperCase())
    expect(firstCategoryTitle).toBeTruthy()
    expect(baseElement).toBeTruthy()
  })
})
