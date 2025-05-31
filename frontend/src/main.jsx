import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Chart as ChartJS, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register ChartJS components and the datalabels plugin
ChartJS.register(BarElement, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement, Filler, ChartDataLabels);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)