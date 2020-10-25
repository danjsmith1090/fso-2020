import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName ] = useState('Add Name')
    const [newNumber, setNewNumber ] = useState('')
    const [searchString, setsearchString ] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationType, setNotificationType] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPerons => {
                setPersons(initialPerons)
            })
    }, [])

    const addName = (event) => {
        event.preventDefault()

        const existing = persons.some(p => p.name === newName)
        
        if (existing === true){

            const confirmUpdate = window.confirm(`${newName} is already in the phonebook. Replace old number with the new one?`)

            if (confirmUpdate){

                const existingPerson = persons.find(n => n.name === newName)
                const changedPerson = { ...existingPerson, number: newNumber }

                personService
                .update(existingPerson.id, changedPerson)
                .then((response) => {      
                    setPersons(persons.map(person => person.id !== existingPerson.id ? person : response))
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    setNotificationMessage(
                      `Person '${newName}' was already removed from server`
                    )
                    setNotificationType("Error")
                    setTimeout(() => {
                    setNotificationMessage(null)
                    setNotificationType(null)
                    }, 5000)
                })

            }

            setNewName('')
            return
        }

        const personObject = {
            name: newName,
            id: newName,
            number: newNumber
        }

        personService
            .create(personObject)
            .then(newPerson => {
                setPersons(persons.concat(newPerson))
                setNewName('')
                setNewNumber('')
                setNotificationMessage(
                    `Added '${newName}'`
                  )
                setNotificationType("Success")
                setTimeout(() => {
                    setNotificationMessage(null)
                    setNotificationType(null)
                }, 5000)
        })

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

    const handleDeleteButtonClick = (id, name) => {

        const confirmDelete = window.confirm("Delete " + name)

        if (confirmDelete){
            personService
            .deletePerson(id)
            .then(() => {      
                setPersons(persons.filter(person => person.id !== id))
                setNewName('')
                setNewNumber('')
            })
        }

    }

    const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.includes(searchString))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} notificationType={notificationType} />
            <Search text = "Filter" value={searchString} onChange={handleSearchChange}/>
            <h3>Add New</h3>
            <PersonForm onSubmit={addName} newNameValue={newName} newNameOnChange={handleNameChange} newNumberValue={newNumber} newNumberOnChange={handleNumberChange}/>
            <h2>Numbers</h2>
            {personsToShow.map(persons =>
                <Person key={persons.id} id={persons.id} name={persons.name} number={persons.number} deleteButtonClick={handleDeleteButtonClick} />
            )}    
        </div>
    )
}

export default App