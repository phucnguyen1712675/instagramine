import React from 'react';
import {ThemeProvider} from 'styled-components';
import theme from './styled.theme';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import UserMenu from './components/UserMenu';
import GlobalStyles from './components/styled/Global';
import {Layout} from './components/styled/App.styled';
import {GlobalContextProvider} from './store/global-context';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <Header />
        <Sidebar />
        <MainContent />
        <GlobalContextProvider>
          <UserMenu />
        </GlobalContextProvider>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
