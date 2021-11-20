import React from 'react';
import PropTypes from 'prop-types';
import ThreeDotsIcon from './icons/ThreeDotsIcon';
import {
  StyledPostHeader,
  PostHeaderLocation,
  MoreOptionButton,
} from './styled/PostHeader.styled';

const PostHeader = ({
  avatar,
  hasStory,
  hasStoryBeenSeen,
  username,
  profile,
  city,
  country,
  location,
}) => {
  const additionalInfoComponent = (
    <PostHeaderLocation href={location}>
      {city}, {country}
    </PostHeaderLocation>
  );

  const optionComponent = (
    <MoreOptionButton>
      <ThreeDotsIcon />
    </MoreOptionButton>
  );

  return (
    <StyledPostHeader
      asHeader
      avatar={avatar}
      hasStory={hasStory}
      hasStoryBeenSeen={hasStoryBeenSeen}
      username={username}
      profile={profile}
      additionalInfoComponent={additionalInfoComponent}
      optionComponent={optionComponent}
    />
  );
};

PostHeader.propTypes = {
  avatar: PropTypes.string.isRequired,
  hasStory: PropTypes.bool.isRequired,
  hasStoryBeenSeen: PropTypes.bool,
  username: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default PostHeader;
	