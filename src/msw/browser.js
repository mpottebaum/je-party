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
  ...mockApiCategories,
  mockInvalidCategory2FewClues,
  mockInvalidCategoryDubsVals,
  mockInvalidCategoryDubsValsLotsClues,
  ...mockApiCategories2,
]
  .sort(() => Math.floor(Math.random() * 3) - 1)
  .map((category) =>
    http.get(
      API_URL + '/category',
      () => {
        return HttpResponse.json(category)
      },
      { once: true },
    ),
  )

export const worker = setupWorker(...handlers)
