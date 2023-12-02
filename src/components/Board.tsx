import { Clue, Category as ICategory } from '../types'
import {Circles} from 'react-loader-spinner'
import {Category} from './category';

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
            {categories.length >= 6 && (
              categories.map(category => (
                <Category
                    key={category.id}
                    handleClueClick={handleClueClick}
                    category={category}
                    currentClue={currentClue}
                    answeringQuestion={answeringQuestion}
                />
              ))
            )}
        </div>
    </div>  
  )
}
