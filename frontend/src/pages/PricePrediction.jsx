import { useState, useEffect } from 'react';
import axios from 'axios';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './PricePrediction.css';

const PricePrediction = () => {
  const [options, setOptions] = useState({ 
    states: [], 
    crops: [], 
    stateDistricts: {} // Changed from districts array to state-district mapping
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    date: null,
    crop: '',
    state: '',
    district: '',
    fieldSize: '',
  });

  // Fetch options on mount
  useEffect(() => {
    axios.get('http://localhost:5000/options')
      .then(res => setOptions(res.data))
      .catch(err => console.error('Failed to fetch options:', err));
  }, []);

  // Reset district when state changes
  useEffect(() => {
    setForm(prev => ({ ...prev, district: '' }));
  }, [form.state]);

  // Handle prediction submission
  const handlePredict = async (formData) => {
    setLoading(true);
    try {
      const formattedDate = formData.date
        ? `${formData.date.getDate().toString().padStart(2, '0')}-${(formData.date.getMonth() + 1).toString().padStart(2, '0')}-${formData.date.getFullYear()}`
        : '';
      const res = await axios.post('http://localhost:5000/crop-price-prediction', {
        date_str: formattedDate,
        crop: formData.crop,
        state: formData.state,
        district: formData.district,
        field_size: parseFloat(formData.fieldSize),
      });
      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.detail || 'Prediction failed');
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePredict(form);
  };

  const renderPredictionResult = () => {
    if (!result) return null;

    const items = [
      { label: 'Price Range (Min-Max)', value: result.price_range },
      { label: 'Predicted Modal Price', value: result.predicted_price },
      { label: 'Best District to Sell In', value: result.best_district },
      { label: 'Storage Advice', value: result.storage_advice },
      { label: 'Market Trend', value: result.market_trend },
      { label: 'Expected Revenue', value: result.expected_revenue },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 p-6 bg-farm-cream rounded-lg border border-farm-green/20"
      >
        <h2 className="text-2xl font-semibold text-farm-brown mb-4">Prediction Results</h2>
        <div className="space-y-3">
          {items.map((item, idx) => (
            <p key={idx} className="text-farm-brown">
              <span className="font-medium text-farm-green">📌 {item.label}:</span> {item.value}
            </p>
          ))}
        </div>
      </motion.div>
    );
  };

  // Get districts for the selected state
  const availableDistricts = form.state ? options.stateDistricts[form.state] || [] : [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-farm-cream to-farm-green/10 p-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-farm glow p-8">
        <h1 className="text-4xl font-bold text-farm-green text-center mb-8 tracking-tight">
          Farmer Price Predictor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-farm-brown mb-2">Date</label>
            <div className="relative">
              <DatePicker
                selected={form.date}
                onChange={(date) => setForm({ ...form, date })}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select a date"
                className="w-full p-2 border border-farm-green/20 rounded-lg pr-10"
                required
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-farm-green pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-lg font-semibold text-farm-brown mb-2">Crop</label>
            <select
              value={form.crop}
              onChange={e => setForm({ ...form, crop: e.target.value })}
              className="w-full p-2 border border-farm-green/20 rounded-lg"
              required
            >
              <option value="">Select Crop</option>
              {options.crops.map(crop => <option key={crop} value={crop}>{crop}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold text-farm-brown mb-2">State</label>
            <select
              value={form.state}
              onChange={e => setForm({ ...form, state: e.target.value })}
              className="w-full p-2 border border-farm-green/20 rounded-lg"
              required
            >
              <option value="">Select State</option>
              {options.states.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold text-farm-brown mb-2">District</label>
            <select
              value={form.district}
              onChange={e => setForm({ ...form, district: e.target.value })}
              className="w-full p-2 border border-farm-green/20 rounded-lg"
              required
              disabled={!form.state} // Disable until state is selected
            >
              <option value="">Select District</option>
              {availableDistricts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold text-farm-brown mb-2">Field Size (acres)</label>
            <input
              type="number"
              value={form.fieldSize}
              onChange={e => setForm({ ...form, fieldSize: e.target.value })}
              min="0.1"
              step="0.1"
              className="w-full p-2 border border-farm-green/20 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-farm-green text-white rounded-lg font-semibold text-lg hover:bg-farm-green/90 disabled:bg-farm-brown/50"
          >
            {loading ? 'Predicting...' : 'Get Prediction'}
          </button>
        </form>

        {renderPredictionResult()}
      </div>
    </div>
  );
};

export default PricePrediction;