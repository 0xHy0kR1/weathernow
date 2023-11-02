import React from 'react';
import './Forecast.css';

const Forecast = ({ data }) => {

  // Define a temperature threshold for changing the gradient
  const temperatureThreshold = 19; // Adjust the threshold as needed

  // Determine which CSS class to use based on the temperature
  const backgroundClass = data.list[0].main.temp > temperatureThreshold ? 'gradient-orange' : 'gradient-blue';

  const cardChangeDynamically = data.list[0].main.temp > temperatureThreshold ? 'hot-black-card-white-text' : 'cold-white-card-black-text';

  const headingChangeDynamically = data.list[1].main.temp > temperatureThreshold ? 'forecast-heading-shadow-and-color-with-white-background' : 'forecast-heading-shadow-and-color-with-black-background';
  return (
    <div className={`weather bdwhite ${backgroundClass}`}>
      <h2 className={`heading ${headingChangeDynamically}`}>Three-Hour Forecast</h2>
      <div className="forecast-cards">
        {data.list.slice(0, 7).map((item, index) => (
          <div key={index} className={`forecast-card ${cardChangeDynamically}`}>
            <div className="future-forecast-time">
              <p className="dayOfWeek">{formatDay(item.dt)}</p>
              <p className="AmPmTime">{formatTime(item.dt)}</p>
            </div>
            <p className="description">{item.weather[0].description}</p>
            <p className="temperature">{Math.round(item.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hour = date.getHours();
  const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour} ${ampm}`;
};

const formatDay = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = days[date.getDay()];
    return `${dayOfWeek}`;
};

export default Forecast;