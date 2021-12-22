import {createContext} from 'react';
import PropTypes from 'prop-types';
import {useLocalStorage} from '../hooks/useLocalStorage';

const SavedPostsContext = createContext({
  savedPosts: [],
  // eslint-disable-next-line no-unused-vars
  savePost: (post) => {},
  // eslint-disable-next-line no-unused-vars
  unsavePost: (id) => {},
  // eslint-disable-next-line no-unused-vars
  isSavedPost: (id) => false,
});

export const SavedPostsContextProvider = ({children}) => {
  const [savedPosts, setSavedPosts] = useLocalStorage({
    key: 'savedPosts',
    initialValue: [],
  });

  const savePost = (post) => {
    setSavedPosts([post, ...savedPosts]);
  };

  const unsavePost = (id) => {
    setSavedPosts((prevState) => prevState.filter((post) => post.id !== id));
  };

  const isSavedPost = (id) => {
    return savedPosts.findIndex((post) => post.id === id) !== -1;
  };

  const value = {
    savedPosts,
    savePost,
    unsavePost,
    isSavedPost,
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

export default SavedPostsContext;
