import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSeedling, FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { loginUser } from '../firebase';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Default to showing password (visible)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const { user, error: loginError } = await loginUser(formData.email, formData.password);
      
      if (loginError) {
        // Check for invalid credential error and customize message
        if (loginError.includes('auth/invalid-credential')) {
          setError('User not registered, please sign up');
        } else {
          setError(loginError);
        }
      } else if (user) {
        navigate('/');
      }
    } catch (err) {
      // Fallback for unexpected errors
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle to hide (false) or show (true) password
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center mb-3">
          <div className="logo-container">
            <FaSeedling className="logo-icon" />
          </div>
          <h1 className="logo-text">Agrovision</h1>
        </div>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to access your Agrovision account</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-group">
              <div className="input-icon">
                <FaUser />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="form-group">
            <div className="password-label-wrapper">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Link to="#" className="forgot-password">
                Forgot Password?
              </Link>
            </div>
            <div className="input-group password-input-group">
              <div className="input-icon">
                <FaLock />
              </div>
              <input
                type={showPassword ? 'text' : 'password'} // Default to 'text' (visible), toggle to 'password' (hidden)
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              <button 
                type="button" 
                className="password-toggle-btn" 
                onClick={togglePasswordVisibility}
                disabled={loading}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />} {/* Swap icons: show FaEye when visible, FaEyeSlash when hidden */}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="auth-btn"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <p className="text-center mt-3">
        <Link to="/register" className="auth-link">Don't have an account? Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;