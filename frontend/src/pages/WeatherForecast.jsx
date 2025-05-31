import { useState } from 'react';
import "./WeatherForecast.css";
import SearchBar from '../components/weather/SearchBar';
import WeatherCurrent from '../components/weather/WeatherCurrent';
import HourlyForecast from '../components/weather/HourlyForecast';
import AirConditions from '../components/weather/AirConditions';
import WeeklyForecast from '../components/weather/WeeklyForecast';
import axios from 'axios';

function WeatherForecast() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); // State for "See More" functionality

  const API_KEY = '4430343dc8149c573dd0523e962d7d7b'; // Replace with your API key

  const fetchWeather = async (city) => {
    if (!city) return;

    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData(null);

    try {
      const currentResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      setWeatherData(currentResponse.data);
      setForecastData(forecastResponse.data);
    } catch (err) {
      setError('City not found or API error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSeeMore = () => {
    setIsExpanded(true); // Show expanded Air Conditions
  };

  const handleClose = () => {
    setIsExpanded(false); // Revert to original layout
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="title">
            {weatherData && (
              <span className="weather-icon">
                {/* <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt={weatherData.weather[0].description}
                  style={{ width: '40px', height: '40px' }}
                /> */}
              </span>
            )}
            Predict the Weather
          </h1>
          <SearchBar onSearch={fetchWeather} />
        </div>
      </header>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && forecastData && (
        <div className="weather-container">

          {/* Current Weather */}
          <div className='weather-current'>
            <WeatherCurrent weather={weatherData} />
          </div>

          {/* Weekly (7-Day) Forecast as a horizontal section */}
          <div className="weekly-section">
            <WeeklyForecast forecast={forecastData.list} />
          </div>

          {/* Hourly Forecast and Air Conditions arranged vertically */}
          <div className="vertical-section">
            <HourlyForecast forecast={forecastData.list} />
          </div>
            <div className="air-conditions">
              <h3>Air Conditions</h3>
              {!isExpanded ? (
                <>
                  <div className="conditions-grid">

                    <div className="condition">
                      <span>Real Feel</span>
                      <span>{Math.round(weatherData.main.feels_like)}°</span>
                    </div>
                    
                    <div className="condition">
                      <span>Wind</span>
                      <span>{Math.round(weatherData.wind.speed * 3.6)} km/h</span>
                    </div>

                    <div className="condition">
                      <span>Chance of Rain</span>
                      <span>{weatherData.clouds.all}%</span>
                    </div>

                  </div>

                  <button className="see-more" onClick={handleSeeMore}>
                    See More
                  </button>
                </>
              ) : (<>
                <div className="modal-content">

                  <div className='upper-container'>

                    <div className="condition">
                      <span>Real Feel</span>
                      <span>{Math.round(weatherData.main.feels_like)}°</span>
                    </div>

                    <div className="condition">
                      <span>Wind</span>
                      <span>{Math.round(weatherData.wind.speed * 3.6)} km/h</span>
                    </div>

                    <div className="condition">
                      <span>Chance of Rain</span>
                      <span>{weatherData.clouds.all}%</span>
                    </div>

                  </div>

                  <div className='lower-container'>
                    
                    <div className='condition'>
                      <span>Pressure</span> 
                      <span>{weatherData.main.pressure} hPa</span>
                    </div>

                    <div className='condition'>
                      <span>Visibility</span> 
                      <span>{weatherData.visibility / 1000} km</span>
                    </div>
                    
                    <div className='condition'>
                      <span>Humidity</span> 
                      <span>{weatherData.main.humidity}%</span>
                    </div>
                    
                  </div>

                </div>

                <button className="close-modal" onClick={handleClose}>
                  Close
                </button>
                </>)}
            </div>
          </div>
      )}
    </div>
  );
}

export default WeatherForecast;
