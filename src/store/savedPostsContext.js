import {createContext, useReducer, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useAuth, useMounted} from '../hooks';
import {savedPostsContextReducer} from '../reducers';
import {
  SET_IS_LOADING,
  SET_SAVED_POSTS_AFTER_LOADING,
  SET_SAVED_POSTS_AFTER_ADDING,
  SET_SAVED_POSTS_AFTER_REMOVING,
} from '../actions/savedPostsContextActions';
import {
  getSavedPostsByUid,
  addJunctionUserSavedPost,
  removeJunctionUserSavedPost,
} from '../services/firestore';

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
    savedPosts: [],
  });

  const auth = useAuth();

  const mounted = useMounted();

  const getSavedPosts = useCallback(async () => {
    dispatch({type: SET_IS_LOADING, payload: true});

    const savedPostsData = await getSavedPostsByUid(auth.authUser.id);

    if (mounted.current) {
      dispatch({
        type: SET_SAVED_POSTS_AFTER_LOADING,
        payload: savedPostsData,
      });
    }
  }, [auth.authUser.id, mounted]);

  const savePost = async (post) => {
    dispatch({type: SET_IS_LOADING, payload: true});

    await addJunctionUserSavedPost({
      uid: auth.authUser.id,
      savedPost: post,
    });

    if (mounted.current) {
      dispatch({
        type: SET_SAVED_POSTS_AFTER_ADDING,
        payload: post,
      });
    }
  };

  const unsavePost = async (id) => {
    dispatch({type: SET_IS_LOADING, payload: true});

    await removeJunctionUserSavedPost({
      uid: auth.authUser.id,
      savedPostId: id,
    });

    if (mounted.current) {
      dispatch({
        type: SET_SAVED_POSTS_AFTER_REMOVING,
        payload: id,
      });
    }
  };

  const hasSavedPosts = () => state.savedPosts.length > 0;

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
