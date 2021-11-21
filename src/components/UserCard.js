import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import {
  StyledUserCard,
  InfoWrapper,
  InfoContent,
  InfoContentUsername,
  AdditionalInfoContent,
  OptionWrapper,
} from './styled/UserCard.styled';

const UserCard = ({
  className,
  avatar,
  avatarSize,
  hasStory,
  hasStoryBeenSeen,
  username,
  profile,
  additionalInfoComponent,
  optionComponent,
  usernameAsHeading,
  asHeader,
  avatarAsLink,
}) => {
  const usernameHeading = usernameAsHeading ? (
    <InfoContentUsername as="h4">{username}</InfoContentUsername>
  ) : (
    <InfoContentUsername href={profile}>{username}</InfoContentUsername>
  );

  const content = (
    <>
      <Avatar
        size={avatarSize}
        url={avatar}
        hasStory={hasStory}
        hasStoryBeenSeen={hasStoryBeenSeen}
        asLink={avatarAsLink && !hasStory}
        profile={profile}
      />
      <InfoWrapper>
        <InfoContent>
          {usernameHeading}
          <AdditionalInfoContent>
            {additionalInfoComponent}
          </AdditionalInfoContent>
        </InfoContent>
      </InfoWrapper>
      <OptionWrapper>{optionComponent}</OptionWrapper>
    </>
  );

  if (asHeader) {
    return (
      <StyledUserCard className={className} as="header">
        {content}
      </StyledUserCard>
    );
  }

  return <StyledUserCard className={className}>{content}</StyledUserCard>;
};

UserCard.propTypes = {
  className: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  avatarSize: PropTypes.string,
  hasStory: PropTypes.bool.isRequired,
  hasStoryBeenSeen: PropTypes.bool,
  username: PropTypes.string.isRequired,
  profile: PropTypes.string,
  additionalInfoComponent: PropTypes.element.isRequired,
  optionComponent: PropTypes.element.isRequired,
  usernameAsHeading: PropTypes.bool,
  asHeader: PropTypes.bool,
  avatarAsLink: PropTypes.bool,
};

UserCard.defaultProps = {
  avatarSize: '4rem',
  usernameAsHeading: false,
  asHeader: false,
  avatarAsLink: false,
};

export default UserCard;
