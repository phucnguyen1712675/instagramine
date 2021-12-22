import {createContext} from 'react';
import PropTypes from 'prop-types';
import {fakeAuthProvider} from '../auth';
import {useLocalStorage} from '../hooks/useLocalStorage';

const AuthContext = createContext({
  user: {},
  // eslint-disable-next-line no-unused-vars
  signIn: (user, callback) => {},
  // eslint-disable-next-line no-unused-vars
  signUp: (user, callback) => {},
  // eslint-disable-next-line no-unused-vars
  signOut: (callback) => {},
});

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useLocalStorage({
    key: 'user',
    initialValue: null,
  });

  const signIn = (newUser, callback) => {
    return fakeAuthProvider.signIn(() => {
      setUser(newUser);
      callback();
    });
  };

  const signUp = (newUser, callback) => {
    return fakeAuthProvider.signUp(() => {
      setUser(newUser);
      callback();
    });
  };

  const signOut = (callback) => {
    return fakeAuthProvider.signOut(() => {
      setUser(null);
      callback();
    });
  };

  const value = {
    user,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
