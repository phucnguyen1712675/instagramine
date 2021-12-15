import React from 'react';
import PropTypes from 'prop-types';
import {useLocation, Navigate} from 'react-router-dom';
import {PATHS} from '../constants';
import {useAuth} from '../hooks/useAuth';

const RequireAuth = ({children}) => {
  const auth = useAuth();

  const location = useLocation();

  const {LOGIN} = PATHS;

  if (!auth.user) {
    return <Navigate to={`/${LOGIN}`} state={{from: location}} />;
  }

  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;