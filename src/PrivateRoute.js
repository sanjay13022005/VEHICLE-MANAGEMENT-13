import React from 'react';
import { Navigate } from 'react-router-dom';
import { ADMIN_EMAILS } from './utils/constants';

const PrivateRoute = ({ children, requireAdmin }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userEmail = localStorage.getItem('email');
  const isAdmin = ADMIN_EMAILS.includes(userEmail);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
