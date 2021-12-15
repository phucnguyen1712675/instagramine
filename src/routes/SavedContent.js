import React from 'react';
import PostList from '../components/PostList';
import postsData from '../data/posts.json';

const SavedContent = () => {
  const savedPost = postsData.filter((post) => post.isSaved);

  return <PostList posts={savedPost} />;
};

export default SavedContent;
