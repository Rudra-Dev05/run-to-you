import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// This is a wrapper component to protect routes that require authentication
function AuthWrapper({ children }) {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth || {});
  
  // For development purposes, hardcode authentication to true
  // In production, we would check if user exists in Redux state
  const isAuthenticated = true; // Temporary hardcoded value for development
  
  // If not authenticated, redirect to login with a return path
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If authenticated, render the children components
  return <>{children}</>;
}

export default AuthWrapper; 