import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // UI state for messages and loading
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Destructure values
  const { name, email, password } = formData;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear errors when user types
    if (error) setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 1. Basic client-side validation
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      // 2. Send POST request to backend API
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      // 3. Handle response errors from backend
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      // 4. Save token and user info into localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setSuccess('Account created successfully! Redirecting...');

      // 5. Redirect to Dashboard after brief moment
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please check if backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join us today to get started with MERN Auth</p>
        </div>

        {/* Display Error Message */}
        {error && (
          <div className="alert alert-error" role="alert">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Display Success Message */}
        {success && (
          <div className="alert alert-success" role="alert">
            <span>✅</span>
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Priyadharshini"
              value={name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g. name@example.com"
              value={email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={handleChange}
              className="form-input"
              required
            />
            <span className="helper-text">Must be at least 6 characters long</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary"
            id="register-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span>Creating account...</span>
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
