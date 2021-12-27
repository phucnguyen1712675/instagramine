import {useReducer, useRef, useEffect, useCallback} from 'react';
import {useNavigate, Outlet, useLocation} from 'react-router-dom';
import {AuthErrorCodes, signOut} from 'firebase/auth';
import Header from './Header';
import UserMenu from './UserMenu';
import Tooltip from './Tooltip';
import {
  SettingIcon,
  UserIcon,
  HomeIcon,
  InboxIcon,
  ExploreIcon,
  ActivityIcon,
  ReelIcon,
  StreamIcon,
  SavedListIcon,
  MenuSettingIcon,
} from './icons';
import {FakeCheckbox, FakeButtonLabel, OverlayLabel} from './styled/Lib';
import {
  StyledHomeLayout,
  SidebarOverlay,
  Sidebar,
  Nav,
  SettingButton,
  SettingMenu,
  SettingMenuItem,
  SettingMenuItemLink,
  SettingMenuItemText,
  MainContent,
  SidebarButton,
} from './styled/HomeLayout.styled';
import {PATHS} from '../constants';
import {useAuth, useMounted} from '../hooks';
import {homeLayoutReducer} from '../reducers';
import {auth} from '../firebase-config';
import {SavedPostsContextProvider} from '../store/savedPostsContext';
import {
  SET_TOGGLE_SIDEBAR_BTN_CHECKED,
  SET_TOGGLE_SETTING_MENU_BTN_CHECKED,
  SET_SHOW_TOGGLE_SIDEBAR,
  SET_IS_LOADING,
} from '../actions/homeLayoutActions';

const findLogOutError = (error) => {
  switch (error.code) {
    case AuthErrorCodes.USER_SIGNED_OUT:
      return 'User has signed out';
    default:
      return 'Something went wrong';
  }
};

const HomeLayout = () => {
  const [state, dispatch] = useReducer(homeLayoutReducer, {
    isLoading: false,
    toggleSidebarBtnChecked: false,
    toggleSettingMenuBtnChecked: false,
    showToggleSidebar: false,
  });

  const tooltipRef = useRef(null);

  const menuBtnCheckbox = useRef(null);

  const menuBtnRef = useCallback(
    (node) => {
      if (node !== null && state.showToggleSidebar !== node.isMenuBtnOnScreen) {
        dispatch({
          type: SET_SHOW_TOGGLE_SIDEBAR,
          payload: node.isMenuBtnOnScreen,
        });
      }
    },
    [state.showToggleSidebar]
  );

  const {pathname} = useLocation();

  const navigate = useNavigate();

  const {setCurrentUserUid} = useAuth();

  const mounted = useMounted();

  useEffect(() => {
    if (state.toggleSettingMenuBtnChecked) {
      tooltipRef.current.setShowState(false);
    }
  }, [state.toggleSettingMenuBtnChecked]);

  const uncheckSidebarBtn = () => {
    menuBtnCheckbox.current.checked = false;
  };

  useEffect(() => {
    if (state.toggleSidebarBtnChecked && !state.showToggleSidebar) {
      dispatch({
        type: SET_TOGGLE_SIDEBAR_BTN_CHECKED,
        payload: false,
      });
      uncheckSidebarBtn();
    }
  }, [state.toggleSidebarBtnChecked, state.showToggleSidebar]);

  const checkToggleSidebarBtnHandler = (e) => {
    dispatch({
      type: SET_TOGGLE_SIDEBAR_BTN_CHECKED,
      payload: e.target.checked,
    });
  };

  const checkToggleSettingMenuBtnHandler = (e) => {
    dispatch({
      type: SET_TOGGLE_SETTING_MENU_BTN_CHECKED,
      payload: e.target.checked,
    });
  };

  const logOutHandler = async (e) => {
    try {
      e.preventDefault();

      dispatch({type: SET_IS_LOADING, payload: true});

      await signOut(auth);

      setCurrentUserUid(null);

      navigate(PATHS.LOGIN);
    } catch (error) {
      if (mounted.current) {
        dispatch({type: SET_IS_LOADING, payload: false});
      }

      const errorMessage = findLogOutError(error.code);
      alert(errorMessage);
    }
  };

  const navigateHandler = (path) => {
    navigate(path);

    if (state.showToggleSidebar) {
      uncheckSidebarBtn();
    }
  };

  const navigationContent = [
    {
      icon: <HomeIcon />,
      content: 'Home',
      path: '',
    },
    {
      icon: <InboxIcon />,
      content: 'Inbox',
      path: PATHS.INBOX,
    },
    {
      icon: <ExploreIcon />,
      content: 'Explore',
      path: PATHS.EXPLORE,
    },
    {
      icon: <ActivityIcon />,
      content: 'Activity',
      path: PATHS.ACTIVITY,
    },
    {
      icon: <ReelIcon />,
      content: 'Reel',
      path: PATHS.REEL,
    },
    {
      icon: <StreamIcon />,
      content: 'Stream',
      path: PATHS.STREAM,
    },
    {
      icon: <SavedListIcon />,
      content: 'Saved',
      path: PATHS.SAVED,
    },
  ].map((item, index) => (
    <Tooltip key={index} content={item.content} position="right">
      <SidebarButton
        type="text"
        onClick={() => navigateHandler(item.path)}
        disabledHover
        $isActive={`/${item.path}` === pathname}
      >
        {item.icon}
      </SidebarButton>
    </Tooltip>
  ));

  return (
    <StyledHomeLayout>
      <Header ref={menuBtnRef} />
      <FakeCheckbox
        ref={menuBtnCheckbox}
        id="toggle_sidebar_button"
        value={state.toggleSidebarBtnChecked}
        onChange={checkToggleSidebarBtnHandler}
      />
      <SidebarOverlay htmlFor="toggle_sidebar_button" />
      <Sidebar $showToggleSidebar={state.showToggleSidebar}>
        <Nav>
          {navigationContent}
          <SettingButton
            ref={tooltipRef}
            content="Settings"
            position="right"
            trigger={state.toggleSettingMenuBtnChecked ? 'none' : 'hover'}
          >
            <FakeCheckbox
              id="checkbox_setting_menu"
              value={state.toggleSettingMenuBtnChecked}
              onChange={checkToggleSettingMenuBtnHandler}
            />
            <FakeButtonLabel htmlFor="checkbox_setting_menu">
              <SettingIcon />
            </FakeButtonLabel>
            <OverlayLabel htmlFor="checkbox_setting_menu" />
            <SettingMenu>
              <SettingMenuItem>
                <SettingMenuItemLink to={`/${PATHS.PROFILE}`}>
                  <UserIcon />
                  <SettingMenuItemText>Profile</SettingMenuItemText>
                </SettingMenuItemLink>
              </SettingMenuItem>
              <SettingMenuItem>
                <SettingMenuItemLink to={`/${PATHS.SETTINGS}`}>
                  <MenuSettingIcon />
                  <SettingMenuItemText>Settings</SettingMenuItemText>
                </SettingMenuItemLink>
              </SettingMenuItem>
              <SettingMenuItem>
                <SettingMenuItemLink
                  to={`/${PATHS.LOGOUT}`}
                  onClick={logOutHandler}
                >
                  Log Out
                </SettingMenuItemLink>
              </SettingMenuItem>
            </SettingMenu>
          </SettingButton>
        </Nav>
      </Sidebar>
      <MainContent>
        <SavedPostsContextProvider>
          <Outlet />
        </SavedPostsContextProvider>
      </MainContent>
      <UserMenu />
    </StyledHomeLayout>
  );
};

export default HomeLayout;
