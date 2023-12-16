export interface ApiClue {
  question: string
  answer: string
  airdate: string
  category_id: number
  game_id: number
  invalid_count: null
  value: number | null
  id: number
}

export interface Clue extends ApiClue {
  answered: boolean
  categoryId: number
}

export interface ApiCategory {
  id: number
  title: string
  clues_count: number
  clues: ApiClue[]
}
export interface Category {
  clues: Record<number, Clue>
  title: string
  id: number
}
