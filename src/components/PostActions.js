import React from 'react';
import PropTypes from 'prop-types';
import LikedButton from './LikedButton';
import SavedButton from './SavedButton';
import CommentIcon from './icons/CommentIcon';
import ShareIcon from './icons/ShareIcon';
import {StyledPostActions, PostActionButton} from './styled/PostActions.styled';

const PostActions = ({isLiked, isSaved}) => {
  return (
    <StyledPostActions>
      <LikedButton isLiked={isLiked} />
      <PostActionButton>
        <CommentIcon />
      </PostActionButton>
      <PostActionButton>
        <ShareIcon />
      </PostActionButton>
      <SavedButton isSaved={isSaved} />
    </StyledPostActions>
  );
};

PostActions.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
};

export default PostActions;
