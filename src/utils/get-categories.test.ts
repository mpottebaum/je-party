import {
  expect,
  it,
  describe,
  vi,
  beforeEach,
  afterEach,
  SpyInstance,
} from 'vitest'
import { getCategories } from './get-categories'
import { mockCategories } from '../mock-data'
import * as api from '../api'

describe('getCategories', () => {
  let fetchCategorySpy: SpyInstance
  beforeEach(() => {
    fetchCategorySpy = vi.spyOn(api, 'fetchCategory')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return a list of categories', async () => {
    fetchCategorySpy
      .mockResolvedValueOnce([mockCategories[0], true])
      .mockResolvedValueOnce([mockCategories[1], true])
      .mockResolvedValueOnce([mockCategories[2], true])
      .mockResolvedValueOnce([mockCategories[3], true])
      .mockResolvedValueOnce([mockCategories[4], true])
      .mockResolvedValueOnce([mockCategories[5], true])
    const expected = 6

    const result = await getCategories(expected)
    expect(result).toHaveLength(expected)
    expect(result[0].title).toBe(mockCategories[0].title)
  })
})
