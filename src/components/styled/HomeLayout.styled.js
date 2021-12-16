import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import {MenuItem} from './Lib';
import {hideScrollBarScrolling, circle, buttonColorHover} from './Mixins';
import Button from '../Button';
import OverlayMenuIconButtonWithTooltip from '../OverlayMenuIconButtonWithTooltip';
import {Menu} from './OverlayMenuIconButtonWithTooltip.styled';
import LogoIcon from '../icons/LogoIcon';
import {DEVICES} from '../../constants';

export const Layout = styled.div`
  --width-user-menu: 360px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 90px calc(100vh - 90px);
  grid-template-areas:
    'header'
    'mainContent';

  @media ${DEVICES.laptop} {
    grid-template-columns: 90px 1fr;
    grid-template-areas:
      'sidebar header'
      'sidebar mainContent';
  }

  @media ${DEVICES.laptopL} {
    grid-template-columns: 90px 1fr var(--width-user-menu);
    grid-template-areas:
      'sidebar header userMenu'
      'sidebar mainContent userMenu';
  }
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
    border-bottom: 1px solid ${theme.colors.borderBlue};
  `};
`;

export const HeaderLeftItem = styled.div`
  display: flex;
  align-items: center;
  column-gap: 32px;
`;

export const MenuButton = styled.label`
  cursor: pointer;
  padding: 8px;
  border-radius: 5px;
  ${({theme}) => css`
    color: ${theme.colors.secondary};
    border: 1px solid ${theme.colors.secondary};
  `};
  ${buttonColorHover};
  display: flex;

  @media ${DEVICES.laptop} {
    display: none;
  }
`;

export const AppLogo = styled(Link)`
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
    border: 1px solid ${theme.colors.borderDarkBlue};
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

export const SettingMenuItem = styled(MenuItem)`
  padding: 14px 20px;

  &:last-child {
    border-top: 1px solid ${({theme}) => theme.colors.borderGray};
  }
`;

export const SettingMenuItemLink = styled(Link)`
  display: flex;
  align-items: center;
`;

export const SettingMenuItemText = styled.span`
  margin-left: 12px;
`;

export const MainContent = styled.main`
  grid-area: mainContent;
  padding: 25px 20px;
  overflow-y: auto;
  ${hideScrollBarScrolling}
`;

const ActiveNavigationButton = css`
  position: relative;

  &:after {
    --size-dot: 5px;
    content: '';
    ${circle({w: 'var(--size-dot)'})};
    background-color: #f31c3f;
    position: absolute;
    top: calc(100% + 5px);
  }
`;

export const NavigationButton = styled(Button)`
  color: unset;
  border-radius: unset;
  overflow: unset;
  padding: 0;
  font-size: 3rem;
  ${({$isActive}) => $isActive && ActiveNavigationButton}
`;
