import React from 'react';
import PropTypes from 'prop-types';
import {StyledAvatar} from './styled/Avatar.styled';

const Avatar = ({
  className,
  url,
  size,
  hasStory,
  hasStoryBeenSeen,
  asLink,
  profile,
}) => {
  if (asLink) {
    return (
      <StyledAvatar
        as="a"
        className={className}
        href={profile}
        size={size}
        hasStory={hasStory}
        hasStoryBeenSeen={hasStoryBeenSeen}
      >
        <img src={url} alt="" />
      </StyledAvatar>
    );
  }

  return (
    <StyledAvatar
      className={className}
      size={size}
      hasStory={hasStory}
      hasStoryBeenSeen={hasStoryBeenSeen}
    >
      <img src={url} alt="" />
    </StyledAvatar>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
  size: PropTypes.string,
  hasStory: PropTypes.bool.isRequired,
  hasStoryBeenSeen: function (props, propName, componentName) {
    if (
      props['hasStory'] &&
      (props[propName] == undefined || typeof props[propName] != 'boolean')
    ) {
      return new Error(
        `Please provide 'hasStoryBeenSeen' prop for ${componentName}!`
      );
    }
  },
  asLink: PropTypes.bool,
  profile: function (props, propName, componentName) {
    if (
      props['asLink'] &&
      (props[propName] == undefined || typeof props[propName] != 'string')
    ) {
      return new Error(`Please provide a profile for ${componentName}!`);
    }
  },
};

Avatar.defaultProps = {
  size: '40px',
  asLink: false,
};

export default Avatar;
