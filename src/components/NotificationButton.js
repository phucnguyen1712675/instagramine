import {useReducer, useRef, useEffect} from 'react';
import RequestItemButtonGroup from './RequestItemButtonGroup';
import {BellIcon, RightChevronIcon} from './icons';
import {FakeCheckbox, FakeButtonLabel} from './styled/Lib';
import {
  StyledNotificationButton,
  NotificationOverlayLabel,
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
import {useOnScreen, useAuth, useMounted} from '../hooks';
import {notificationButtonReducer} from '../reducers';
import {onErrorMedia} from '../utils/media';
import {getRequestSendersByUid} from '../services/firestore';
import {
  SET_IS_LOADING,
  SET_CHECKED,
  SET_SHOW_REQUESTS,
  SET_REQUEST_SENDERS_AFTER_LOADING,
  REMOVE_REQUEST_SENDER,
} from '../actions/notificationButtonActions';

const NotificationButton = () => {
  const [state, dispatch] = useReducer(notificationButtonReducer, {
    requestSenders: [],
    isLoading: false,
    showRequests: false,
    checked: false,
  });

  const tooltipRef = useRef(null);

  const notificationPopupRef = useRef(null);

  const isNotificationPopupScreen = useOnScreen({ref: notificationPopupRef});

  const auth = useAuth();

  const mounted = useMounted();

  // console.log(state);

  useEffect(() => {
    if (isNotificationPopupScreen) {
      const getRequests = async () => {
        dispatch({type: SET_IS_LOADING, payload: true});

        const requestSendersData = await getRequestSendersByUid(
          auth.authUser.id
        );

        if (mounted.current) {
          dispatch({
            type: SET_REQUEST_SENDERS_AFTER_LOADING,
            payload: requestSendersData,
          });
        }
      };

      getRequests();

      return () => {
        dispatch({type: SET_SHOW_REQUESTS, payload: false});
      };
    }
  }, [isNotificationPopupScreen, auth.authUser.id, mounted]);

  useEffect(() => {
    if (state.checked) {
      tooltipRef.current.setShowState(false);
    }
  }, [state.checked]);

  const requestSendersLength = state.requestSenders.length;

  const hasNotifications = requestSendersLength > 0;

  const shouldCenterChild = state.isLoading || !hasNotifications;

  const checkHandler = (e) => {
    dispatch({type: SET_CHECKED, payload: e.target.checked});
  };

  const seeRequestsHandler = () => {
    dispatch({type: SET_SHOW_REQUESTS, payload: true});
  };

  const setRequestSendersAfterRemoving = (id) =>
    dispatch({
      type: REMOVE_REQUEST_SENDER,
      payload: id,
    });

  return (
    <StyledNotificationButton
      ref={tooltipRef}
      trigger={state.checked ? 'none' : 'hover'}
      content="Notifications"
      position="left"
    >
      <FakeCheckbox id="checkbox_notification_menu" onChange={checkHandler} />
      <FakeButtonLabel htmlFor="checkbox_notification_menu">
        <BellIcon />
      </FakeButtonLabel>
      <NotificationOverlayLabel htmlFor="checkbox_notification_menu" />
      <NotificationPopup
        ref={notificationPopupRef}
        $shouldCenterChild={shouldCenterChild}
      >
        {state.isLoading ? (
          <NotificationMenuSpinner />
        ) : !hasNotifications ? (
          <NoNotificationsText>No notifications</NoNotificationsText>
        ) : (
          <NotificationMenu>
            {!state.showRequests && hasNotifications ? (
              <AllRequestsItem onClick={seeRequestsHandler}>
                <AllRequestsItemContent
                  topTextAsHeading
                  avatarComponent={
                    requestSendersLength > 1 ? (
                      <NotificationMenuItemAvatarGroup>
                        {state.requestSenders.slice(0, 2).map((user, index) => (
                          <NotificationMenuItemAvatarGroupWrapper key={index}>
                            <img
                              src={user.avatar}
                              alt=""
                              onError={onErrorMedia}
                            />
                          </NotificationMenuItemAvatarGroupWrapper>
                        ))}
                      </NotificationMenuItemAvatarGroup>
                    ) : (
                      <NotificationMenuItemAvatarWrapper>
                        <img
                          src={state.requestSenders[0].avatar}
                          alt=""
                          onError={onErrorMedia}
                        />
                      </NotificationMenuItemAvatarWrapper>
                    )
                  }
                  topText="Follow Requests"
                  bottomTextComponent={
                    <NotificationMenuItemBottomText>
                      {state.requestSenders[0].username} and{' '}
                      {requestSendersLength - 1} others
                    </NotificationMenuItemBottomText>
                  }
                  optionComponent={
                    <NotificationMenuItemOption>
                      <NotificationMenuItemDot />
                      <RightChevronIcon />
                    </NotificationMenuItemOption>
                  }
                />
              </AllRequestsItem>
            ) : (
              state.requestSenders.map((user) => (
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
                        setRequestSendersAfterRemoving={
                          setRequestSendersAfterRemoving
                        }
                      />
                    }
                  />
                </RequestItem>
              ))
            )}
          </NotificationMenu>
        )}
      </NotificationPopup>
    </StyledNotificationButton>
  );
};

export default NotificationButton;
