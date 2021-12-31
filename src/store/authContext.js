import {createContext, useReducer, useEffect} from 'react';
import PropTypes from 'prop-types';
import {onAuthStateChanged} from 'firebase/auth';
import {useLocalStorage, useMounted} from '../hooks';
import {authContextReducer} from '../reducers';
import {auth} from '../firebase-config';
import {getUserDoc} from '../services/firestore';
import {
  SET_IS_LOADING,
  SET_AUTH_USER_AFTER_FETCHING,
} from '../actions/authContextActions';

const initialState = {
  isLoading: true,
  authUser: null,
};

const AuthContext = createContext({
  ...initialState,
  isAuth: false,
  setAuthStatus: () => {},
  setIsLoading: () => {},
});

const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(authContextReducer, initialState);

  const [isAuth, setIsAuth] = useLocalStorage({
    key: 'isAuth',
    initialValue: false,
  });

  const mounted = useMounted();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        const userData = await getUserDoc(uid);

        if (mounted.current) {
          if (userData) {
            dispatch({type: SET_AUTH_USER_AFTER_FETCHING, payload: userData});
          } else {
            dispatch({type: SET_IS_LOADING, payload: false});
          }
        }
      } else {
        // User is signed out
        dispatch({type: SET_AUTH_USER_AFTER_FETCHING, payload: null});
      }
    });

    return () => unsubscribe();
  }, [mounted]);

  const setAuthStatus = (status) => setIsAuth(status);

  const setIsLoading = (isLoading) =>
    dispatch({type: SET_IS_LOADING, payload: isLoading});

  const value = {
    ...state,
    isAuth,
    setAuthStatus,
    setIsLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {AuthContext, AuthContextProvider};
