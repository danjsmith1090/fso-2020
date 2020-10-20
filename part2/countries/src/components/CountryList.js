import React, { useState, useEffect } from 'react'
import Country from './Country'

const CountryList = (props) => {

  const [countries, setCountries] = useState([])

  const handleButtonClick = (countryName) => {
    setCountries(countries.filter(countries => countries.name.toUpperCase() === countryName.toUpperCase()))
  }

    useEffect(() => {
      setCountries(props.countries)
    }, [props.countries])

    if (countries.length === 0) {
        return (
          <>
            <p>Too many countries - specify another filter</p>
          </>
        )
      }
    else if (countries.length === 1){

      return (
        <>
          <Country countryName={countries[0].name} />
        </>
      )

    }
    
    return (
        <>
        {countries.map(country =>
          <p key={country.name}>
            <span >{country.name} </span>
            <button onClick={() => {handleButtonClick(country.name)}}>Show details</button>          
          </p>
        )}
        </>
    )
}

export default CountryList;