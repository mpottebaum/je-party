export interface ApiClue {
  question: string;
  answer: string;
  airdate: string;
  category_id: string;
  value: number;
  id: string;
}

export interface Clue extends ApiClue{
  answered: boolean;
  categoryId: number;
}

export interface ApiCategory {
  id: string;
  title: string;
  clues: ApiClue[];
}

export interface Category {
  clues: Record<number, Clue>;
  title: string;
  id: number;
}

