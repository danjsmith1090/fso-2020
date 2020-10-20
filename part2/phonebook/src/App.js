import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName ] = useState('Add Name')
    const [newNumber, setNewNumber ] = useState('')
    const [searchString, setsearchString ] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            setPersons(response.data)
          })
      }, [])

    const addName = (event) => {
        event.preventDefault()

        const existing = persons.some(p => p.name === newName)
        
        if (existing === true){
            alert(`${newName} is already in the phonebook`)
            setNewName('')
            return
        }

        const personObject = {
        name: newName,
        id: newName,
        number: newNumber
        } 
    
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        if(event.target.value !== ''){
            setShowAll(false)
        }
        else{
            setShowAll(true)
        }
        setsearchString(event.target.value)      
    }

    const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.includes(searchString))

  return (
    <div>
        <h2>Phonebook</h2>
        <Search text = "Filter" value={searchString} onChange={handleSearchChange}/>
        <h3>Add New</h3>
        <PersonForm onSubmit={addName} newNameValue={newName} newNameOnChange={handleNameChange} newNumberValue={newNumber} newNumberOnChange={handleNumberChange}/>
        <h2>Numbers</h2>
        {personsToShow.map(persons =>
            <Person key={persons.name} name={persons.name} number={persons.number} />
        )}    
    </div>
  )
}

export default App