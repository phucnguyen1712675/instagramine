import React from 'react';
import PropTypes from 'prop-types';
import PostHeader from './PostHeader';
import VideoPostBody from './VideoPostBody';
import {
  StyledPost,
  PostBody,
  PostImageWrapper,
  PostImage,
  PostActions,
  PostActionButton,
  PostFooter,
} from './styled/Post.styled';
import postActionButtons from '../constants/post-action-buttons';

const Post = ({post}) => {
  const postBodyContent = post.img ? (
    <>
      <PostImageWrapper>
        <PostImage src={post.img} />
      </PostImageWrapper>
      <PostActions>
        {postActionButtons.map((btn) => (
          <PostActionButton key={btn.id}>{btn.icon}</PostActionButton>
        ))}
      </PostActions>
    </>
  ) : (
    <VideoPostBody />
  );

  return (
    <StyledPost>
      <PostHeader
        avatar={post.avatar}
        hasStory={post.hasStory}
        hasStoryBeenSeen={post.hasStoryBeenSeen}
        username={post.username}
        profile={post.profile}
        city={post.city}
        country={post.country}
        location={post.location}
      />
      <PostBody>{postBodyContent}</PostBody>
      <PostFooter></PostFooter>
    </StyledPost>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
