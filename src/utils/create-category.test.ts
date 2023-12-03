import { expect, it, describe } from 'vitest'
import { createCategory } from './create-category'
import { mockApiCategories, mockInvalidCategory2FewClues } from '../mock-data'


describe('createCategory', () => {
  const mockValidApiCategory = mockApiCategories[0]
  it('should return a category with id, title, and clues', () => {
    const expectedProperties = ['id', 'title', 'clues']
    const [ category ] = createCategory(mockValidApiCategory)
    expectedProperties.forEach(expected => {
      expect(category).toHaveProperty(expected)
    })
  })

  it('should validate too few clues', () => {
    const expectedValidity = false
    const [ , isValid ] = createCategory(mockInvalidCategory2FewClues)
    expect(isValid).toBe(expectedValidity)
  })
})
