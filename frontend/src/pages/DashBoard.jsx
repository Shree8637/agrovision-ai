import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line, Scatter, Pie } from 'react-chartjs-2';
import './DashBoard.css';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong in this section.</div>;
    }
    return this.props.children;
  }
}

// Static data for fallback
const staticData = [
  { state: "Andhra Pradesh", district: "Anantapur", market: "Hindupur", commodity: "Tamarind Fruit", variety: "Non A/c Fine", grade: "FAQ", arrival_date: "20/03/2025", min_price: 8100, max_price: 33000, modal_price: 18000 },
  { state: "Andhra Pradesh", district: "Anantapur", market: "Hindupur", commodity: "Tamarind Fruit", variety: "Non A/c Flower", grade: "FAQ", arrival_date: "20/03/2025", min_price: 4320, max_price: 12500, modal_price: 6000 },
  { state: "Andhra Pradesh", district: "Anantapur", market: "Rayadurg", commodity: "Tamarind Fruit", variety: "Non A/c Flower", grade: "FAQ", arrival_date: "20/03/2025", min_price: 6300, max_price: 10300, modal_price: 10000 },
  { state: "Andhra Pradesh", district: "Chittor", market: "Madanapalli", commodity: "Tomato", variety: "Local", grade: "FAQ", arrival_date: "20/03/2025", min_price: 600, max_price: 1100, modal_price: 900 },
  { state: "Andhra Pradesh", district: "Chittor", market: "Palamaner", commodity: "Cluster beans", variety: "Cluster Beans", grade: "FAQ", arrival_date: "20/03/2025", min_price: 2000, max_price: 3000, modal_price: 2500 },
  { state: "Andhra Pradesh", district: "East Godavari", market: "Ravulapelem", commodity: "Banana", variety: "Bhushavali(Pacha)", grade: "Large", arrival_date: "20/03/2025", min_price: 1600, max_price: 2200, modal_price: 1600 },
  { state: "Andhra Pradesh", district: "East Godavari", market: "Ravulapelem", commodity: "Banana", variety: "Chakkarakeli(White)", grade: "Large", arrival_date: "20/03/2025", min_price: 2400, max_price: 3200, modal_price: 2900 },
  { state: "Andhra Pradesh", district: "East Godavari", market: "Ravulapelem", commodity: "Banana", variety: "Desi(Bontha)", grade: "Large", arrival_date: "20/03/2025", min_price: 1500, max_price: 2200, modal_price: 1800 },
  { state: "Andhra Pradesh", district: "East Godavari", market: "Ravulapelem", commodity: "Banana", variety: "Karpura", grade: "Large", arrival_date: "20/03/2025", min_price: 2200, max_price: 3200, modal_price: 3100 },
  { state: "Andhra Pradesh", district: "Guntur", market: "Duggirala", commodity: "Turmeric", variety: "Finger", grade: "FAQ", arrival_date: "20/03/2025", min_price: 9150, max_price: 9950, modal_price: 9950 }
];

// CitySelector Component
const CitySelector = ({ cities, selectedCity, onSelectCity }) => {
  if (!cities || cities.length === 0) {
    return <div className="no-cities">No markets available to select.</div>;
  }

  return (
    <div className="city-selector fade-in">
      <h2>Select a Market</h2>
      <div className="city-grid">
        {cities.map((city, index) => (
          <div
            key={index}
            className={`city-card ${selectedCity === city ? 'selected' : ''}`}
            onClick={() => onSelectCity(city)}
          >
            {city}
          </div>
        ))}
      </div>
    </div>
  );
};

// CommoditySpotlight Component
const CommoditySpotlight = ({ data }) => {
  const randomCommodity = data[Math.floor(Math.random() * data.length)] || {};
  const avgModalPrice = randomCommodity.modal_price || 0;

  return (
    <div className="spotlight fade-in">
      <h3>Commodity of the Day: {randomCommodity.commodity || 'N/A'}</h3>
      <p>Variety: {randomCommodity.variety || 'N/A'}</p>
      <p>Avg Modal Price: {avgModalPrice.toLocaleString()} INR</p>
      <p>Market: {randomCommodity.market || 'N/A'}</p>
    </div>
  );
};

