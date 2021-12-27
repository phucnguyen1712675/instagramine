import {createContext, useReducer, useCallback} from 'react';
import PropTypes from 'prop-types';
import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  query,
  where,
  FieldValue,
} from 'firebase/firestore';
import {db} from '../firebase-config';
import {useAuth, useMounted} from '../hooks';
import {savedPostsContextReducer} from '../reducers';
import {
  SET_IS_LOADING,
  SET_SAVED_POSTS_AFTER_LOADING,
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

      const userSavedPostJunction = await getDocs(
        query(
          collection(db, 'junction_user_saved_post'),
          where('uid', '==', auth.uid)
        )
      );

      if (userSavedPostJunction.docs > 0) {
        const savedPosts = getCollectionData(userSavedPostJunction.docs);

        if (mounted.current) {
          dispatch({
            type: SET_SAVED_POSTS_AFTER_LOADING,
            payload: savedPosts,
          });
        }
      } else {
        dispatch({type: SET_IS_LOADING, payload: false});
      }
    } catch (error) {
      if (mounted.current) {
        dispatch({type: SET_IS_LOADING, payload: false});
      }

      alert(`Error fetching saved posts: ${error}`);
    }
  }, [auth.uid, mounted]);

  const savePost = async (post) => {
    try {
      dispatch({type: SET_IS_LOADING, payload: true});

      const itemToAdd = {
        uid: auth.uid,
        savedPostId: post.id,
        createdAt: FieldValue.serverTimestamp(),
      };

      await setDoc(
        doc(db, `junction_user_saved_post/${auth.uid}_${post.id}`),
        itemToAdd
      );

      const savedPostsPayload = [post, ...state.savedPosts];

      if (mounted.current) {
        dispatch({
          type: SET_SAVED_POSTS_AFTER_LOADING,
          payload: savedPostsPayload,
        });
      }
    } catch (error) {
      if (mounted.current) {
        dispatch({type: SET_IS_LOADING, payload: false});
      }

      alert(`Error saving post: ${error}`);
    }
  };

  const unsavePost = async (id) => {
    try {
      dispatch({type: SET_IS_LOADING, payload: true});

      await deleteDoc(doc(db, `junction_user_saved_post/${auth.uid}_${id}`));

      const savedPostsPayload = state.savedPosts.filter(
        (post) => post.id !== id
      );

      if (mounted.current) {
        dispatch({
          type: SET_SAVED_POSTS_AFTER_LOADING,
          payload: savedPostsPayload,
        });
      }
    } catch (error) {
      if (mounted.current) {
        dispatch({type: SET_IS_LOADING, payload: false});
      }

      alert(`Error un-saving post: ${error}`);
    }
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
