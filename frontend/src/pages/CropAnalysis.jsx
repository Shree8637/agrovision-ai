import { useState, useEffect } from 'react';
import './CropAnalysis.css';

const CropAnalysis = () => {
  const [inputs, setInputs] = useState({
    district: '',
    crop: '',
    farmSize: '',
    season: '',
    irrigation: 'Yes',
    previousCrop: ''
  });
  const [result, setResult] = useState(null);
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [availableCrops, setAvailableCrops] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/districts')
      .then((res) => res.json())
      .then((data) => {
        if (data.districts) {
          // Sort districts in ascending order
          const sortedDistricts = data.districts.sort((a, b) => a.localeCompare(b));
          setAvailableDistricts(sortedDistricts);
        } else {
          setAvailableDistricts([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching districts:', err);
        setAvailableDistricts([]);
      });
  }, []);

  useEffect(() => {
    if (inputs.district) {
      fetch(`http://localhost:5000/crops?district=${encodeURIComponent(inputs.district)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.crops) {
            setAvailableCrops(data.crops);
            if (!data.crops.includes(inputs.crop)) setInputs((prev) => ({ ...prev, crop: '' }));
            if (!data.crops.includes(inputs.previousCrop)) setInputs((prev) => ({ ...prev, previousCrop: '' }));
          } else {
            setAvailableCrops([]);
            setInputs((prev) => ({ ...prev, crop: '', previousCrop: '' }));
          }
        })
        .catch((err) => {
          console.error('Error fetching crops:', err);
          setAvailableCrops([]);
        });
    } else {
      setAvailableCrops([]);
      setInputs((prev) => ({ ...prev, crop: '', previousCrop: '' }));
    }
  }, [inputs.district]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      district: inputs.district,
      crop: inputs.crop,
      farm_size_ha: parseFloat(inputs.farmSize),
      season: inputs.season,
      irrigation: inputs.irrigation,
      previous_crop: inputs.previousCrop
    };
    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Fetch error:', error.message);
      setResult({ error: `Failed to fetch analysis: ${error.message}` });
    }
  };

  return (
    <div className="agri-wrapper">
      <header className="agri-header">
        <h1 className="agri-title">Crop Analysis Tool</h1>
        <div className="agri-header-decor"></div>
      </header>
      <main className="container my-5 agri-theme">
        <form onSubmit={handleSubmit} className="agri-form">
          <div className="mb-3 agri-field">
            <label className="form-label agri-label">District</label>
            <select
              name="district"
              value={inputs.district}
              onChange={handleChange}
              className="form-select agri-select"
              required
              disabled={availableDistricts.length === 0}
            >
              <option value="">Select District</option>
              {availableDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {availableDistricts.length === 0 && (
              <small className="text-danger agri-hint">No districts available</small>
            )}
          </div>
          <div className="mb-3 agri-field">
            <label className="form-label agri-label">Crop</label>
            <select
              name="crop"
              value={inputs.crop}
              onChange={handleChange}
              className="form-select agri-select"
              required
              disabled={!inputs.district || availableCrops.length === 0}
            >
              <option value="">Select Crop</option>
              {availableCrops.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
            {!inputs.district && (
              <small className="text-muted agri-hint">Select a district to see available crops</small>
            )}
            {inputs.district && availableCrops.length === 0 && (
              <small className="text-danger agri-hint">No crops found for this district</small>
            )}
          </div>
          <div className="mb-3 agri-field">
            <label className="form-label agri-label">Farm Size (ha)</label>
            <input
              type="number"
              name="farmSize"
              value={inputs.farmSize}
              onChange={handleChange}
              className="form-control agri-input"
              placeholder="e.g., 2"
              step="0.1"
              required
            />
          </div>
          <div className="mb-3 agri-field">
            <label className="form-label agri-label">Season</label>
            <select
              name="season"
              value={inputs.season}
              onChange={handleChange}
              className="form-select agri-select"
              required
            >
              <option value="">Select Season</option>
              <option value="Kharif">Kharif</option>
              <option value="Rabi">Rabi</option>
              <option value="Whole Year">Whole Year</option>
            </select>
          </div>
          <div className="mb-3 agri-field">
            <label className="form-label agri-label">Irrigation Available</label>
            <select
              name="irrigation"
              value={inputs.irrigation}
              onChange={handleChange}
              className="form-select agri-select"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-3 agri-field">
            <label className="form-label agri-label">Previous Crop</label>
            <select
              name="previousCrop"
              value={inputs.previousCrop}
              onChange={handleChange}
              className="form-select agri-select"
              required
              disabled={!inputs.district || availableCrops.length === 0}
            >
              <option value="">Select Previous Crop</option>
              {availableCrops.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
            {!inputs.district && (
              <small className="text-muted agri-hint">Select a district to see available previous crops</small>
            )}
            {inputs.district && availableCrops.length === 0 && (
              <small className="text-danger agri-hint">No crops found for this district</small>
            )}
          </div>
          <button type="submit" className="btn agri-btn w-100">Analyze</button>
        </form>

        {result && (
          <div className="mt-4 agri-result">
            <h2 className="agri-subtitle">Analysis Results</h2>
            {result.error ? (
              <p className="text-danger agri-error">{result.error}</p>
            ) : (
              <ul className="list-group agri-list">
                {Object.entries(result).map(([key, value]) => (
                  <li key={key} className="list-group-item agri-list-item">
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CropAnalysis;