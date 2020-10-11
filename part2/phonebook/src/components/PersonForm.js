import React from 'react'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
        <div>
            name: <input value={props.newNameValue} onChange={props.newNameOnChange}/>
        </div>
        <div>
            number: <input value={props.newNumberValue} onChange={props.newNumberOnChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form> 
  )
}

export default PersonForm;