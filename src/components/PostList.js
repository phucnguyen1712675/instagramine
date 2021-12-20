import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import {StyledPostList} from './styled/PostList.styled';
import PostPropTypes from '../prop-types/post.propTypes';

const PostList = ({posts}) => {
  return (
    <StyledPostList $postLength={posts.length}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </StyledPostList>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PostPropTypes).isRequired,
};

export default PostList;
