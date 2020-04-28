import React from 'react'
import Category from './Category'

const Board = props => {
    const renderCategories = () => {
        if(props.categories.length < 6) {
            return <p>Loading Board...</p>
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