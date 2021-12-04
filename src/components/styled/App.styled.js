import styled, {css} from 'styled-components';
import OverlayMenuIconButtonWithTooltip from '../OverlayMenuIconButtonWithTooltip';
import {Menu} from './OverlayMenuIconButtonWithTooltip.styled';
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
  padding: 0 20px;
  box-shadow: 0px 10px 40px rgba(231, 237, 243, 0.4);
  ${({theme}) => css`
    background-color: ${theme.colors.bgComponentLightTheme};
    border-bottom: 1px solid ${theme.colors.primaryBorder};
  `};
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
  position: relative;
  ${({theme}) => css`
    background-color: ${theme.colors.bgComponentLightTheme};
    border: 1px solid ${theme.colors.primaryBorderDark};
  `};
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: stretch;
  row-gap: 4rem;
`;

export const SettingButton = styled(OverlayMenuIconButtonWithTooltip)`
  position: absolute;
  bottom: 34px;

  ${Menu} {
    bottom: 50%;
    left: calc(100% + 4px);
  }
`;

export const SettingMenuItem = styled.li`
  padding: 14px 20px;
  font-size: 1.4rem;

  &:hover {
    background-color: ${({theme}) => theme.colors.menuItemHover};
  }

  &:last-child {
    border-top: 1px solid #dbdbdb;
  }
`;

export const SettingMenuItemLink = styled.a`
  display: flex;
  align-items: center;
`;

export const SettingMenuItemText = styled.span`
  margin-left: 12px;
`;
