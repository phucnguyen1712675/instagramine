import {useState} from 'react';
import PropTypes from 'prop-types';
import {StyledAvatar} from './styled/Avatar.styled';
import {onErrorImage} from '../utils/media';

const Avatar = ({
  className,
  url,
  size,
  hasStory,
  hasStoryBeenSeen,
  asLink,
  profile,
  disableOnClickHandler,
}) => {
  const [hasStoryBeenSeenState, setHasStoryBeenSeenState] = useState(
    hasStory && hasStoryBeenSeen
  );

  const onClickStoryHandler = () => {
    !hasStoryBeenSeenState && setHasStoryBeenSeenState(true);
  };

  if (asLink) {
    return (
      <StyledAvatar
        as="a"
        href={profile}
        className={className}
        size={size}
        hasStory={hasStory}
        hasStoryBeenSeen={hasStoryBeenSeenState}
      >
        <img src={url} alt="" onError={onErrorImage} />
      </StyledAvatar>
    );
  }

  return (
    <StyledAvatar
      className={className}
      size={size}
      hasStory={hasStory}
      hasStoryBeenSeen={hasStoryBeenSeenState}
      onClick={
        !disableOnClickHandler && !hasStoryBeenSeenState
          ? onClickStoryHandler
          : null
      }
    >
      <img src={url} alt="" onError={onErrorImage} />
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
  disableOnClickHandler: PropTypes.bool,
};

Avatar.defaultProps = {
  size: '40px',
  asLink: false,
  disableOnClickHandler: false,
};

export default Avatar;
