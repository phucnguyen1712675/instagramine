import {useReducer, useRef, useEffect} from 'react';
import {collection, getDocs, query, where} from 'firebase/firestore';
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
import {useOnScreen, useAuth, useMounted, useFirebase} from '../hooks';
import {notificationButtonReducer} from '../reducers';
import {onErrorMedia} from '../utils/media';
import {getCollectionData} from '../utils/firestore';
import {
  SET_IS_LOADING,
  SET_CHECKED,
  SET_SHOW_REQUESTS,
  SET_FOLLOW_REQUESTS,
  SET_FOLLOW_REQUESTS_AFTER_FETCHING,
} from '../actions/notificationButtonActions';

const requestUserConverter = (user) => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    avatar: user.avatar,
    profile: user.profile,
    createdAt: user.createdAt,
  };
};

const NotificationButton = () => {
  const [state, dispatch] = useReducer(notificationButtonReducer, {
    followRequests: [],
    isLoading: false,
    showRequests: false,
    checked: false,
  });

  const tooltipRef = useRef(null);

  const notificationPopupRef = useRef(null);

  const isNotificationPopupScreen = useOnScreen({ref: notificationPopupRef});

  const followRequestsLength = state.followRequests.length;

  const hasNotifications = followRequestsLength > 0;

  const shouldCenterChild = state.isLoading || !hasNotifications;

  const auth = useAuth();

  const mounted = useMounted();

  const firebase = useFirebase();

  useEffect(() => {
    const getRequests = async () => {
      try {
        dispatch({type: SET_IS_LOADING, payload: true});

        const requestUsersSnapshot = await getDocs(
          query(
            collection(firebase.db, 'junction_user_request_sender'),
            where('uid', '==', auth.authUser.id)
          )
        );

        if (requestUsersSnapshot.docs > 0) {
          const requestUsers = getCollectionData(requestUsersSnapshot.docs);

          const convertedRequestUsers = requestUsers.map(requestUserConverter);

          if (mounted.current) {
            dispatch({
              type: SET_FOLLOW_REQUESTS_AFTER_FETCHING,
              payload: convertedRequestUsers,
            });
          }
        }
      } catch (error) {
        if (mounted.current) {
          dispatch({type: SET_IS_LOADING, payload: false});
        }

        alert(`Error fetching follow requests: ${error}`);
      }
    };

    if (isNotificationPopupScreen) {
      getRequests();

      return () => {
        dispatch({type: SET_SHOW_REQUESTS, payload: false});
      };
    }
  }, [isNotificationPopupScreen, auth.authUser.id, mounted, firebase.db]);

  useEffect(() => {
    if (state.checked) {
      tooltipRef.current.setShowState(false);
    }
  }, [state.checked]);

  const checkHandler = (e) => {
    dispatch({type: SET_CHECKED, payload: e.target.checked});
  };

  const seeRequestsHandler = () => {
    dispatch({type: SET_SHOW_REQUESTS, payload: true});
  };

  const setFollowRequests = (followRequests) =>
    dispatch({
      type: SET_FOLLOW_REQUESTS,
      payload: followRequests,
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
                    followRequestsLength > 1 ? (
                      <NotificationMenuItemAvatarGroup>
                        {state.followRequests.slice(0, 2).map((user, index) => (
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
                          src={state.followRequests[0].avatar}
                          alt=""
                          onError={onErrorMedia}
                        />
                      </NotificationMenuItemAvatarWrapper>
                    )
                  }
                  topText="Follow Requests"
                  bottomTextComponent={
                    <NotificationMenuItemBottomText>
                      {state.followRequests[0].username} and{' '}
                      {followRequestsLength - 1} others
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
              state.followRequests.map((user) => (
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
                        setFollowRequests={setFollowRequests}
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
