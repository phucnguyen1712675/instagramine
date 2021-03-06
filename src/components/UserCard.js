import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledUserCard,
  TextContentWrapper,
  TextContent,
  TopText,
  BottomText,
  OptionWrapper,
} from './styled/UserCard.styled';

const UserCard = ({
  topTextAsHeading = false,
  className,
  topText,
  profile,
  bottomTextComponent,
  optionComponent,
  avatarComponent,
  onClick,
}) => {
  const topTextContent = topTextAsHeading ? (
    <TopText as="h4">{topText}</TopText>
  ) : (
    <TopText href={profile}>{topText}</TopText>
  );

  return (
    <StyledUserCard className={className} onClick={onClick}>
      {avatarComponent}
      <TextContentWrapper>
        <TextContent>
          {topTextContent}
          <BottomText>{bottomTextComponent}</BottomText>
        </TextContent>
      </TextContentWrapper>
      <OptionWrapper>{optionComponent}</OptionWrapper>
    </StyledUserCard>
  );
};

UserCard.propTypes = {
  className: PropTypes.string,
  topText: PropTypes.string.isRequired,
  profile: PropTypes.string,
  bottomTextComponent: PropTypes.element,
  optionComponent: PropTypes.element,
  topTextAsHeading: PropTypes.bool,
  avatarComponent: PropTypes.element.isRequired,
  onClick: PropTypes.func,
};

export default UserCard;
