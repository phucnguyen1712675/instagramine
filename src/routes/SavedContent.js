import {useState, useEffect} from 'react';
import PostList from '../components/PostList';
import {useSavedPosts} from '../hooks/useSavedPosts';
import {PageContent} from '../components/styled/Lib';
import {SavedContentSpinner} from '../components/styled/SavedContent.styled';

const SavedContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {savedPosts} = useSavedPosts();

  const hasPosts = savedPosts.length > 0;

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (isLoading) {
    return (
      <PageContent>
        <SavedContentSpinner />
      </PageContent>
    );
  }

  if (!hasPosts) {
    <PageContent>
      <p>No Saved Posts.</p>
    </PageContent>;
  }

  return <PostList posts={savedPosts} />;
};

export default SavedContent;
