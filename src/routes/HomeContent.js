import React from 'react';
import PostList from '../components/PostList';
import postsData from '../data/posts.json';

const HomeContent = () => {
  return <PostList posts={postsData} />;
};

export default HomeContent;
