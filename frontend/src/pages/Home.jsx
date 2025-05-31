import { FaLeaf, FaChartLine, FaCloudSun, FaHandshake, FaSeedling, FaTractor } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './Home.css';

const Home = ({ user }) => {
  return (
    <main>
      {/* Hero Section with unique class */}
      <section className="hero home-hero">
        <div className="container hero-content">
          <h1 className="hero-title">Growing Better Crops with Technology</h1>
          <p className="hero-subtitle">
            AgroVison helps farmers optimize their yields, reduce costs, and make data-driven decisions
            for sustainable agriculture in a changing world.
          </p>
        </div>
      </section>

      {/* Rest of the sections remain unchanged */}
      <section className="section features">
        <div className="container">
          <h2 className="section-title">Why Choose Agrovision</h2>
          <p className="section-subtitle">
            We combine agricultural expertise with cutting-edge technology to help farmers thrive in today's challenging environment
          </p>
          <div className="grid">
            <div className="card">
              <div className="card-body text-center">
                <FaLeaf className="feature-icon" />
                <h3 className="card-title">Sustainable Farming</h3>
                <p className="card-text">
                  Our solutions promote environmentally friendly practices that preserve soil health
                  and biodiversity while maximizing yields for generations to come.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body text-center">
                <FaChartLine className="feature-icon" />
                <h3 className="card-title">Data-Driven Insights</h3>
                <p className="card-text">
                  Make informed decisions with our advanced analytics that track crop performance,
                  soil conditions, and market trends in real-time.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body text-center">
                <FaCloudSun className="feature-icon" />
                <h3 className="card-title">Weather Forecasting</h3>
                <p className="card-text">
                  Stay ahead of changing weather patterns with our precise forecasting tools
                  designed specifically for agricultural needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Solutions</h2>
          <p className="section-subtitle">
            Explore our most popular agricultural technologies that are transforming farms worldwide
          </p>
          <div className="grid">
            <div className="card">
              <div className="card-img-wrapper">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxOEtYJKIHRzUMminiMizeC0adgIxOQGy3Ug&s" 
                  alt="Soil Analysis Kit" 
                  className="card-img"
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">Weather Forecast</h3>
                <p className="card-text">
                  Advanced weather forecasting system that provides real-time data on temperature, humidity, and precipitation to optimize irrigation schedules and protect crops.
                </p>
                <Link to="/services" className="btn btn-primary">Learn More</Link>
              </div>
            </div>
            <div className="card">
              <div className="card-img-wrapper">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrgLdIX3sksmnBm2xy7YpOP29kok0DdOrzaw&s" 
                  alt="Crop Monitoring System" 
                  className="card-img"
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">Smart Crop Monitoring</h3>
                <p className="card-text">
                  Advanced sensors and AI-powered software that monitor crop health, detect diseases early,
                  and provide actionable insights to protect your investment.
                </p>
                <Link to="/services" className="btn btn-primary">Learn More</Link>
              </div>
            </div>
            <div className="card">
              <div className="card-img-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1584479898061-15742e14f50d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                  alt="Irrigation Management" 
                  className="card-img"
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">Precision Irrigation</h3>
                <p className="card-text">
                  Smart irrigation systems that optimize water usage based on soil moisture,
                  weather forecasts, and crop requirements, saving up to 30% water.
                </p>
                <Link to="/services" className="btn btn-primary">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section farm-stats">
        <div className="container">
          <h2 className="section-title">The Impact of Agrovision</h2>
          <p className="section-subtitle">
            See how our technology is transforming agriculture across the country
          </p>
          <div className="farm-stats-grid">
            <div className="farm-stats-card">
              <FaSeedling className="farm-stats-icon" />
              <h3 className="farm-stats-number">5,000+</h3>
              <p className="farm-stats-text">Farmers Using Our Technology</p>
            </div>
            <div className="farm-stats-card">
              <FaTractor className="farm-stats-icon" />
              <h3 className="farm-stats-number">1.2M</h3>
              <p className="farm-stats-text">Acres Under Management</p>
            </div>
            <div className="farm-stats-card">
              <FaChartLine className="farm-stats-icon" />
              <h3 className="farm-stats-number">30%</h3>
              <p className="farm-stats-text">Average Yield Increase</p>
            </div>
            <div className="farm-stats-card">
              <FaCloudSun className="farm-stats-icon" />
              <h3 className="farm-stats-number">25%</h3>
              <p className="farm-stats-text">Water Usage Reduction</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <h2 className="section-title">Ready to Transform Your Farm?</h2>
          <p className="section-subtitle">
            Join thousands of farmers who are already benefiting from our agricultural technology solutions
          </p>
          <div className="cta-btn-wrapper">
            <Link to="/services" className="btn cta-btn">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;