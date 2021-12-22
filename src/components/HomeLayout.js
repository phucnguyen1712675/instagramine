import {useState, useRef, useEffect, useCallback} from 'react';
import {useNavigate, Outlet, useLocation} from 'react-router-dom';
import Header from './Header';
import {PATHS} from '../constants';
import {useAuth} from '../hooks/useAuth';
import {SavedPostsContextProvider} from '../store/saved-posts-context';
import UserMenu from './UserMenu';
import Tooltip from './Tooltip';
import SettingIcon from './icons/SettingIcon';
import UserIcon from './icons/UserIcon';
import HomeIcon from './icons/HomeIcon';
import InboxIcon from './icons/InboxIcon';
import ExploreIcon from './icons/ExploreIcon';
import ActivityIcon from './icons/ActivityIcon';
import ReelIcon from './icons/ReelIcon';
import StreamIcon from './icons/StreamIcon';
import SavedListIcon from './icons/SavedListIcon';
import MenuSettingIcon from './icons/MenuSettingIcon';
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

const HomeLayout = () => {
  const [toggleSidebarBtnChecked, setToggleSidebarBtnChecked] = useState(false);

  const [toggleSettingMenuBtnChecked, setToggleSettingMenuBtnChecked] =
    useState(false);

  const [showToggleSidebar, setShowToggleSidebar] = useState(false);

  const tooltipRef = useRef(null);

  const menuBtnCheckbox = useRef(null);

  const menuBtnRef = useCallback(
    (node) => {
      if (node !== null && showToggleSidebar !== node.isMenuBtnOnScreen) {
        setShowToggleSidebar(node.isMenuBtnOnScreen);
      }
    },
    [showToggleSidebar]
  );

  const {pathname} = useLocation();

  const navigate = useNavigate();

  const auth = useAuth();

  useEffect(() => {
    if (toggleSettingMenuBtnChecked) {
      tooltipRef.current.setShowState(false);
    }
  }, [toggleSettingMenuBtnChecked]);

  const uncheckSidebarBtn = () => {
    menuBtnCheckbox.current.checked = false;
  };

  useEffect(() => {
    if (toggleSidebarBtnChecked && !showToggleSidebar) {
      setToggleSidebarBtnChecked(false);
      uncheckSidebarBtn();
    }
  }, [toggleSidebarBtnChecked, showToggleSidebar]);

  const checkToggleSidebarBtnHandler = (e) => {
    setToggleSidebarBtnChecked(e.target.checked);
  };

  const checkToggleSettingMenuBtnHandler = (e) => {
    setToggleSettingMenuBtnChecked(e.target.checked);
  };

  const signOutHandler = (e) => {
    e.preventDefault();

    auth.signOut(() => {
      navigate(PATHS.LOGIN);
    });
  };

  const navigateHandler = (path) => {
    navigate(path);

    if (showToggleSidebar) {
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
        value={toggleSidebarBtnChecked}
        onChange={checkToggleSidebarBtnHandler}
      />
      <SidebarOverlay htmlFor="toggle_sidebar_button" />
      <Sidebar $showToggleSidebar={showToggleSidebar}>
        <Nav>
          {navigationContent}
          <SettingButton
            ref={tooltipRef}
            content="Settings"
            position="right"
            trigger={toggleSettingMenuBtnChecked ? 'none' : 'hover'}
          >
            <FakeCheckbox
              id="checkbox_setting_menu"
              value={toggleSettingMenuBtnChecked}
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
                  onClick={signOutHandler}
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
