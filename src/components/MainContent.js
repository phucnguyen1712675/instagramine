import React from 'react';
import Post from './Post';
import {StyledMainContent, PostWrapper} from './styled/MainContent.styled';
import postsData from '../data/posts.json';

const MainContent = () => {
  return (
    <StyledMainContent>
      <PostWrapper>
        {postsData.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </PostWrapper>
    </StyledMainContent>
  );
};

export default MainContent;
