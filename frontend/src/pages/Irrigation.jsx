import { useState } from 'react';
import axios from 'axios';
import './Irrigation.css';

const Irrigation = () => {
  // Form state
  const [formData, setFormData] = useState({
    Crop_Type: '',
    Farm_Area: '',
    Irrigation_Type: '',
    Season: '',
    Motor_Capacity: '',
  });

  // Prediction and error states
  const [predictions, setPredictions] = useState(null);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields are filled
    if (!formData.Crop_Type || !formData.Farm_Area || !formData.Irrigation_Type || 
        !formData.Season || !formData.Motor_Capacity) {
      setError('Please fill in all fields');
      return;
    }

    const data = {
      'Crop_Type': formData.Crop_Type,
      'Farm_Area(acres)': parseFloat(formData.Farm_Area),
      'Irrigation_Type': formData.Irrigation_Type,
      'Season': formData.Season,
      'Motor_Capacity(HP)': parseFloat(formData.Motor_Capacity),
    };

    try {
      const response = await axios.post('http://localhost:5000/irrigation-prediction', data);
      setPredictions(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching predictions: ' + (err.message || 'Unknown error'));
      setPredictions(null);
    }
  };

  // Prediction Result component
  const PredictionResult = ({ predictions }) => {
    // Guard clause for invalid predictions
    if (!predictions || typeof predictions !== 'object') {
      return null;
    }

    return (
      <div className="prediction-container">
        <h2 className="prediction-title">Irrigation Predictions</h2>
        <ul className="prediction-list">
          <li>
            <span className="prediction-label">Irrigation Time:</span> 
            {(predictions['Irrigation_Time(hours)'] || 0).toFixed(2)} hours
          </li>
          <li>
            <span className="prediction-label">Total Water Needed:</span> 
            {(predictions['Total_Water_Needed(cubic meters)'] || 0).toFixed(2)} cubic meters
          </li>
          <li>
            <span className="prediction-label">Energy Consumption:</span> 
            {(predictions['Energy_Consumption(kWh)'] || 0).toFixed(2)} kWh
          </li>
          <li>
            <span className="prediction-label">System Efficiency:</span> 
            {(predictions['Irrigation_System_Efficiency(%)'] || 0).toFixed(2)}%
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="app-container">
      <h1 className="app-title">FARMER IRRIGATION PREDICTOR</h1>
      <div className="title-underline"></div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label className="form-label">Crop Type</label>
          <select 
            name="Crop_Type" 
            value={formData.Crop_Type} 
            onChange={handleChange} 
            className="form-input"
            required
          >
            <option value="" disabled>Select Crop Type</option>
            <option value="Wheat">Wheat</option>
            <option value="Rice">Rice</option>
            <option value="Maize">Maize</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Farm Area (acres)</label>
          <input
            type="number"
            name="Farm_Area"
            value={formData.Farm_Area}
            onChange={handleChange}
            className="form-input"
            step="0.1"
            min="0"
            placeholder="e.g., 2"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Irrigation Type</label>
          <select 
            name="Irrigation_Type" 
            value={formData.Irrigation_Type} 
            onChange={handleChange} 
            className="form-input"
            required
          >
            <option value="" disabled>Select Irrigation Type</option>
            <option value="Drip">Drip</option>
            <option value="Flood">Flood</option>
            <option value="Sprinkler">Sprinkler</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Season</label>
          <select 
            name="Season" 
            value={formData.Season} 
            onChange={handleChange} 
            className="form-input"
            required
          >
            <option value="" disabled>Select Season</option>
            <option value="Kharif">Kharif</option>
            <option value="Rabi">Rabi</option>
            <option value="Summer">Summer</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Motor Capacity (HP)</label>
          <input
            type="number"
            name="Motor_Capacity"
            value={formData.Motor_Capacity}
            onChange={handleChange}
            className="form-input"
            step="0.1"
            min="0"
            placeholder="e.g., 5"
            required
          />
        </div>
        <button type="submit" className="submit-button">ANALYZE</button>
      </form>

      {/* Error and Prediction Display */}
      {error && <p className="error-message">{error}</p>}
      {predictions && <PredictionResult predictions={predictions} />}
    </div>
  );
};

export default Irrigation;