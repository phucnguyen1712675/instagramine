import {createContext} from 'react';
import PropTypes from 'prop-types';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {setDoc, doc, getDoc} from 'firebase/firestore';
import {auth, db} from '../firebase-config';
import {useLocalStorage} from '../hooks/useLocalStorage';

const AuthContext = createContext({
  user: null,
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
    initialValue: null,
  });

  onAuthStateChanged(auth, (currentUser) => {
    // User logged out
    if (!currentUser) {
      setUser(null);
    }
  });

  const logIn = async (newUser) => {
    try {
      const {user} = await signInWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      const newUserDocRef = doc(db, 'users', user.uid);

      const newUserDocSnap = await getDoc(newUserDocRef);

      if (!newUserDocSnap.exists()) {
        return {
          error: 'User not found',
          hasError: true,
        };
      }

      const newUserData = newUserDocSnap.data();

      setUser({
        ...newUserData,
        uid: user.uid,
      });

      return {
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
      const {user} = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      const newUserData = {
        email: newUser.email,
        name: newUser.name,
        username: newUser.username,
      };

      await setDoc(doc(db, 'users', user.uid), newUserData);

      setUser({
        ...newUserData,
        uid: user.uid,
      });

      return {
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
      await signOut(auth);

      return {
        hasError: false,
      };
    } catch (error) {
      return {
        error,
        hasError: true,
      };
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
