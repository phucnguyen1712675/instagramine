import {useState, createContext} from 'react';
import PropTypes from 'prop-types';
import postsData from '../data/posts.json';

const SavedPostsContext = createContext({
  savedPosts: [],
  // eslint-disable-next-line no-unused-vars
  savePost: (post) => {},
  // eslint-disable-next-line no-unused-vars
  unsavePost: (id) => {},
  // eslint-disable-next-line no-unused-vars
  isSavedPost: (id) => {},
});

const savedPostsData = postsData.filter((post) => post.isSaved);

export const SavedPostsContextProvider = ({children}) => {
  const [savedPosts, setSavedPosts] = useState(savedPostsData);

  const savePost = (post) => {
    setSavedPosts([...savedPosts, post]);
  };

  const unsavePost = (id) => {
    setSavedPosts((prevState) => prevState.filter((post) => post.id !== id));
  };

  const isSavedPost = (id) => {
    const savedPostIds = savedPosts.map((post) => post.id);
    return savedPostIds.includes(id);
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
