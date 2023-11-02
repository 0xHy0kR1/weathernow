import React from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { useState } from 'react';
import { GEO_API_URL, geoApiOptions } from '../../api'; // Here, we import both the api URL and "geoApiOptions" function

// the "onSearchChange" is a function that is passed from the parent component as a props
const Search = ({onSearchChange}) => {
  
  const [search, setSearch] = useState(null);

  // The "loadOptions" is a arrow function and it takes the value(inputValue) that we write in searchbox and search for similar items
  const loadOptions = (inputValue) => {

    return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions) // The "minPopulation" help us to fetch only those cities that have minimum population of 1000000 and namePrefix help us to fetch only those cities that name starts with the value of "inputValue"

    .then(response => response.json()) // Once we get the response the then we map the response to the json
    .then(response => {
      // Check if there are options available.
      // The expression response.data && Array.isArray(response.data) is a JavaScript conditional check used to determine whether the response.data is both defined (not null or undefined) and is an array.
      if (response.data && Array.isArray(response.data)) {
        return {
          options: response.data.map((city) => ({
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          })),
        };
      } else {
        // No options found, return an empty array.
        return { options: [] };
      }
    })
    .catch(err => console.error(err));
  }

  // The "handleOnChange" is a arrow function and it takes the value(searchData) that we write in searchbox
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData); //Called the "onSearchChange" function
  }
  return (

    // AsyncPaginate handles searches for cities
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions} // this particular attribute help us to load Similar cities based on searched query(Like if you type "in" then it automatically shows "india", "indiano", etc...)
    />
  )
}

export default Search
