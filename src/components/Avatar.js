import React from 'react';
import PropTypes from 'prop-types';
import {StyledAvatar} from './styled/Avatar.styled';

const Avatar = ({url, size, hasStory, hasStoryBeenSeen}) => {
  return (
    <StyledAvatar
      size={size}
      hasStory={hasStory}
      hasStoryBeenSeen={hasStoryBeenSeen}
    >
      <img src={url} alt="" />
    </StyledAvatar>
  );
};

Avatar.propTypes = {
  url: PropTypes.string.isRequired,
  size: PropTypes.number,
  hasStory: PropTypes.bool,
  hasStoryBeenSeen: PropTypes.bool,
};

export default Avatar;
