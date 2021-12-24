import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import {StyledPostList} from './styled/PostList.styled';
import {postPropTypes} from '../prop-types';

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
  posts: PropTypes.arrayOf(postPropTypes).isRequired,
};

export default PostList;
