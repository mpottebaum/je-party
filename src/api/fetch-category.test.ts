import {
  expect,
  it,
  describe,
  vi,
  afterEach,
  beforeEach,
  SpyInstance,
} from 'vitest'
import { fetchCategory } from './fetch-category'
import { mockApiCategories } from '../mock-data'

describe('fetchCategory', () => {
  let fetchSpy: SpyInstance
  beforeEach(() => {
    fetchSpy = vi
      .spyOn(window, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify(mockApiCategories[0])))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should fetch', async () => {
    const [category] = await fetchCategory()
    expect(category).toHaveProperty('title')
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })
})
