import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('username'); // Vérifie si l'utilisateur est authentifié

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
