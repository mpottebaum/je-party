import { Clue, Category as ICategory } from '../types'
import { WithLoader } from './with-loader'

interface BoardProps {
  categories: ICategory[]
  isCategoriesLoading: boolean
  currentClue?: Clue
  answeringQuestion: boolean
  handleClueClick: (id: number) => void
}

export function Board({
  categories,
  isCategoriesLoading,
  handleClueClick,
  currentClue,
  answeringQuestion,
}: BoardProps) {
  return (
    <div className="board">
      <WithLoader isLoading={isCategoriesLoading}>
        {categories.map((category) => {
          const clueValues = Object.keys(category.clues)
          return (
            <div key={category.id} className="category">
              <div className="category-title">
                <p>{category.title}</p>
              </div>
              {clueValues.map((value) => {
                const num = parseInt(value)
                if (num > 500) return null
                const clue = category.clues[num]
                const selectedClass =
                  currentClue?.id === clue.id && answeringQuestion === true
                    ? ' selected'
                    : ''
                return (
                  <div
                    key={clue.id}
                    onClick={() => handleClueClick(clue.id)}
                    className={
                      'clue-tile' +
                      selectedClass +
                      (clue.answered ? ' answered' : '')
                    }
                  >
                    <p>{clue.answered ? null : `$${clue.value}`}</p>
                  </div>
                )
              })}
            </div>
          )
        })}
      </WithLoader>
    </div>
  )
}
