import {useReducer, createContext} from 'react';
import PropTypes from 'prop-types';
import AppReducer from '../reducers/app-reducer';
import globalData from '../data/global.json';

const GlobalContext = createContext({});

export const GlobalContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, globalData);

  const signIn = (username, password) =>
    dispatch({type: 'SIGN_IN', payload: {username, password}});

  const context = {
    currentUser: state.currentUser,
    signIn,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default GlobalContext;
