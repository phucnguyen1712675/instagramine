import {useReducer, useRef, useEffect} from 'react';
import RequestItemButtonGroup from './RequestItemButtonGroup';
import BellIcon from './icons/BellIcon';
import RightChevron from './icons/RightChevron';
import {FakeCheckbox, OverlayLabel, FakeButtonLabel} from './styled/Lib';
import {
  StyledNotificationButton,
  NotificationPopup,
  NotificationMenu,
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
import {useOnScreen} from '../hooks/useOnScreen';
import followRequestsData from '../data/follow-requests.json';
import NotificationButtonReducer from '../reducers/notification-button-reducer';
import {
  SET_IS_LOADING,
  SET_CHECKED,
  SET_SHOW_REQUESTS,
  SET_FOLLOW_REQUESTS,
  ON_HIDDEN,
} from '../actions/notification-button-actions';

const NotificationButton = () => {
  const [state, dispatch] = useReducer(NotificationButtonReducer, {
    followRequests: followRequestsData,
    isLoading: true,
    showRequests: false,
    checked: false,
  });

  const tooltipRef = useRef(null);

  const notificationPopupRef = useRef(null);

  const isNotificationPopupScreen = useOnScreen({ref: notificationPopupRef});

  const {followRequests, isLoading, showRequests, checked} = state;

  useEffect(() => {
    if (isNotificationPopupScreen) {
      let timeoutId = setTimeout(() => {
        dispatch({type: SET_IS_LOADING, payload: false});
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
        dispatch({type: ON_HIDDEN});
      };
    }
  }, [isNotificationPopupScreen]);

  useEffect(() => {
    if (checked) {
      tooltipRef.current.setShowState(false);
    }
  }, [checked]);

  const onChangeHandler = (e) => {
    const isChecked = e.target.checked;
    dispatch({type: SET_CHECKED, payload: isChecked});
  };

  const onClickAllRequestsHandler = () => {
    dispatch({type: SET_SHOW_REQUESTS, payload: true});
  };

  // eslint-disable-next-line no-unused-vars
  const confirmRequest = (userId) => {};

  const removeRequest = (userId) => {
    const newFollowRequests = followRequests.filter(
      (user) => user.id !== userId
    );
    dispatch({type: SET_FOLLOW_REQUESTS, payload: newFollowRequests});
  };

  const followRequestsLength = followRequests.length;

  let content = null;

  if (!showRequests) {
    if (followRequestsLength > 0) {
      content = (
        <AllRequestsItem onClick={onClickAllRequestsHandler}>
          <AllRequestsItemContent
            topTextAsHeading
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
      ref={tooltipRef}
      trigger={checked ? 'none' : 'hover'}
      content="Notifications"
      position="left"
    >
      <FakeCheckbox
        id="checkbox_notification_menu"
        onChange={onChangeHandler}
      />
      <FakeButtonLabel htmlFor="checkbox_notification_menu">
        <BellIcon />
      </FakeButtonLabel>
      <OverlayLabel htmlFor="checkbox_notification_menu" />
      <NotificationPopup
        ref={notificationPopupRef}
        $isLoading={isLoading}
        $isEmpty={followRequestsLength === 0}
      >
        {isLoading ? (
          <NotificationMenuSpinner />
        ) : (
          <NotificationMenu>{content}</NotificationMenu>
        )}
      </NotificationPopup>
    </StyledNotificationButton>
  );
};

export default NotificationButton;
