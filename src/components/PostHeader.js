import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';
import {UserAddress} from './styled/PostHeader.styled';

const PostHeader = ({
  avatar,
  hasStory,
  hasStoryBeenSeen,
  username,
  city,
  country,
}) => {
  return (
    <UserCard
      avatar={avatar}
      hasStory={hasStory}
      hasStoryBeenSeen={hasStoryBeenSeen}
      username={username}
      additionalInfoComponent={
        <UserAddress>
          {city}, {country}
        </UserAddress>
      }
      optionComponent={<></>}
    />
  );
};

PostHeader.propTypes = {
  avatar: PropTypes.string.isRequired,
  hasStory: PropTypes.bool.isRequired,
  hasStoryBeenSeen: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default PostHeader;
