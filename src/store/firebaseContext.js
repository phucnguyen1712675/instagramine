import {createContext} from 'react';
import PropTypes from 'prop-types';
import {auth, db} from '../firebase-config';

const FirebaseContext = createContext({
  auth: null,
  db: null,
});

const FirebaseContextProvider = ({children}) => {
  const value = {
    auth,
    db,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {FirebaseContext, FirebaseContextProvider};
