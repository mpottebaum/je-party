import { Clue, Category as ICategory } from '../types'
import {Circles} from 'react-loader-spinner'

interface BoardProps {
  categories: ICategory[];
  currentClue?: Clue;
  answeringQuestion: boolean;
  handleClueClick: (id: number) => void;
}

export function Board({
  categories,
  handleClueClick,
  currentClue,
  answeringQuestion,
}: BoardProps) {
  return (
    <div className="board-block">
        <div className="board">
            {categories.length < 6 && (
              <Circles color="#00BFFF" height={80} width={80} ariaLabel="circles-loading" />
            )}
            {categories.length >= 6 && categories.map(category => {
                const clueValues = Object.keys(category.clues)
                return (
                  <div className="category">
                    <div className="category-title">
                      <p>{category.title}</p>
                    </div>
                    {clueValues.map(value => {
                      const num = parseInt(value)
                      if(num > 500) return null
                      const clue = category.clues[num]
                      const selectedClass = (currentClue?.id === clue.id && answeringQuestion === true) ? " selected" : " unselected"
                      return (
                        <div
                          onClick={() => handleClueClick(clue.id)}
                          className={"clue-tile" + selectedClass}
                        >
                          <p>{clue.answered ? null : clue.value}</p>
                        </div>
                      )
                    })}
                  </div>
                )
              }
            )}
        </div>
    </div>  
  )
}
