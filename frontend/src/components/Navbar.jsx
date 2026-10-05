import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    // Remove authentication data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to={token ? "/dashboard" : "/login"} className="nav-brand">
        <span>🔐 MERN Auth</span>
        <span className="brand-badge">JWT</span>
      </Link>

      <div className="nav-links">
        {token ? (
          <>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            {user && (
              <span className="user-tag">
                👤 {user.name}
              </span>
            )}
            <button onClick={handleLogout} className="logout-nav-btn" id="navbar-logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
