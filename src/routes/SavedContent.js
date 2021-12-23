import {useEffect} from 'react';
import PostList from '../components/PostList';
import {useSavedPosts} from '../hooks/useSavedPosts';
import {PageContent} from '../components/styled/Lib';
import {SavedContentSpinner} from '../components/styled/SavedContent.styled';

const SavedContent = () => {
  const {isLoading, savedPosts, getCurrentUserSavedPosts, hasSavedPosts} =
    useSavedPosts();

  useEffect(() => {
    // let didCancel = false;

    getCurrentUserSavedPosts();

    // return () => {
    //   didCancel = true; // Remember if we start fetching something else
    // };
  }, [getCurrentUserSavedPosts]);

  if (isLoading) {
    return (
      <PageContent>
        <SavedContentSpinner />
      </PageContent>
    );
  }

  if (!hasSavedPosts) {
    return (
      <PageContent>
        <p>No Saved Posts.</p>
      </PageContent>
    );
  }

  return <PostList posts={savedPosts} />;
};

export default SavedContent;
