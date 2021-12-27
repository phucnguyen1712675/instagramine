import React from 'react';
import {useLocation, Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../hooks';

const ProtectedRoute = () => {
  const auth = useAuth();

  const location = useLocation();

  if (auth.currentUser) {
    return <Navigate to="/" state={{from: location}} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
