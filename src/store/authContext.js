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
import {useMounted} from '../hooks';
import {auth, db} from '../firebase-config';
import {authContextReducer} from '../reducers';
import {
  SET_IS_LOADING,
  ON_SUCCESS,
  ON_ERROR,
  SET_CURRENT_USER,
  SIGN_OUT,
} from '../actions/authContextActions';
import {getDocData} from '../utils/firestore';

const AuthContext = createContext({
  currentUser: null,
  isLoading: false,
  error: null,
  getCurrentUser: () => {},
  // eslint-disable-next-line no-unused-vars
  logIn: async (user) => false,
  // eslint-disable-next-line no-unused-vars
  register: async (user) => false,
  // eslint-disable-next-line no-unused-vars
  logOut: async () => false,
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
  const [state, dispatch] = useReducer(authContextReducer, {
    currentUser: null,
    isLoading: false,
    error: null,
  });

  const mounted = useMounted();

  onAuthStateChanged(auth, async (user) => {
    try {
      if (user) {
        // User is signed in
        const uid = user.uid;
        const userSnap = await getDoc(doc(db, `users/${uid}`));
        const userData = getDocData(userSnap);

        if (!userData && mounted.current) {
          dispatch({type: ON_ERROR, payload: 'User not found'});
        } else {
          dispatch({type: SET_CURRENT_USER, payload: userData});
        }
      } else {
        // User is signed out
        dispatch({type: SIGN_OUT});
      }
    } catch (error) {
      dispatch({type: ON_ERROR, payload: 'Something went wrong'});
    }
  });

  const getCurrentUser = () => {
    const user = auth.currentUser;
    return user;
  };

  const logIn = async (newUser) => {
    try {
      dispatch({type: SET_IS_LOADING, payload: true});

      const userCredential = await signInWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      if (mounted.current) {
        dispatch({type: ON_SUCCESS});
      }

      return !!userCredential;
    } catch (error) {
      const errorMessage = findLoginError(error.code);

      if (mounted.current) {
        dispatch({type: ON_ERROR, payload: errorMessage});
      }

      return false;
    }
  };

  const register = async (newUser) => {
    try {
      dispatch({type: SET_IS_LOADING, payload: true});

      const {email, password, username, name} = newUser;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Signed in
      const {user} = userCredential;

      const newUserData = {
        email,
        name,
        username,
        // Fake data
        avatar:
          'https://user-images.githubusercontent.com/47315479/81145216-7fbd8700-8f7e-11ea-9d49-bd5fb4a888f1.png',
        profile: 'https://www.instagram.com/phuc7320/',
        job: 'Wildlife Photographer',
        numberOfPosts: 98,
        numberOfFollowers: 3500,
        numberOfFollowingUsers: 900,
        bio: 'My specialty lies in creating colorful creations, amazing designs, and high-quality website artworks that have the potential to capture the attention while making a very positive first impression on the visitor visitor visitor visitor visitor',
        hasStory: false,
        socialLinks: ['https://dribbble.com/nkchaudhary01'],
      };

      await setDoc(doc(db, `users/${user.uid}`), newUserData);

      if (mounted.current) {
        dispatch({type: ON_SUCCESS});
      }

      return !!userCredential;
    } catch (error) {
      const errorMessage = findRegisterError(error.code);

      if (mounted.current) {
        dispatch({type: ON_ERROR, payload: errorMessage});
      }

      return false;
    }
  };

  const logOut = async () => {
    try {
      dispatch({type: SET_IS_LOADING, payload: true});

      await signOut(auth);

      if (mounted.current) {
        dispatch({type: ON_SUCCESS});
      }

      return true;
    } catch (error) {
      const errorMessage = findLogOutError(error.code);

      if (mounted.current) {
        dispatch({type: ON_ERROR, payload: errorMessage});
      }

      return false;
    }
  };

  const value = {
    ...state,
    getCurrentUser,
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
