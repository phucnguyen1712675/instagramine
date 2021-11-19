import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import {
  StyledUserCard,
  InfoWrapper,
  InfoContent,
  AdditionalInfoContent,
  OptionWrapper,
} from './styled/UserCard.styled';

const UserCard = ({
  avatar,
  avatarSize,
  hasStory,
  hasStoryBeenSeen,
  username,
  additionalInfoComponent,
  optionComponent,
}) => {
  return (
    <StyledUserCard>
      <Avatar
        size={avatarSize}
        url={avatar}
        hasStory={hasStory}
        hasStoryBeenSeen={hasStoryBeenSeen}
      />
      <InfoWrapper>
        <InfoContent>
          <h4>{username}</h4>
          <AdditionalInfoContent>
            {additionalInfoComponent}
          </AdditionalInfoContent>
        </InfoContent>
      </InfoWrapper>
      <OptionWrapper>{optionComponent}</OptionWrapper>
    </StyledUserCard>
  );
};

UserCard.propTypes = {
  avatar: PropTypes.string.isRequired,
  avatarSize: PropTypes.string,
  hasStory: PropTypes.bool.isRequired,
  hasStoryBeenSeen: PropTypes.bool,
  username: PropTypes.string.isRequired,
  additionalInfoComponent: PropTypes.element.isRequired,
  optionComponent: PropTypes.element.isRequired,
};

UserCard.defaultProps = {
  avatarSize: '4rem',
};

export default UserCard;
