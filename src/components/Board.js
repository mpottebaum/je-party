import React from 'react'
import Category from './Category'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

const Board = props => {
    const renderCategories = () => {
        if(props.categories.length < 6) {
            return <Loader type="Circles" color="#00BFFF" height={80} width={80}/>
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