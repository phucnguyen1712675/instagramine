import React from 'react';
import PropTypes from 'prop-types';
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
  username,
  profile,
  additionalInfoComponent,
  optionComponent,
  usernameAsHeading,
  asHeader,
  avatarComponent,
}) => {
  const usernameHeading = usernameAsHeading ? (
    <InfoContentUsername as="h4">{username}</InfoContentUsername>
  ) : (
    <InfoContentUsername href={profile}>{username}</InfoContentUsername>
  );

  const content = (
    <>
      {avatarComponent}
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
  username: PropTypes.string.isRequired,
  profile: PropTypes.string,
  additionalInfoComponent: PropTypes.element.isRequired,
  optionComponent: PropTypes.element.isRequired,
  usernameAsHeading: PropTypes.bool,
  asHeader: PropTypes.bool,
  avatarComponent: PropTypes.element.isRequired,
};

UserCard.defaultProps = {
  usernameAsHeading: false,
  asHeader: false,
};

export default UserCard;
