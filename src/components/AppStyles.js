import React from 'react';
import {ThemeProvider} from 'styled-components';
import {Outlet} from 'react-router-dom';
import theme from '../styled.theme';
import GlobalStyles from './styled/Global';

const AppStyles = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Outlet />
    </ThemeProvider>
  );
};

export default AppStyles;
