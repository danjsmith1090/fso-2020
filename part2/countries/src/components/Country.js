import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Country(props) {

  const [country, setCountry] = useState([])
  const [languages, setLanguages] = useState([])
  const countryName = props.countryName

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/name/' + countryName)
      .then(response => {
        setCountry(response.data[0])
        setLanguages(response.data[0].languages)
      })
  }, [countryName])

  return (
    <>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p> 
        <p>Population: {country.population}</p>     
        <h3>Languages</h3>
        <ul>
            {languages.map(lang =>
                <li key={lang.name}>{lang.name}</li>
            )}
        </ul>
        <img src={country.flag} alt="" ></img>
    </>
  );
}

export default Country;