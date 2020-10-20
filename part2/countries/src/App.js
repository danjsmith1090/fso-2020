import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

function App() {

  const [countries, setCountries] = useState([])
  const [searchString, setSearchString] = useState('')
  const [filtered, setFiltered] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    if(event.target.value !== ''){
      setFiltered(false)
    }
    else{
      setFiltered(true)
    }
    setSearchString(event.target.value)      
  } 

  const filteredCountries = filtered
  ? countries
  : countries.filter(countries => countries.name.toUpperCase().includes(searchString.toUpperCase()))

  const countriesToShow = filteredCountries.length > 10
  ? []
  :filteredCountries

  return (
    <>
        Find countries <input value={searchString} onChange={handleSearchChange}/>
        <CountryList countries={countriesToShow} />
        
    </>
  );
}

export default App;