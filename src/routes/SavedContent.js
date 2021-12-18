import {useState, useEffect} from 'react';
import PostList from '../components/PostList';
import {useSavedPosts} from '../hooks/useSavedPosts';
import {SavedContentSpinner} from '../components/styled/SavedContent.styled';

const SavedContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {savedPosts} = useSavedPosts();

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (isLoading) {
    return <SavedContentSpinner />;
  }

  return <PostList posts={savedPosts} noPostsText="No Saved Posts." />;
};

export default SavedContent;
