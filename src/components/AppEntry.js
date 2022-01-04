import React from 'react';
import {ThemeProvider} from 'styled-components';
import {Outlet} from 'react-router-dom';
import GlobalStyles from './styled/Global';
import {StyledAppEntry} from './styled/AppEntry.styled';
import {useAuth} from '../hooks';
import theme from '../styled.theme';

const AppEntry = () => {
  const auth = useAuth();

  let content = null;

  if (auth.isLoading || (!auth.authUser && auth.isAuth)) {
    content = <StyledAppEntry>Loading...</StyledAppEntry>;
  } else {
    content = <Outlet />;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {content}
    </ThemeProvider>
  );
};

export default AppEntry;
