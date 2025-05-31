import { FaLeaf, FaChartLine, FaCloudSun, FaHandshake, FaTractor, FaWater } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './Services.css';

const Services = () => {
  return (
    <main>
      {/* Hero Section with unique class */}
      <section className="hero services-hero">
        <div className="container">
          <h1 className="hero-title">Our Services</h1>
          <p className="hero-subtitle">
            Comprehensive agricultural technology solutions to optimize your farming operations
          </p>
        </div>
      </section>

      {/* Rest of the sections remain unchanged */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">How We Help Farmers</h2>
          <p className="section-subtitle">
            Our integrated suite of services addresses every aspect of modern farming
          </p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-content">
                <div className="service-body">
                  <h1 className="service-title">Weather Forecasting</h1>
                  <p className="service-text">
                    Accurate weather forecasting and analysis to optimize farming decisions and protect crops from extreme conditions.
                  </p>
                  <ul className="service-list">
                    <li>Real-time weather monitoring</li>
                    <li>Temperature and humidity tracking</li>
                    <li>Precipitation and wind analysis</li>
                    <li>Customized climate adaptation strategies</li>
                  </ul>
                  <Link to="/services/weather" className="btn btn-primary">Learn More</Link>
                </div>
                <div className="service-img-wrapper">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.wallpapersafari.com%2F61%2F31%2FMo8nwL.jpg&f=1&nofb=1&ipt=6a3ad470bf3e729c37ce4457a52dcea9adfdf5fa9d9cc9c93a30bb4d3cd9b6eb&ipo=images"
                    alt="Weather Forecasting"
                    className="service-img"
                  />
                </div>
              </div>
            </div>
            <div className="service-card">
              <div className="service-content">
                <div className="service-body">
                  <h3 className="service-title">Crop Monitoring & Disease Detection</h3>
                  <p className="service-text">
                    Advanced sensors and AI-powered analytics to monitor crop health and detect issues early.
                  </p>
                  <ul className="service-list">
                    <li>Real-time crop health monitoring</li>
                    <li>Early disease detection</li>
                    <li>Pest infestation alerts</li>
                    <li>Growth stage tracking</li>
                  </ul>
                  <Link to="/services/crop-analysis" className="btn btn-primary">Learn More</Link>
                </div>
                <div className="service-img-wrapper">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/031/696/054/small_2x/sprawling-agricultural-farm-featuring-fields-of-crops-ai-generated-photo.jpg"
                    alt="Crop Monitoring"
                    className="service-img"
                  />
                </div>
              </div>
            </div>
            <div className="service-card">
              <div className="service-content">
                <div className="service-body">
                  <h3 className="service-title">Smart Irrigation Management</h3>
                  <p className="service-text">
                    Optimize water usage with precision irrigation systems based on real-time data.
                  </p>
                  <ul className="service-list">
                    <li>Soil moisture monitoring</li>
                    <li>Weather-based irrigation scheduling</li>
                    <li>Water usage optimization</li>
                    <li>Drought stress prevention</li>
                  </ul>
                  <Link to="/services/irrigation" className="btn btn-primary">Learn More</Link>
                </div>
                <div className="service-img-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1584479898061-15742e14f50d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                    alt="Irrigation Management"
                    className="service-img"
                  />
                </div>
              </div>
            </div>
            <div className="service-card">
              <div className="service-content">
                <div className="service-body">
                  <h3 className="service-title">Crop Price Prediction</h3>
                  <p className="service-text">
                    Hyperlocal weather predictions specifically designed for agricultural planning.
                  </p>
                  <ul className="service-list">
                    <li>7-day detailed forecasts</li>
                    <li>Frost and heat warnings</li>
                    <li>Rainfall predictions</li>
                    <li>Seasonal outlook reports</li>
                  </ul>
                  <Link to="/services/crop-price-prediction" className="btn btn-primary">Learn More</Link>
                </div>
                <div className="service-img-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1620200423727-8127f75d7f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                    alt="Crop Price Prediction"
                    className="service-img"
                  />
                </div>
              </div>
            </div>
            <div className="service-card">
              <div className="service-content">
                <div className="service-body">
                  <h3 className="service-title">Market Intelligence</h3>
                  <p className="service-text">
                    Stay informed about market trends, pricing, and demand forecasts for your crops.
                  </p>
                  <ul className="service-list">
                    <li>Price trend analysis</li>
                    <li>Demand forecasting</li>
                    <li>Market opportunity alerts</li>
                    <li>Supply chain optimization</li>
                  </ul>
                  <Link to="/services/dashboard" className="btn btn-primary">Learn More</Link>
                </div>
                <div className="service-img-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                    alt="Market Intelligence"
                    className="service-img"
                  />
                </div>
              </div>
            </div>
            {/* <div className="service-card">
              <div className="service-content">
                <div className="service-body">
                  <h3 className="service-title">Farm Management Software</h3>
                  <p className="service-text">
                    Comprehensive software to manage all aspects of your farm operations in one place.
                  </p>
                  <ul className="service-list">
                    <li>Inventory management</li>
                    <li>Equipment tracking</li>
                    <li>Labor scheduling</li>
                    <li>FinancialA reporting</li>
                  </ul>
                  <Link to="#" className="btn btn-primary">Learn More</Link>
                </div>
                <div className="service-img-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                    alt="Farm Management"
                    className="service-img"
                  />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="section features">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Our simple process to get you started with AgriTech services
          </p>
          <div className="how-it-works-grid">
            <div className="how-it-works-item">
              <div className="step-number">1</div>
              <h3 className="step-title">Consultation</h3>
              <p className="step-text">
                We begin with a thorough assessment of your farm, understanding your specific needs, 
                challenges, and goals.
              </p>
            </div>
            <div className="how-it-works-item">
              <div className="step-number">2</div>
              <h3 className="step-title">Customized Solution</h3>
              <p className="step-text">
                Our experts design a tailored package of services and technologies specifically for 
                your farm's unique requirements.
              </p>
            </div>
            <div className="how-it-works-item">
              <div className="step-number">3</div>
              <h3 className="step-title">Implementation</h3>
              <p className="step-text">
                We handle the setup and installation of all necessary equipment and software, 
                ensuring everything works seamlessly.
              </p>
            </div>
            <div className="how-it-works-item">
              <div className="step-number">4</div>
              <h3 className="step-title">Training & Support</h3>
              <p className="step-text">
                Our team provides comprehensive training and ongoing support to help you 
                maximize the benefits of our solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;