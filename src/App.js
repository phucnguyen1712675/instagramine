import React from 'react';
import {ThemeProvider} from 'styled-components';
import theme from './styled.theme';
import {GlobalContextProvider} from './store/global-context';
import GlobalStyles from './components/styled/Global';
import MainContent from './components/MainContent';
import UserMenu from './components/UserMenu';
import SearchBar from './components/SearchBar';
import MainNavigation from './components/MainNavigation';
import SettingButtonWrapper from './components/SettingButtonWrapper';
import LogoTextIcon from './components/icons/LogoTextIcon';
import {
  Layout,
  Header,
  AppLogo,
  AppLogoIcon,
  Sidebar,
  Nav,
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
            <SettingButtonWrapper />
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
