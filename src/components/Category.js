import React from 'react'
import ClueTile from './ClueTile'

const Category = props => {

    
    console.log(props)
    return (
        <div className="category">
            <div className="category-title">
                <p>{props.category.title}</p>
            </div>
            <ClueTile categoryId={props.category.id} value={"100"} handleClueClick={props.handleClueClick}/>
            <ClueTile categoryId={props.category.id} value={"200"} handleClueClick={props.handleClueClick}/>
            <ClueTile categoryId={props.category.id} value={"300"} handleClueClick={props.handleClueClick}/>
            <ClueTile categoryId={props.category.id} value={"400"} handleClueClick={props.handleClueClick}/>
            <ClueTile categoryId={props.category.id} value={"500"} handleClueClick={props.handleClueClick}/>
        </div>
    )
}

export default Category