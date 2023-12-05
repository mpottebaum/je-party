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
    fetchSpy = vi.spyOn(window, 'fetch')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should fetch', async () => {
    fetchSpy.mockResolvedValueOnce(
      new Response(JSON.stringify(mockApiCategories[0])),
    )

    const [category] = await fetchCategory()
    expect(category).toHaveProperty('title')
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })

  it('should throw error if resp status is not 200-299', async () => {
    const resp = new Response(null, { status: 400 })
    fetchSpy.mockReturnValueOnce(resp)
    expect(() => fetchCategory()).rejects.toThrowError()
  })
})
