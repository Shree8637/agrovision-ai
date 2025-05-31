import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'; // Correct import for Feather Search icon

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
    setCity('');
  };

  // const handleCurrentLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         fetchWeatherByCoords(latitude, longitude);
  //       },
  //       (error) => {
  //         console.error('Error getting location:', error);
  //         alert('Unable to retrieve your location. Please enable location services or try searching manually.');
  //       }
  //     );
  //   } else {
  //     alert('Geolocation is not supported by your browser.');
  //   }
  // };

  // const fetchWeatherByCoords = async (lat, lon) => {
  //   try {
  //     const response = await fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4430343dc8149c573dd0523e962d7d7b&units=metric`
  //     );
  //     const data = await response.json();
  //     if (data.name) {
  //       onSearch(data.name); // Trigger weather fetch with city name
  //     } else {
  //       throw new Error('Location not found');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching weather by location:', error);
  //     alert('Error fetching weather for your location. Please try searching manually.');
  //   }
  // };

  return (
    <div className="search-container">
      <FiSearch className="search-icon" />
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for cities"
          className="search-input"
        />
      </form>
    </div>
  );
}

export default SearchBar;