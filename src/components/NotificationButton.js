import {useState} from 'react';
import RequestItemButtonGroup from './RequestItemButtonGroup';
import BellIcon from './icons/BellIcon';
import RightChevron from './icons/RightChevron';
import {
  StyledNotificationButton,
  NotificationMenuSpinner,
  AllRequestsItem,
  AllRequestsItemContent,
  NotificationMenuItemBottomText,
  NotificationMenuItemOption,
  NotificationMenuItemDot,
  NotificationMenuItemAvatarGroup,
  NotificationMenuItemAvatarGroupWrapper,
  NotificationMenuItemAvatarWrapper,
  NoNotificationsText,
  RequestItem,
  RequestItemContent,
} from './styled/NotificationButton.styled';
import {onErrorMedia} from '../utils/media';
import followRequestsData from '../data/follow-requests.json';

const NotificationButton = () => {
  const [followRequests, setFollowRequests] = useState(followRequestsData);

  const [isLoading, setIsLoading] = useState(false);

  const [showRequests, setShowRequests] = useState(false);

  let timeoutId;

  const setTimeoutLoading = () => {
    setIsLoading(true);

    timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const onCloseNotificationMenu = () => {
    clearTimeout(timeoutId);
    setShowRequests(false);
  };

  const onClickAllRequestsHandler = () => {
    setShowRequests(true);
  };

  // eslint-disable-next-line no-unused-vars
  const confirmRequest = (userId) => {};

  const removeRequest = (userId) => {
    const newFollowRequestsState = followRequests.filter(
      (user) => user.id !== userId
    );
    setFollowRequests(newFollowRequestsState);
  };

  const followRequestsLength = followRequests.length;

  let content;

  if (isLoading) {
    content = <NotificationMenuSpinner />;
  } else if (!showRequests) {
    if (followRequestsLength > 0) {
      content = (
        <AllRequestsItem onClick={onClickAllRequestsHandler}>
          <AllRequestsItemContent
            avatarComponent={
              followRequestsLength > 1 ? (
                <NotificationMenuItemAvatarGroup>
                  {followRequests.slice(0, 2).map((user, index) => (
                    <NotificationMenuItemAvatarGroupWrapper key={index}>
                      <img src={user.avatar} alt="" onError={onErrorMedia} />
                    </NotificationMenuItemAvatarGroupWrapper>
                  ))}
                </NotificationMenuItemAvatarGroup>
              ) : (
                <NotificationMenuItemAvatarWrapper>
                  <img
                    src={followRequests[0].avatar}
                    alt=""
                    onError={onErrorMedia}
                  />
                </NotificationMenuItemAvatarWrapper>
              )
            }
            topText="Follow Requests"
            bottomTextComponent={
              <NotificationMenuItemBottomText>
                {followRequests[0].username} and {followRequestsLength - 1}{' '}
                others
              </NotificationMenuItemBottomText>
            }
            optionComponent={
              <NotificationMenuItemOption>
                <NotificationMenuItemDot />
                <RightChevron />
              </NotificationMenuItemOption>
            }
            topTextAsHeading
          />
        </AllRequestsItem>
      );
    } else {
      content = <NoNotificationsText>No notifications</NoNotificationsText>;
    }
  } else {
    content = followRequests.map((user) => (
      <RequestItem key={user.id}>
        <RequestItemContent
          avatarComponent={
            <NotificationMenuItemAvatarWrapper>
              <img src={user.avatar} alt="" onError={onErrorMedia} />
            </NotificationMenuItemAvatarWrapper>
          }
          topText={user.username}
          topTextAsHeading
          bottomTextComponent={
            user.name ? (
              <NotificationMenuItemBottomText>
                {user.name}
              </NotificationMenuItemBottomText>
            ) : null
          }
          optionComponent={
            <RequestItemButtonGroup
              userId={user.id}
              confirmRequest={confirmRequest}
              removeRequest={removeRequest}
            />
          }
        />
      </RequestItem>
    ));
  }

  return (
    <StyledNotificationButton
      checkboxId="checkbox_notification_menu"
      tooltipTitle="Notifications"
      tooltipPosition="left"
      icon={<BellIcon />}
      onOpen={setTimeoutLoading}
      onClose={onCloseNotificationMenu}
      $isLoading={isLoading}
      $isEmpty={followRequestsLength === 0}
    >
      {content}
    </StyledNotificationButton>
  );
};

export default NotificationButton;
