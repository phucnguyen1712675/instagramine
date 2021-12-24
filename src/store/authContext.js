import {createContext, useReducer} from 'react';
import PropTypes from 'prop-types';
import {
  AuthErrorCodes,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {setDoc, doc, getDoc} from 'firebase/firestore';
import {useLocalStorage, useMounted} from '../hooks';
import {auth, db} from '../firebase-config';
import {requestReducer} from '../reducers';
import {SET_IS_LOADING, ON_ERROR} from '../actions/requestActions';

const AuthContext = createContext({
  isLoading: false,
  error: null,
  user: null,
  // eslint-disable-next-line no-unused-vars
  logIn: async (user) => {},
  // eslint-disable-next-line no-unused-vars
  register: async (user) => {},
  // eslint-disable-next-line no-unused-vars
  logOut: async () => {},
});

const findLoginError = (code) => {
  switch (code) {
    case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
      return 'Too many attempts. Try again later.';
    case AuthErrorCodes.USER_DELETED:
    case AuthErrorCodes.INVALID_EMAIL:
    case AuthErrorCodes.INVALID_PASSWORD:
      return 'Invalid email or password';
    default:
      return 'Something went wrong';
  }
};

const findRegisterError = (error) => {
  switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      return 'Email already in-use';
    default:
      return 'Something went wrong';
  }
};

const findLogOutError = (error) => {
  switch (error.code) {
    case AuthErrorCodes.USER_SIGNED_OUT:
      return 'User has signed out';
    default:
      return 'Something went wrong';
  }
};

const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(requestReducer, {
    isLoading: false,
    error: null,
  });

  const [user, setUser] = useLocalStorage({
    key: 'user',
    initialValue: null,
  });

  const mounted = useMounted();

  onAuthStateChanged(auth, (currentUser) => {
    // User logged out
    if (!currentUser) {
      setUser(null);
    }
  });

  const logIn = async (newUser) => {
    try {
      dispatch({type: SET_IS_LOADING, payload: true});

      const {user} = await signInWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      const newUserDocRef = doc(db, 'users', user.uid);

      const newUserDocSnap = await getDoc(newUserDocRef);

      if (!newUserDocSnap.exists()) {
        dispatch({type: ON_ERROR, payload: 'User not found'});

        return false;
      }

      const newUserData = newUserDocSnap.data();

      if (mounted.current) {
        dispatch({type: SET_IS_LOADING, payload: false});

        setUser({
          ...newUserData,
          uid: user.uid,
        });
      }

      return true;
    } catch (error) {
      const errorMessage = findLoginError(error.code);

      dispatch({type: ON_ERROR, payload: errorMessage});

      return false;
    }
  };

  const register = async (newUser) => {
    try {
      dispatch({type: SET_IS_LOADING, payload: true});

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

      if (mounted.current) {
        dispatch({type: SET_IS_LOADING, payload: false});

        setUser({
          ...newUserData,
          uid: user.uid,
        });
      }

      return true;
    } catch (error) {
      const errorMessage = findRegisterError(error.code);

      dispatch({type: ON_ERROR, payload: errorMessage});

      return false;
    }
  };

  const logOut = async () => {
    try {
      dispatch({type: SET_IS_LOADING, payload: true});

      await signOut(auth);

      if (mounted.current) {
        dispatch({type: SET_IS_LOADING, payload: false});
      }

      return true;
    } catch (error) {
      const errorMessage = findLogOutError(error.code);

      dispatch({type: ON_ERROR, payload: errorMessage});

      return false;
    }
  };

  const value = {
    ...state,
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

export {AuthContext, AuthContextProvider};
