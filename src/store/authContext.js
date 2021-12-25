import {createContext, useReducer} from 'react';
import PropTypes from 'prop-types';
import {
  AuthErrorCodes,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  setDoc,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
import {useLocalStorage, useMounted} from '../hooks';
import {auth, db} from '../firebase-config';
import {requestReducer} from '../reducers';
import {MAX_STORIES_NUMBER} from '../constants';
import {SET_IS_LOADING, ON_SUCCESS, ON_ERROR} from '../actions/requestActions';
import {getCollectionData} from '../utils/firestore';

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

      const newUserDocSnap = await getDoc(doc(db, 'users', user.uid));

      if (!newUserDocSnap.exists()) {
        if (mounted.current) {
          dispatch({type: ON_ERROR, payload: 'User not found'});
        }

        return false;
      }

      const newUserData = newUserDocSnap.data();

      const userStoryCateJunctions = await getDocs(
        query(
          collection(db, 'junction_user_story_category'),
          where('uid', '==', newUserDocSnap.id),
          orderBy('views', 'desc'),
          limit(MAX_STORIES_NUMBER)
        )
      );

      const storyCategoriesSnapshot = await Promise.all(
        userStoryCateJunctions.docs
          .filter((document) => document.exists())
          .map((document) =>
            getDoc(doc(db, 'story_categories', document.data().storyCategoryId))
          )
      );

      const userStoryCategories = getCollectionData(storyCategoriesSnapshot);

      if (mounted.current) {
        dispatch({type: ON_SUCCESS});

        setUser({
          ...newUserData,
          uid: newUserDocSnap.id,
          storyCategories: userStoryCategories,
        });
      }

      return true;
    } catch (error) {
      console.log(error);
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

      await setDoc(doc(db, 'users', user.uid), newUserData);

      if (mounted.current) {
        dispatch({type: ON_SUCCESS});

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
        dispatch({type: ON_SUCCESS});
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
