import React from 'react';
import PropTypes from 'prop-types';
import {useLocation, Navigate} from 'react-router-dom';
import {ROUTE_PATHS} from '../constants';
import {useAuth} from '../hooks';

const RequireAuth = ({children}) => {
  const auth = useAuth();

  const location = useLocation();

  if (!auth.isAuth) {
    return <Navigate to={`/${ROUTE_PATHS.LOGIN}`} state={{from: location}} />;
  }

  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
