import {useContext} from 'react';
import {SavedPostsContext} from '../store/savedPostsContext';

const useSavedPosts = () => {
  return useContext(SavedPostsContext);
};

export default useSavedPosts;
