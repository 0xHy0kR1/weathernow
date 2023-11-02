import './App.css';
import Search from './components/search/Search';
import CurrentWeather from './components/current-weather/CurrentWeather';
import { WEATHER_API_URL} from './api';
import { useState } from 'react';
import Forecast from './components/forecast/Forecast';

function App() {

  const apiKey = process.env.REACT_APP_WEATHER_API;


  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  // The "handleOnSearchChange" is a arrow function
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" "); // searchData is a object and from there we extract latitude and longitude
    
    // Two fetch requests are made, one for current weather and one for the weather forecast. These requests are asynchronous operations that will return promises that resolve when the network requests complete.
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&cnt=7`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&cnt=7`)

    // Promise.all waits for all promises in the array to resolve. It won't continue to the next step until all promises are settled (either resolved or rejected).
    Promise.all([currentWeatherFetch, forecastFetch])

    // The .then method is called on the promise returned by Promise.all. It takes a callback function that will execute when all the promises passed to Promise.all have resolved.
      .then(async (response) => {

        // response is an array containing the resolved values from the promises in the same order as they were provided to Promise.all

        // The await keyword is used to pause the execution of this function until the promise returned by .json() is resolved, and the JSON data is available in the weatherResponse variable and forecastResponse variable.
        const weatherResponse = await response[0].json(); // response[0] is the result of currentWeatherFetch
        const forecastResponse = await response[1].json(); // response[1] is the result of forecastFetch

        // Update the state variables with the received data.
        setCurrentWeather({city: searchData.label, ...weatherResponse}); // it's setting the currentWeather state with an object that includes the city name from searchData.label and all the properties from the weatherResponse. 
        setForecast({city: searchData.label, ...forecastResponse}); // It sets the forecast state with an object that includes the city name and all the properties from the forecastResponse.
      })
      .catch((err) => console.log(err)); // The .catch method is used to handle errors if any of the promises in Promise.all are rejected. It logs the error to the console.
  }
  console.log(currentWeather);
  console.log(forecast);
  return (
    <div className="container">
      {/* When you render the Search component, you pass the handleOnSearchChange function as a prop using the onSearchChange attribute. This allows the Search component to call the handleOnSearchChange function when changes occur in the search input. */}
      <Search onSearchChange={handleOnSearchChange} />
      <div className="weather-data">
        {currentWeather && <CurrentWeather data={currentWeather}/>}
        {forecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default App;
