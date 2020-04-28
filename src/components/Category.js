import React from 'react'
import ClueTile from './ClueTile'

const Category = props => {

    const renderClueTiles = () => {
        return Object.keys(props.category.clues).map(value => {
            return <ClueTile
                    clue={props.category.clues[value]}
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