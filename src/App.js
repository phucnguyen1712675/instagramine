import React from 'react';
import {ThemeProvider} from 'styled-components';
import theme from './styled.theme';
import {GlobalContextProvider} from './store/global-context';
import GlobalStyles from './components/styled/Global';
import MainContent from './components/MainContent';
import UserMenu from './components/UserMenu';
import SearchBar from './components/SearchBar';
import MainNavigation from './components/MainNavigation';
import LogoTextIcon from './components/icons/LogoTextIcon';
import SettingIcon from './components/icons/SettingIcon';
import UserIcon from './components/icons/UserIcon';
import MenuSettingIcon from './components/icons/MenuSettingIcon';
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
} from './components/styled/App.styled';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
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
        <GlobalContextProvider>
          <UserMenu />
        </GlobalContextProvider>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
