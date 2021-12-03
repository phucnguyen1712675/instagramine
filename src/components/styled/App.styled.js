import styled from 'styled-components';
import LogoIcon from '../icons/LogoIcon';

export const Layout = styled.div`
  --width-user-menu: 360px;
  display: grid;
  grid-template-columns: 90px auto var(--width-user-menu);
  grid-template-rows: 90px calc(100vh - 90px);
  grid-template-areas:
    'sidebar header userMenu'
    'sidebar mainContent userMenu';
`;

export const Header = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  padding: 0 20px;
  border-bottom: 1px solid ${({theme}) => theme.colors.primaryBorder};
  box-shadow: 0px 10px 40px rgba(231, 237, 243, 0.4);
`;

export const AppLogo = styled.a`
  display: flex;
  align-items: center;
  column-gap: 8px;
  cursor: pointer;
  outline: none;
`;

export const AppLogoIcon = styled(LogoIcon)`
  font-size: 2.8rem;
`;

export const Sidebar = styled.aside`
  grid-area: sidebar;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  position: relative;
  border: 1px solid ${({theme}) => theme.colors.primaryBorderDark};
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: stretch;
  row-gap: 4rem;
`;

