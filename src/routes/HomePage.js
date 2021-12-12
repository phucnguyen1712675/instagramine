import React from 'react';
import MainContent from '../components/MainContent';
import UserMenu from '../components/UserMenu';
import SearchBar from '../components/SearchBar';
import MainNavigation from '../components/MainNavigation';
import LogoTextIcon from '../components/icons/LogoTextIcon';
import SettingIcon from '../components/icons/SettingIcon';
import UserIcon from '../components/icons/UserIcon';
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
} from '../components/styled/App.styled';

const HomePage = () => {
  return (
    <Layout>
      <Header>
        <AppLogo href="#">
          <AppLogoIcon />
          <LogoTextIcon />
        </AppLogo>
        <SearchBar />
      </Header>
      <Sidebar>
        <Nav>
          <MainNavigation />
          <SettingButton
            checkboxId="checkbox_setting_menu"
            tooltipTitle="Settings"
            tooltipPosition="right"
            icon={<SettingIcon />}
          >
            <SettingMenuItem>
              <SettingMenuItemLink href="#">
                <UserIcon />
                <SettingMenuItemText>Profile</SettingMenuItemText>
              </SettingMenuItemLink>
            </SettingMenuItem>
            <SettingMenuItem>
              <SettingMenuItemLink href="#">
                <MenuSettingIcon />
                <SettingMenuItemText>Settings</SettingMenuItemText>
              </SettingMenuItemLink>
            </SettingMenuItem>
            <SettingMenuItem>
              <SettingMenuItemLink href="#">Log Out</SettingMenuItemLink>
            </SettingMenuItem>
          </SettingButton>
        </Nav>
      </Sidebar>
      <MainContent />
      <UserMenu />
    </Layout>
  );
};

export default HomePage;
