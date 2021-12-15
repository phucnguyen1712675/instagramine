import React from 'react';
import {useNavigate, Outlet, useLocation} from 'react-router-dom';
import {PATHS} from '../constants';
import {useAuth} from '../hooks/useAuth';
import UserMenu from '../components/UserMenu';
import SearchBar from '../components/SearchBar';
import Tooltip from '../components/Tooltip';
import LogoTextIcon from '../components/icons/LogoTextIcon';
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
import {
  Layout,
  Header,
  AppLogo,
  AppLogoIcon,
  Sidebar,
  Nav,
  SettingButton,
  SettingMenuItem,
  SettingMenuItemLink,
  SettingMenuItemText,
  MainContent,
  NavigationButton,
} from '../components/styled/HomeLayout.styled';

const HomeLayout = () => {
  const {pathname} = useLocation();

  const navigate = useNavigate();

  const auth = useAuth();

  const signOutHandler = (e) => {
    e.preventDefault();

    auth.signOut(() => {
      navigate(PATHS.LOGIN);
    });
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
  ].map((navItem, index) => (
    <Tooltip key={index} content={navItem.content} position="right">
      <NavigationButton
        type="text"
        onClick={() => navigate(navItem.path)}
        disabledHover
        $isActive={`/${navItem.path}` === pathname}
      >
        {navItem.icon}
      </NavigationButton>
    </Tooltip>
  ));

  const {PROFILE, SETTINGS, LOGOUT} = PATHS;

  return (
    <Layout>
      <Header>
        <AppLogo to="/">
          <AppLogoIcon />
          <LogoTextIcon />
        </AppLogo>
        <SearchBar />
      </Header>
      <Sidebar>
        <Nav>
          {navigationContent}
          <SettingButton
            checkboxId="checkbox_setting_menu"
            tooltipTitle="Settings"
            tooltipPosition="right"
            icon={<SettingIcon />}
          >
            <SettingMenuItem>
              <SettingMenuItemLink to={`/${PROFILE}`}>
                <UserIcon />
                <SettingMenuItemText>Profile</SettingMenuItemText>
              </SettingMenuItemLink>
            </SettingMenuItem>
            <SettingMenuItem>
              <SettingMenuItemLink to={`/${SETTINGS}`}>
                <MenuSettingIcon />
                <SettingMenuItemText>Settings</SettingMenuItemText>
              </SettingMenuItemLink>
            </SettingMenuItem>
            <SettingMenuItem>
              <SettingMenuItemLink to={`/${LOGOUT}`} onClick={signOutHandler}>
                Log Out
              </SettingMenuItemLink>
            </SettingMenuItem>
          </SettingButton>
        </Nav>
      </Sidebar>
      <MainContent>
        <Outlet />
      </MainContent>
      <UserMenu />
    </Layout>
  );
};

export default HomeLayout;
