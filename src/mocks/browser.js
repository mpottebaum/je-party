import { setupWorker } from 'msw/browser'
import { HttpResponse, http } from 'msw'
import { API_URL } from '../constants'
import {
  mockApiCategories,
  mockApiCategories2,
  mockInvalidCategory2FewClues,
  mockInvalidCategoryDubsVals,
  mockInvalidCategoryDubsValsLotsClues,
} from '../mock-data'

const handlers = [
  http.get(API_URL + '/category', () => {
    const categories = [
      ...mockApiCategories,
      mockInvalidCategory2FewClues,
      mockInvalidCategoryDubsVals,
      mockInvalidCategoryDubsValsLotsClues,
      ...mockApiCategories2,
    ]
    const randoIndex = Math.floor(Math.random() * categories.length)
    return HttpResponse.json(categories[randoIndex])
  }),
]

export const worker = setupWorker(...handlers)
