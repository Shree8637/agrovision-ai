import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSeedling, FaUser, FaEnvelope, FaLock, FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { registerUser } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import './Register.css'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(true) // Default to showing password (visible)
  const [showConfirmPassword, setShowConfirmPassword] = useState(true) // Default to showing confirm password (visible)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      const { user, error: registerError } = await registerUser(formData.email, formData.password)
      
      if (registerError) {
        setError(registerError)
      } else if (user) {
        await setDoc(doc(db, "users", user.uid), {
          name: formData.name,
          email: formData.email,
          createdAt: new Date().toISOString(),
          role: 'user'
        })
        navigate('/login')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword) // Toggle to hide (false) or show (true) password
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword) // Toggle to hide (false) or show (true) confirm password
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center mb-3">
          <div className="logo-container">
            <FaSeedling className="logo-icon" />
          </div>
          <h1 className="logo-text">Agrovision</h1>
        </div>
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join Agrovision and grow with technology</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <div className="input-group">
              <div className="input-icon">
                <FaUser />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-group">
              <div className="input-icon">
                <FaEnvelope />
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group password-input-group">
              <div className="input-icon">
                <FaLock />
              </div>
              <input
                type={showPassword ? 'text' : 'password'} // Default to 'text' (visible), toggle to 'password' (hidden)
                id="password"
                name="password"
                className="form-control"
                placeholder="Create a password"
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
                {showPassword ? <FaEye /> : <FaEyeSlash />} {/* Show FaEye when visible, FaEyeSlash when hidden */}
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <div className="input-group password-input-group">
              <div className="input-icon">
                <FaCheckCircle />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'} // Default to 'text' (visible), toggle to 'password' (hidden)
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
              <button 
                type="button" 
                className="password-toggle-btn" 
                onClick={toggleConfirmPasswordVisibility}
                disabled={loading}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />} {/* Show FaEye when visible, FaEyeSlash when hidden */}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="auth-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="text-center mt-3">
          Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default Register