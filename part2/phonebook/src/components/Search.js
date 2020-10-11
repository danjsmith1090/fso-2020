import React from 'react'

const Search = (props) => {
  return (
    <>
        {props.text}: <input value={props.value} onChange={props.onChange}/>
    </> 
  )
}

export default Search;