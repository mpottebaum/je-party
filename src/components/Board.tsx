import React from 'react'
import Category from './Category'
import {Circles} from 'react-loader-spinner'
import { Clue, Category as ICategory } from '../types'

interface BoardProps {
    categories: ICategory[];
    currentClue?: Clue;
    answeringQuestion: boolean;
    handleClueClick: (id: string) => void;
}

const Board: React.FC<BoardProps> = props => {
    const renderCategories = () => {
        if(props.categories.length < 6) {
            return <Circles color="#00BFFF" height={80} width={80} ariaLabel="circles-loading" />
        } else {
            return props.categories.map(category => {
                return <Category
                        key={category.id}
                        handleClueClick={props.handleClueClick}
                        category={category}
                        currentClue={props.currentClue}
                        answeringQuestion={props.answeringQuestion}
                        />
            })
        }
    }

    return (
        <div className="board-block">
            <div className="board">
                {renderCategories()}
            </div>
        </div>
    )
}

export default Board