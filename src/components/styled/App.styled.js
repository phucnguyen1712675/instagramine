import styled from 'styled-components';

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 90px auto ${({theme}) => theme.userMenuWidth};
  grid-template-rows: 90px calc(100vh - 90px);
  grid-template-areas:
    'sidebar header userMenu'
    'sidebar mainContent userMenu';
`;
