import React from 'react'
import ClueTile from './ClueTile'
import { Category as ICategory, Clue } from '../types'

interface CategoryProps {
    category: ICategory;
    currentClue?: Clue;
    handleClueClick: (id: string) => void;
    answeringQuestion: boolean;
}

const Category: React.FC<CategoryProps> = props => {

    const renderClueTiles = () => {
        return Object.keys(props.category.clues).map(value => {
            const num = parseInt(value)
            return <ClueTile
                    key={props.category.clues[num].id}
                    clue={props.category.clues[num]}
                    currentClue={props.currentClue}
                    handleClueClick={props.handleClueClick}
                    answeringQuestion={props.answeringQuestion}
                    />
        })
    }
    
    return (
        <div className="category">
            <div className="category-title">
                <p>{props.category.title}</p>
            </div>
            {renderClueTiles()}
        </div>
    )
}

export default Category