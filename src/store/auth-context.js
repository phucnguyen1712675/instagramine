import {createContext} from 'react';
import PropTypes from 'prop-types';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {auth} from '../firebase-config';
import {useLocalStorage} from '../hooks/useLocalStorage';

const AuthContext = createContext({
  user: {},
  // eslint-disable-next-line no-unused-vars
  logIn: async (user) => {},
  // eslint-disable-next-line no-unused-vars
  register: async (user) => {},
  // eslint-disable-next-line no-unused-vars
  logOut: async () => {},
});

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useLocalStorage({
    key: 'user',
    initialValue: {},
  });

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logIn = async (user) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      return {
        userCredential,
        hasError: false,
      };
    } catch (error) {
      return {
        error,
        hasError: true,
      };
    }
  };

  const register = async (newUser) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );
      return {
        userCredential,
        hasError: false,
      };
    } catch (error) {
      return {
        error,
        hasError: true,
      };
    }
  };

  const logOut = async () => {
    try {
      return signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  const value = {
    user,
    logIn,
    register,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
