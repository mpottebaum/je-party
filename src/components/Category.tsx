import {ClueTile} from './clue-tile'
import { Category as ICategory, Clue } from '../types'

interface CategoryProps {
    category: ICategory;
    currentClue?: Clue;
    handleClueClick: (id: number) => void;
    answeringQuestion: boolean;
}

export function Category({
  category,
  currentClue,
  handleClueClick,
  answeringQuestion,
}: CategoryProps) {
  const clueValues = Object.keys(category.clues)
  return (
    <div className="category">
        <div className="category-title">
            <p>{category.title}</p>
        </div>
        {clueValues.map(value => {
            const num = parseInt(value)
            return (
              <ClueTile
                key={category.clues[num].id}
                clue={category.clues[num]}
                currentClue={currentClue}
                handleClueClick={handleClueClick}
                answeringQuestion={answeringQuestion}
              />
            )
        })}
    </div>
  )
}