import {createContext, useReducer, useEffect} from 'react';
import PropTypes from 'prop-types';
import {onAuthStateChanged} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import {useLocalStorage, useMounted, useFirebase} from '../hooks';
import {authContextReducer} from '../reducers';
import {
  SET_IS_LOADING,
  SET_AUTH_USER_AFTER_FETCHING,
} from '../actions/authContextActions';
import {getDocData} from '../utils/firestore';

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

  const firebase = useFirebase();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, async (user) => {
      try {
        if (user) {
          // User is signed in
          const uid = user.uid;
          const userSnap = await getDoc(doc(firebase.db, `users/${uid}`));

          if (userSnap.exists()) {
            const userData = getDocData(userSnap);

            if (mounted.current) {
              dispatch({type: SET_AUTH_USER_AFTER_FETCHING, payload: userData});
            }
          } else {
            dispatch({type: SET_IS_LOADING, payload: false});
          }
        } else {
          // User is signed out
          dispatch({type: SET_AUTH_USER_AFTER_FETCHING, payload: null});
        }
      } catch (error) {
        alert(error);
      }
    });

    return () => unsubscribe();
  }, [firebase.auth, firebase.db, mounted]);

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
