import { Category } from '../types';

export function allClues(categories: Category[]) {
  return categories.map(category => Object.values(category.clues)).flat()
}
