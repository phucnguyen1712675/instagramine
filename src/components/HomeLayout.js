import {useState, useRef, useEffect} from 'react';
import {useNavigate, Outlet, useLocation} from 'react-router-dom';
import {PATHS, SIZES} from '../constants';
import {useAuth} from '../hooks/useAuth';
import {useWindowSize} from '../hooks/useWindowSize';
import {useOnScreen} from '../hooks/useOnScreen';
import {SavedPostsContextProvider} from '../store/saved-posts-context';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';
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
import MenuIcon from './icons/MenuIcon';
import SearchIcon from './icons/SearchIcon';
import LeftArrow from './icons/LeftArrow';
import {FakeCheckbox, FakeButtonLabel, OverlayLabel} from './styled/Lib';
import {
  StyledHomeLayout,
  Header,
  HeaderLeftItem,
  MenuButton,
  AppLogo,
  AppLogoIcon,
  AppLogoTextIcon,
  SearchButton,
  BackButton,
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
  const [checked, setChecked] = useState(false);

  const [isSearching, setIsSearching] = useState(false);

  const menuBtnRef = useRef(null);

  const tooltipRef = useRef(null);

  const menuBtnCheckbox = useRef(null);

  const isMenuBtnOnScreen = useOnScreen({ref: menuBtnRef});

  const {pathname} = useLocation();

  const navigate = useNavigate();

  const auth = useAuth();

  const {width: windowWidth} = useWindowSize();

  useEffect(() => {
    if (checked) {
      tooltipRef.current.setShowState(false);
    }
  }, [checked]);

  const {tablet} = SIZES;
  const tabletSize = +tablet.replace('px', '');
  const isOnMobile = windowWidth < tabletSize;

  useEffect(() => {
    if (!isOnMobile && isSearching) {
      setIsSearching(false);
    }
  }, [isOnMobile, isSearching]);

  const checkHandler = (e) => {
    setChecked(e.target.checked);
  };

  const signOutHandler = (e) => {
    e.preventDefault();

    auth.signOut(() => {
      navigate(PATHS.LOGIN);
    });
  };

  const toggleToSearchHeader = () => {
    setIsSearching(true);
  };

  const toggleToMainHeader = () => {
    setIsSearching(false);
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
      <Header $isSearchHeader={isOnMobile && isSearching}>
        {!isSearching ? (
          <>
            <HeaderLeftItem>
              <MenuButton ref={menuBtnRef} htmlFor="header_menu_button">
                <MenuIcon />
              </MenuButton>
              <AppLogo to="/">
                <AppLogoIcon />
                <AppLogoTextIcon />
              </AppLogo>
            </HeaderLeftItem>
            <SearchButton onClick={toggleToSearchHeader}>
              <SearchIcon />
            </SearchButton>
            {!isOnMobile && <SearchBar />}
          </>
        ) : (
          <>
            <BackButton type="text" onClick={toggleToMainHeader} disabledHover>
              <LeftArrow />
            </BackButton>
            <SearchBar />
          </>
        )}
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
