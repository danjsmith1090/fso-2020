import React from 'react';

const Header = ({ courseName }) => {
    return (
      <h1>{courseName}</h1>
    )
  }
  
  const Total = ({ parts }) => {
    const total = parts.reduce((s, p,) => s + p.exercises, 0)
    return(
      <p>Number of exercises {total}</p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      parts.map(part => <Part key={part.id} part={part} />)
    )
  }
  
const Course = ({ course }) => {
return (
    <>
    <Header courseName = {course.name}/>
    <Content parts = {course.parts}/>
    <Total parts = {course.parts}/>
    </>
    )
}

export default Course
  