import React from 'react'

const ClueTile = props => {
    let borderStyle
    if(props.currentClue && props.currentClue.id === props.clue.id && props.answeringQuestion === true) {
        borderStyle={border: "solid yellow"}
    } else {
        borderStyle={border: "solid black"}
    }

    return (
        <div
            onClick={() => props.handleClueClick(props.clue.id)}
            className="clue-tile"
            style={borderStyle}
            >
                <p>{props.clue.answered ? null : props.clue.value}</p>
        </div>
    )
}

export default ClueTile