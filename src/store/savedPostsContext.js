import {createContext, useReducer, useCallback} from 'react';
import PropTypes from 'prop-types';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../firebase-config';
import {useAuth, useMounted} from '../hooks';
import {savedPostsContextReducer} from '../reducers';
import {
  SET_IS_LOADING,
  SAVE_POST,
  UNSAVE_POST,
  SET_SAVED_POSTS_AFTER_FETCHING,
} from '../actions/savedPostsContextActions';

const SavedPostsContext = createContext({
  isLoading: false,
  savedPosts: null,
  getCurrentUserSavedPosts: async () => {},
  // eslint-disable-next-line no-unused-vars
  savePost: (post) => {},
  // eslint-disable-next-line no-unused-vars
  unsavePost: (id) => {},
  // eslint-disable-next-line no-unused-vars
  isSavedPost: (id) => false,
  hasSavedPosts: () => false,
});

const SavedPostsContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(savedPostsContextReducer, {
    isLoading: false,
    savedPosts: null,
  });

  const {isLoading, savedPosts} = state;

  const auth = useAuth();

  const mounted = useMounted();

  const getCurrentUserSavedPosts = useCallback(async () => {
    try {
      dispatch({type: SET_IS_LOADING, payload: true});

      const currentUserSavedPostsCollectionRef = collection(
        db,
        `users/${auth.user.uid}/saved-posts`
      );

      const {docs} = await getDocs(currentUserSavedPostsCollectionRef);

      if (mounted.current) {
        if (docs.length > 0) {
          dispatch({
            type: SET_SAVED_POSTS_AFTER_FETCHING,
            payload: docs.map((doc) => ({
              ...doc.data(),
            })),
          });
        } else {
          dispatch({type: SET_IS_LOADING, payload: false});
        }
      }
    } catch (error) {
      alert('Error fetching saved posts');
    }
  }, [auth.user.uid, mounted]);

  const savePost = (post) => {
    dispatch({type: SAVE_POST, payload: post});
  };

  const unsavePost = (id) => {
    dispatch({type: UNSAVE_POST, payload: id});
  };

  const hasSavedPosts = () => savedPosts?.length > 0;

  const isSavedPost = (id) => {
    if (hasSavedPosts()) {
      return savedPosts.findIndex((post) => post.id === id) !== -1;
    }
    return false;
  };

  const value = {
    isLoading,
    savedPosts,
    getCurrentUserSavedPosts,
    savePost,
    unsavePost,
    isSavedPost,
    hasSavedPosts,
  };

  return (
    <SavedPostsContext.Provider value={value}>
      {children}
    </SavedPostsContext.Provider>
  );
};

SavedPostsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {SavedPostsContext, SavedPostsContextProvider};
