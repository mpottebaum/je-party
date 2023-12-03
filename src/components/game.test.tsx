import { expect, it, describe, vi, afterEach, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Game } from './game'
import { mockCategories } from '../mock-data'
import * as api from '../api'

describe('Game', () => {
  beforeEach(() => {
    vi.spyOn(api, 'fetchCategory')
      .mockResolvedValueOnce([mockCategories[0], true])
      .mockResolvedValueOnce([mockCategories[1], true])
      .mockResolvedValueOnce([mockCategories[2], true])
      .mockResolvedValueOnce([mockCategories[3], true])
      .mockResolvedValueOnce([mockCategories[4], true])
      .mockResolvedValueOnce([mockCategories[5], true])
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
})
