import React from 'react'

const ClueTile = props => {
    return (
        <div
            onClick={props.handleClueClick}
            data-category-id={props.categoryId}
            data-value={props.value}
            className="clue-tile"
            >
                <p>{props.value}</p>
        </div>
    )
}

export default ClueTile