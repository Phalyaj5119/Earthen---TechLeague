// src/components/routes/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isAdmin = true; // Replace with actual auth logic
  return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
