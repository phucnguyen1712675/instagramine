import React from 'react';
import PostList from '../components/PostList';
import {useSavedPosts} from '../hooks/useSavedPosts';

const SavedContent = () => {
  const {savedPosts} = useSavedPosts();

  return <PostList posts={savedPosts} noPostsText="No Saved Posts." />;
};

export default SavedContent;
