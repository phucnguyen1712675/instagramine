import {useState} from 'react';
import PropTypes from 'prop-types';
import BellIcon from './icons/BellIcon';
import RightChevron from './icons/RightChevron';
import Spinner from './icons/Spinner';
import {
  StyledNotificationButton,
  NotificationMenuItem,
  NotificationMenuItemLink,
  NotificationMenuItemContent,
  NotificationMenuItemRequestText,
  NotificationMenuItemOption,
  NotificationMenuItemDot,
  NotificationMenuItemAvatarGroup,
  NotificationMenuItemAvatarWrapper,
  NotificationMenuItemAvatar,
} from './styled/NotificationButton.styled';
import {onErrorMedia} from '../utils/media';

const NotificationButton = ({followRequests}) => {
  const [isLoading, setIsLoading] = useState(false);

  let timeoutId;

  const setTimeoutLoading = () => {
    setIsLoading(true);

    timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const clearTimeoutId = () => clearTimeout(timeoutId);

  const followRequestsLength = followRequests.length;

  const followRequestsReviewContent = followRequests
    .slice(0, 2)
    .map((requester, index) => (
      <NotificationMenuItemAvatarWrapper key={index}>
        <NotificationMenuItemAvatar
          src={requester.avatar}
          alt=""
          onError={onErrorMedia}
        />
      </NotificationMenuItemAvatarWrapper>
    ));

  const avatarComponent = (
    <NotificationMenuItemAvatarGroup>
      {followRequestsReviewContent}
    </NotificationMenuItemAvatarGroup>
  );

  const bottomTextComponent = (
    <NotificationMenuItemRequestText>
      {followRequests[0].username} and {followRequestsLength - 1} others
    </NotificationMenuItemRequestText>
  );

  const optionComponent = (
    <NotificationMenuItemOption>
      <NotificationMenuItemDot />
      <RightChevron />
    </NotificationMenuItemOption>
  );

  const content = isLoading ? (
    <Spinner />
  ) : followRequestsLength > 0 ? (
    <NotificationMenuItem>
      <NotificationMenuItemLink href="#">
        <NotificationMenuItemContent
          avatarComponent={avatarComponent}
          topText="Follow Requests"
          bottomTextComponent={bottomTextComponent}
          optionComponent={optionComponent}
          topTextAsHeading
        />
      </NotificationMenuItemLink>
    </NotificationMenuItem>
  ) : (
    <p>No notifications</p>
  );

  return (
    <StyledNotificationButton
      checkboxId="checkbox_notification_menu"
      tooltipTitle="Notifications"
      tooltipPosition="left"
      icon={<BellIcon />}
      onOpen={setTimeoutLoading}
      onClose={clearTimeoutId}
      isLoading={isLoading}
      isEmpty={followRequestsLength === 0}
    >
      {content}
    </StyledNotificationButton>
  );
};

NotificationButton.propTypes = {
  followRequests: PropTypes.array.isRequired,
};

export default NotificationButton;
