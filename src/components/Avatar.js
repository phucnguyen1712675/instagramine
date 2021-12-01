import {useState} from 'react';
import PropTypes from 'prop-types';
import {StyledAvatar, AvatarImg} from './styled/Avatar.styled';
import {onErrorMedia} from '../utils/media';

const Avatar = ({
  className,
  url,
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
        hasStory={hasStory}
        hasStoryBeenSeen={hasStoryBeenSeenState}
      >
        <AvatarImg src={url} alt="" onError={onErrorMedia} />
      </StyledAvatar>
    );
  }

  return (
    <StyledAvatar
      className={className}
      hasStory={hasStory}
      hasStoryBeenSeen={hasStoryBeenSeenState}
      onClick={
        !disableOnClickHandler && !hasStoryBeenSeenState
          ? onClickStoryHandler
          : null
      }
    >
      <AvatarImg src={url} alt="" onError={onErrorMedia} />
    </StyledAvatar>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
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
  asLink: false,
  disableOnClickHandler: false,
};

export default Avatar;