// DataTable Component
const DataTable = ({ data }) => {
  return (
    <div className="table-container slide-in">
      <h2>Commodity Prices</h2>
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>District</th>
            <th>Market</th>
            <th>Commodity</th>
            <th>Variety</th>
            <th>Grade</th>
            <th>Date</th>
            <th>Min Price</th>
            <th>Max Price</th>
            <th>Modal Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.state || 'N/A'}</td>
              <td>{item.district || 'N/A'}</td>
              <td>{item.market || 'N/A'}</td>
              <td>{item.commodity || 'N/A'}</td>
              <td>{item.variety || 'N/A'}</td>
              <td>{item.grade || 'N/A'}</td>
              <td>{item.arrival_date || 'N/A'}</td>
              <td>{item.min_price?.toLocaleString() || '0'}</td>
              <td>{item.max_price?.toLocaleString() || '0'}</td>
              <td>{item.modal_price?.toLocaleString() || '0'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// CropPriceVisualizations Component
const CropPriceVisualizations = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="no-data">Select a city to view crop price visualizations</p>;
  }

  const validData = data.filter(item =>
    item.commodity &&
    item.variety &&
    typeof item.modal_price === 'number' &&
    typeof item.min_price === 'number' &&
    typeof item.max_price === 'number'
  );

  if (validData.length === 0) {
    return <p className="no-data">No valid crop price data available for this city</p>;
  }

  const labels = validData.map(item => `${item.commodity} (${item.variety})`);
  const modalPrices = validData.map(item => item.modal_price);
  const minPrices = validData.map(item => item.min_price);
  const maxPrices = validData.map(item => item.max_price);

  const barData = {
    labels,
    datasets: [
      { label: 'Min Price', data: minPrices, backgroundColor: 'rgba(54, 162, 235, 0.8)', borderColor: '#36A2EB', borderWidth: 1 },
      { label: 'Max Price', data: maxPrices, backgroundColor: 'rgba(255, 99, 132, 0.8)', borderColor: '#FF6384', borderWidth: 1 },
      { label: 'Modal Price', data: modalPrices, backgroundColor: 'rgba(255, 206, 86, 0.8)', borderColor: '#FFCE56', borderWidth: 1 },
    ],
  };

  const lineData = {
    labels,
    datasets: [{
      label: 'Modal Price Trend',
      data: modalPrices,
      borderColor: '#4BC0C0',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.4,
    }],
  };

  const scatterData = {
    datasets: [{
      label: 'Price Range (Min vs Max)',
      data: validData.map(item => ({ x: item.min_price, y: item.max_price })),
      backgroundColor: 'rgba(153, 102, 255, 0.8)',
      borderColor: '#9966FF',
      pointRadius: 8,
    }],
  };

  const pieData = {
    labels,
    datasets: [{
      label: 'Modal Price Distribution',
      data: modalPrices,
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
      ],
      borderColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
      ],
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#fff', font: { size: 14 } } },
      title: { display: true, text: 'Crop Price Visualizations', color: '#fff', font: { size: 20 } },
      datalabels: {
        color: '#fff',
        font: { size: 12, weight: 'bold' },
        formatter: (value, context) => {
          if (context.chart.data.datasets[0].label === 'Price Range (Min vs Max)') {
            return `${value.y}`;
          }
          return value.toLocaleString();
        },
        anchor: 'end',
        align: 'top',
        offset: 4,
      },
    },
    scales: {
      x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
      y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#fff', font: { size: 14 } } },
      title: { display: true, text: 'Modal Price Distribution', color: '#fff', font: { size: 20 } },
      datalabels: {
        color: '#fff',
        font: { size: 12, weight: 'bold' },
        formatter: (value) => value.toLocaleString(),
        anchor: 'center',
        align: 'center',
      },
    },
  };

  return (
    <div className="visualizations fade-in">
      <h2>Crop Price Visualizations</h2>
      <div className="charts-grid">
        <div className="chart-container">
          <h3>Bar Graph (Price Comparison)</h3>
          <div className="chart-wrapper">
            <Bar data={barData} options={options} />
          </div>
        </div>
        <div className="chart-container">
          <h3>Line Graph (Modal Price Trend)</h3>
          <div className="chart-wrapper">
            <Line data={lineData} options={options} />
          </div>
        </div>
        <div className="chart-container">
          <h3>Scatter Graph (Min vs Max Prices)</h3>
          <div className="chart-wrapper">
            <Scatter data={scatterData} options={options} />
          </div>
        </div>
        <div className="chart-container">
          <h3>Pie Chart (Modal Price Distribution)</h3>
          <div className="chart-wrapper">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const DashBoard = () => {
  const [data, setData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd0000018f16d7edddc94f75618b4a2406497d3a&format=json');
        let processedData = [];
        if (response.data && response.data.records && Array.isArray(response.data.records)) {
          processedData = response.data.records;
        } else if (response.data && Array.isArray(response.data)) {
          processedData = response.data;
        } else if (response.data) {
          for (const key in response.data) {
            if (Array.isArray(response.data[key]) && response.data[key].length > 0) {
              processedData = response.data[key];
              break;
            }
          }
        }

        if (processedData.length === 0) {
          processedData = staticData;
        }

        processedData = processedData.map(item => ({
          ...item,
          min_price: Number(item.min_price || 0),
          max_price: Number(item.max_price || 0),
          modal_price: Number(item.modal_price || 0)
        }));

        setData(processedData);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Using fallback data.');
        const processedStaticData = staticData.map(item => ({
          ...item,
          min_price: Number(item.min_price || 0),
          max_price: Number(item.max_price || 0),
          modal_price: Number(item.modal_price || 0)
        }));
        setData(processedStaticData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = selectedCity ? data.filter(item => item.market === selectedCity) : data;
  const markets = [...new Set(data.map(item => item.market))].filter(Boolean);

  let cheapestCrop = {};
  let costliestCrop = {};
  if (data.length > 0) {
    try {
      cheapestCrop = data.reduce((min, current) => {
        if (isNaN(current.modal_price) || current.modal_price === 0) return min;
        if (isNaN(min.modal_price) || current.modal_price < min.modal_price) return current;
        return min;
      }, { modal_price: Infinity });

      costliestCrop = data.reduce((max, current) => {
        if (isNaN(current.modal_price) || current.modal_price === 0) return max;
        if (isNaN(max.modal_price) || current.modal_price > max.modal_price) return current;
        return max;
      }, { modal_price: 0 });
    } catch (e) {
      console.error('Error calculating min/max prices:', e);
    }
  }
  if (cheapestCrop.modal_price === Infinity) cheapestCrop = {};
  if (costliestCrop.modal_price === 0 && data.length > 0) costliestCrop = {};

  return (
    <div className="app">
      <h1 className="fade-in">Mandi Price Dashboard</h1>
      {isLoading ? (
        <div className="loading">Loading data...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="price-highlights fade-in">
            <ErrorBoundary fallback={<div className="highlight">Error displaying cheapest crop</div>}>
              <div className="highlight">
                <h3>Cheapest Crop</h3>
                {cheapestCrop.commodity ? (
                  <>
                    <p>{cheapestCrop.commodity} ({cheapestCrop.variety || 'N/A'})</p>
                    <p>Modal Price: {cheapestCrop.modal_price?.toLocaleString()} INR</p>
                    <p>Market: {cheapestCrop.market || 'N/A'}</p>
                  </>
                ) : (
                  <p>No data available</p>
                )}
              </div>
            </ErrorBoundary>
            <ErrorBoundary fallback={<div className="highlight">Error displaying costliest crop</div>}>
              <div className="highlight">
                <h3>Costliest Crop</h3>
                {costliestCrop.commodity ? (
                  <>
                    <p>{costliestCrop.commodity} ({costliestCrop.variety || 'N/A'})</p>
                    <p>Modal Price: {costliestCrop.modal_price?.toLocaleString()} INR</p>
                    <p>Market: {costliestCrop.market || 'N/A'}</p>
                  </>
                ) : (
                  <p>No data available</p>
                )}
              </div>
            </ErrorBoundary>
          </div>
          <ErrorBoundary>
            <CommoditySpotlight data={data} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CitySelector onSelectCity={setSelectedCity} cities={markets} selectedCity={selectedCity} />
          </ErrorBoundary>
          {filteredData.length > 0 ? (
            <>
              <ErrorBoundary>
                <CropPriceVisualizations data={filteredData} />
              </ErrorBoundary>
              <ErrorBoundary>
                <DataTable data={filteredData} />
              </ErrorBoundary>
            </>
          ) : (
            <div className="no-data">No data available for the selected criteria.</div>
          )}
        </>
      )}
    </div>
  );
};

export default DashBoard;