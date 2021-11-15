import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import theme from './styled.theme';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import UserMenu from './components/UserMenu';
import GlobalStyles from './components/styled/Global';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 90px auto 360px;
  grid-template-rows: 90px calc(100vh - 90px);
  grid-template-areas:
    'sidebar header userMenu'
    'sidebar mainContent userMenu';
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <Header />
        <Sidebar />
        <MainContent />
        <UserMenu />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
