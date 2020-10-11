import React, { useState } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
        ])
    const [newName, setNewName ] = useState('Add Name')
    const [newNumber, setNewNumber ] = useState('')
    const [searchString, setsearchString ] = useState('')
    const [showAll, setShowAll] = useState(true)

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