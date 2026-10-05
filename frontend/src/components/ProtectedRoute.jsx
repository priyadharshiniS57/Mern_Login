import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * Checks if a JWT token exists in localStorage.
 * If yes -> renders the child component (e.g. Dashboard)
 * If no  -> redirects the user to the /login page
 */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
