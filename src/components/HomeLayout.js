import {useReducer, useRef, useEffect, useCallback} from 'react';
import {useNavigate, Outlet, useLocation} from 'react-router-dom';
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
import {ROUTE_PATHS} from '../constants';
import {useAuth, useMounted} from '../hooks';
import {homeLayoutReducer} from '../reducers';
import {SavedPostsContextProvider} from '../store/savedPostsContext';
import {logOut} from '../services/firestoreAuth';
import {
  SET_TOGGLE_SIDEBAR_BTN_CHECKED,
  SET_TOGGLE_SETTING_MENU_BTN_CHECKED,
  SET_SHOW_TOGGLE_SIDEBAR,
} from '../actions/homeLayoutActions';

const HomeLayout = () => {
  const [state, dispatch] = useReducer(homeLayoutReducer, {
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

  const auth = useAuth();

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
    e.preventDefault();

    auth.setIsLoading(true);

    const isSuccess = await logOut();

    if (isSuccess) {
      auth.setAuthStatus(false);
      navigate(ROUTE_PATHS.LOGIN);
    } else if (mounted.current) {
      auth.setIsLoading(false);
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
      path: ROUTE_PATHS.INBOX,
    },
    {
      icon: <ExploreIcon />,
      content: 'Explore',
      path: ROUTE_PATHS.EXPLORE,
    },
    {
      icon: <ActivityIcon />,
      content: 'Activity',
      path: ROUTE_PATHS.ACTIVITY,
    },
    {
      icon: <ReelIcon />,
      content: 'Reel',
      path: ROUTE_PATHS.REEL,
    },
    {
      icon: <StreamIcon />,
      content: 'Stream',
      path: ROUTE_PATHS.STREAM,
    },
    {
      icon: <SavedListIcon />,
      content: 'Saved',
      path: ROUTE_PATHS.SAVED,
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
                <SettingMenuItemLink to={`/${ROUTE_PATHS.PROFILE}`}>
                  <UserIcon />
                  <SettingMenuItemText>Profile</SettingMenuItemText>
                </SettingMenuItemLink>
              </SettingMenuItem>
              <SettingMenuItem>
                <SettingMenuItemLink to={`/${ROUTE_PATHS.SETTINGS}`}>
                  <MenuSettingIcon />
                  <SettingMenuItemText>Settings</SettingMenuItemText>
                </SettingMenuItemLink>
              </SettingMenuItem>
              <SettingMenuItem>
                <SettingMenuItemLink
                  to={`/${ROUTE_PATHS.LOGOUT}`}
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
