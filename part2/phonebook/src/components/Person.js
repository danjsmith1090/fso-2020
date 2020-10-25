import React from 'react'

const Person = (props) => {
  return (
    <>
          <p>
            <span>{props.name}: {props.number} </span>
            <button onClick={() => {props.deleteButtonClick(props.id, props.name)}}>Delete</button>          
          </p>
    </> 
  )
}

export default Person;