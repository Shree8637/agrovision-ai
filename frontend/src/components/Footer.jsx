import { FaSeedling, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaPhone, FaLeaf } from 'react-icons/fa'
import './css/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <FaSeedling className="footer-logo-icon" />
              <h3>AgroVision</h3>
              <p>Empowering farmers with technology</p>
              <div className="footer-social">
                <a href="#" className="social-link"><FaFacebook /></a>
                <a href="#" className="social-link"><FaTwitter /></a>
                <a href="#" className="social-link"><FaInstagram /></a>
                <a href="#" className="social-link"><FaLinkedin /></a>
              </div>
            </div>
            
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/help">Help</a></li>
              </ul>
            </div>
            
            <div className="footer-links-service">
              <h4>Services</h4>
              <ul>
                <li><a href="/services/weather">Weather Forecast</a></li>
                <li><a href="/services/crop-price-prediction">Crop Price Prediction</a></li>
                <li><a href="/services/crop-analysis">Crop Analysis</a></li>
                <li><a href="/services/irrigation-information">Irrigation Information</a></li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <p>123 Farm Road, Agri Vally</p>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <p>info@agrigrain.com</p>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <p>+1 234 567 8901</p>
              </div>
            </div>
          </div>
        </div>
      </div>
            
    </footer>
  )
}

export default Footer