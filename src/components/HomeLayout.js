import {useState, useRef, useEffect} from 'react';
import {useNavigate, Outlet, useLocation} from 'react-router-dom';
import {PATHS} from '../constants';
import {useAuth} from '../hooks/useAuth';
import {useOnScreen} from '../hooks/useOnScreen';
import {SavedPostsContextProvider} from '../store/saved-posts-context';
import UserMenu from '../components/UserMenu';
import SearchBar from '../components/SearchBar';
import Tooltip from '../components/Tooltip';
import SettingIcon from '../components/icons/SettingIcon';
import UserIcon from '../components/icons/UserIcon';
import HomeIcon from '../components/icons/HomeIcon';
import InboxIcon from '../components/icons/InboxIcon';
import ExploreIcon from '../components/icons/ExploreIcon';
import ActivityIcon from '../components/icons/ActivityIcon';
import ReelIcon from '../components/icons/ReelIcon';
import StreamIcon from '../components/icons/StreamIcon';
import SavedListIcon from '../components/icons/SavedListIcon';
import MenuSettingIcon from '../components/icons/MenuSettingIcon';
import MenuIcon from '../components/icons/MenuIcon';
import SearchIcon from '../components/icons/SearchIcon';
import {
  FakeCheckbox,
  FakeButtonLabel,
  OverlayLabel,
} from '../components/styled/Lib';
import {
  StyledHomeLayout,
  Header,
  HeaderLeftItem,
  MenuButton,
  AppLogo,
  AppLogoIcon,
  AppLogoTextIcon,
  SearchButton,
  SidebarOverlay,
  Sidebar,
  Nav,
  SettingButton,
  SettingMenu,
  SettingMenuItem,
  SettingMenuItemLink,
  SettingMenuItemText,
  HomeLayoutMainContent,
  SidebarButton,
} from '../components/styled/HomeLayout.styled';

const HomeLayout = () => {
  const [checked, setChecked] = useState(false);

  const menuBtnRef = useRef(null);

  const tooltipRef = useRef(null);

  const menuBtnCheckbox = useRef(null);

  const isMenuBtnOnScreen = useOnScreen({ref: menuBtnRef});

  const {pathname} = useLocation();

  const navigate = useNavigate();

  const auth = useAuth();

  useEffect(() => {
    if (checked) {
      tooltipRef.current.setShowState(false);
    }
  }, [checked]);

  const checkHandler = (e) => setChecked(e.target.checked);

  const signOutHandler = (e) => {
    e.preventDefault();

    auth.signOut(() => {
      navigate(PATHS.LOGIN);
    });
  };

  const navigateHandler = (path) => {
    navigate(path);

    if (isMenuBtnOnScreen) {
      menuBtnCheckbox.current.checked = false;
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
      <Header>
        <HeaderLeftItem>
          <MenuButton ref={menuBtnRef} htmlFor="header_menu_button">
            <MenuIcon />
          </MenuButton>
          <AppLogo to="/">
            <AppLogoIcon />
            <AppLogoTextIcon />
          </AppLogo>
        </HeaderLeftItem>
        <SearchButton to={`/${PATHS.SEARCH}`}>
          <SearchIcon />
        </SearchButton>
        <SearchBar />
      </Header>
      <FakeCheckbox ref={menuBtnCheckbox} id="header_menu_button" />
      <SidebarOverlay htmlFor="header_menu_button" />
      <Sidebar $showToggleSidebar={isMenuBtnOnScreen}>
        <Nav>
          {navigationContent}
          <SettingButton
            ref={tooltipRef}
            content="Settings"
            position="right"
            trigger={checked ? 'none' : 'hover'}
          >
            <FakeCheckbox
              id="checkbox_setting_menu"
              defaultChecked={false}
              value={checked}
              onChange={checkHandler}
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
      <HomeLayoutMainContent>
        <SavedPostsContextProvider>
          <Outlet />
        </SavedPostsContextProvider>
      </HomeLayoutMainContent>
      <UserMenu />
    </StyledHomeLayout>
  );
};

export default HomeLayout;
