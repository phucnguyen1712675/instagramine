import {useContext} from 'react';
import SavedPostsContext from '../store/saved-posts-context';

const useSavedPosts = () => {
  return useContext(SavedPostsContext);
};

export {useSavedPosts};
