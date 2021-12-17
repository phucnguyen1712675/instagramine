import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import {StyledPostList, NoPostsText} from './styled/PostList.styled';
import PostPropTypes from '../prop-types/post.propTypes';

const PostList = ({posts, noPostsText}) => {
  const postLength = posts.length;
  let content = null;

  if (postLength > 0) {
    content = posts.map((post) => <Post key={post.id} post={post} />);
  } else {
    content = <NoPostsText>{noPostsText}</NoPostsText>;
  }

  return <StyledPostList $postLength={postLength}>{content}</StyledPostList>;
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PostPropTypes).isRequired,
  noPostsText: PropTypes.string,
};

PostList.defaultProps = {
  noPostsText: 'No Posts.',
};

export default PostList;
