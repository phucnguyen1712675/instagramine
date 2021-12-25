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
import {getCollectionData} from '../utils/firestore';

const SavedPostsContext = createContext({
  isLoading: false,
  savedPosts: null,
  getSavedPosts: async () => {},
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

  const auth = useAuth();

  const mounted = useMounted();

  const getSavedPosts = useCallback(async () => {
    try {
      dispatch({type: SET_IS_LOADING, payload: true});

      const savedPostsSnapshot = await getDocs(
        collection(db, `users/${auth.user.uid}/saved-posts`)
      );

      const savedPosts = getCollectionData(savedPostsSnapshot.docs);

      if (mounted.current) {
        dispatch({
          type: SET_SAVED_POSTS_AFTER_FETCHING,
          payload: savedPosts,
        });
      }
    } catch (error) {
      alert(`Error fetching saved posts: ${error}`);
    }
  }, [auth.user.uid, mounted]);

  const savePost = (post) => {
    dispatch({type: SAVE_POST, payload: post});
  };

  const unsavePost = (id) => {
    dispatch({type: UNSAVE_POST, payload: id});
  };

  const hasSavedPosts = () => state.savedPosts?.length > 0;

  const isSavedPost = (id) => {
    if (hasSavedPosts()) {
      return state.savedPosts.findIndex((post) => post.id === id) !== -1;
    }
    return false;
  };

  const value = {
    ...state,
    getSavedPosts,
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
