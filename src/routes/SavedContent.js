import {useEffect} from 'react';
import {useSavedPosts} from '../hooks';
import {PostList} from '../components';
import {PageContent} from '../components/styled/Lib';
import {SavedContentSpinner} from '../components/styled/SavedContent.styled';

const SavedContent = () => {
  const {isLoading, savedPosts, getCurrentUserSavedPosts, hasSavedPosts} =
    useSavedPosts();

  useEffect(() => {
    getCurrentUserSavedPosts();
  }, [getCurrentUserSavedPosts]);

  if (isLoading) {
    return (
      <PageContent>
        <SavedContentSpinner />
      </PageContent>
    );
  }

  if (!hasSavedPosts()) {
    return (
      <PageContent>
        <p>No Saved Posts.</p>
      </PageContent>
    );
  }

  return <PostList posts={savedPosts} />;
};

export default SavedContent;
