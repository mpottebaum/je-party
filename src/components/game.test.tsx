import { expect, it, describe, vi, afterEach, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
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
})
