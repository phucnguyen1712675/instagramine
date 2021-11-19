import React from 'react';
import PropTypes from 'prop-types';
import PostHeader from './PostHeader';
import {StyledPost, PostBody, PostFooter} from './styled/Post.styled';

const Post = ({post}) => {
  return (
    <StyledPost>
      <PostHeader
        avatar={post.avatar}
        hasStory={post.hasStory}
        hasStoryBeenSeen={post.hasStoryBeenSeen}
        username={post.username}
        city={post.city}
        country={post.country}
      />
      <PostBody></PostBody>
      <PostFooter></PostFooter>
    </StyledPost>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
