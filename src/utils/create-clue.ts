import { ApiClue, Clue } from '../types';
import { formatAirdate } from './format-airdate';

export function createClue(clue: ApiClue, value?: number): Clue {
  return {
      ...clue,
      categoryId: clue.category_id,
      answered: false,
      airdate: formatAirdate(clue.airdate),
      value: value ?? clue.value,
  }
}
