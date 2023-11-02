import "./CurrentWeather.css";
import React from "react";
import hot_location from "./Assets/hot-location.png";
import cold_location from "./Assets/cold-location.png";
import hot_temperature from "./Assets/hot-temperature.png";
import cold_temperature from "./Assets/cold-temperature.png";
import hot_pressure from "./Assets/hot-pressure.png";
import cold_pressure from "./Assets/cold-pressure.png";
import hot_wind from "./Assets/hot-wind.png";
import cold_wind from "./Assets/cold-wind.png";
import hot_humidity from "./Assets/hot-humidity.png";
import cold_humidity from "./Assets/cold-humidity.png";

const CurrentWeather = ({data}) => {

  // Define a temperature threshold for changing the gradient
  const temperatureThreshold = 19; // Adjust the threshold as needed

  // Determine which CSS class to use based on the temperature
  const backgroundClass = data.main.temp > temperatureThreshold ? 'gradient-orange' : 'gradient-blue';

  const textShadowClass = data.main.temp > temperatureThreshold ? 'text-shadow-black' : 'text-shadow-white';

  const imgThreeDClass = data.main.temp > temperatureThreshold ? 'img-color-black img-shadow-white' : 'img-color-white img-shadow-black';

  const location = data.main.temp > temperatureThreshold ? hot_location : cold_location;

  const feels_like = data.main.temp > temperatureThreshold ? hot_temperature : cold_temperature;

  const wind = data.main.temp > temperatureThreshold ? hot_wind : cold_wind;

  const humidity = data.main.temp > temperatureThreshold ? hot_humidity : cold_humidity;

  const pressure = data.main.temp > temperatureThreshold ? hot_pressure : cold_pressure;
  return (
    <div className={`weather ${backgroundClass}`}>
        {/* current weather data block */}
        <div className="top img-down">
            <div className="city-weather-description">
                <img src={location} alt="searched_location" className={`${imgThreeDClass}`}/>
                <div className={`city-name-weather-desc ${textShadowClass}`}>
                    <p className="city">{data.city}</p>
                    <p className="weather-description">{data.weather[0].description}</p>
                </div>
            </div>
            
        </div>
        <div className="middle">
            <div className="middle-top">
                <div className="parameter-row">
                    <img src={feels_like} alt="temperature_icon" className={`${imgThreeDClass}`}/>
                    <div className={`current-weather-data ${textShadowClass}`}>
                        <span className="parameter-value">{Math.round(data.main.feels_like)}°C</span>
                        <span className="parameter-label">Feels like</span>
                    </div>
                </div>
                <div className="parameter-row">
                    <img src={wind} alt="wind_icon" className={`${imgThreeDClass}`}/>
                    <div className={`current-weather-data ${textShadowClass}`}>
                        <span className="parameter-value">{data.wind.speed}m/s</span>
                        <span className="parameter-label">Wind</span>
                    </div>
                </div>
            </div>
            <img src={`icons/${data.weather[0].icon}.png`} alt="weather" className={`weather-icon ${imgThreeDClass}`} />
            <div className="middle-bottom">
                <div className="parameter-row">
                    <img src={humidity} alt="humidity_icon" className={`${imgThreeDClass}`}/>
                    <div className={`current-weather-data ${textShadowClass}`}>
                        <span className="parameter-value">{data.main.humidity} %</span>
                        <span className="parameter-label">Humidity</span>
                    </div>
                </div>
                <div className="parameter-row">
                    <img src={pressure} alt="pressure_icon" className={`${imgThreeDClass}`}/>
                    <div className={`current-weather-data ${textShadowClass}`}>
                        <span className="parameter-value">{data.main.pressure} hPa</span>
                        <span className="parameter-label">Pressure</span>
                    </div>
                </div>
            </div>
        </div>
        <div className={`bottom ${textShadowClass}`}>
            <p className="temperature">{Math.round(data.main.temp)}°C</p>
        </div>

    </div>
  )
}

export default CurrentWeather
