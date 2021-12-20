import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import {MenuItem, FakeCheckbox, OverlayLabel} from './Lib';
import {circle, buttonColorHover, hideScrollBarScrolling} from './Mixins';
import Button from '../Button';
import Tooltip from '../Tooltip';
import LogoIcon from '../icons/LogoIcon';
import LogoTextIcon from '../icons/LogoTextIcon';
import {DEVICES} from '../../constants';

export const StyledHomeLayout = styled.div`
  --height-header: 90px;
  --width-sidebar: 90px;
  --width-user-menu: 360px;

  @media ${DEVICES.laptop} {
    display: grid;
    grid-template-rows: var(--height-header) calc(100vh - var(--height-header));
    grid-template-columns: var(--width-sidebar) 1fr;
    grid-template-areas:
      'sidebar header'
      'sidebar mainContent';
  }

  @media ${DEVICES.laptopL} {
    grid-template-columns: var(--width-sidebar) 1fr var(--width-user-menu);
    grid-template-areas:
      'sidebar header userMenu'
      'sidebar mainContent userMenu';
  }
`;

export const Header = styled.header`
  height: var(--height-header);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0px 10px 40px rgba(231, 237, 243, 0.4);
	z-index: 1;
  ${({theme}) => css`
    background-color: ${theme.colors.bgComponentLightTheme};
    border-bottom: 1px solid ${theme.colors.borderBlue};
  `};

  @media ${DEVICES.laptop} {
    height: unset;
    position: unset;
    top: unset;
    left: unset;
    right: unset;
    grid-area: header;
  }
`;

export const HeaderLeftItem = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;

  @media ${DEVICES.tablet} {
    column-gap: 32px;
  }
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
  padding: 2px;

  @media ${DEVICES.tablet} {
    padding: unset;
  }
`;

export const AppLogoIcon = styled(LogoIcon)`
  font-size: 2.8rem;
`;

export const AppLogoTextIcon = styled(LogoTextIcon)`
  display: none;

  @media ${DEVICES.tablet} {
    display: inline-block;
  }
`;

export const SearchButton = styled(Button)`
  display: inline-block;
  font-size: 1.6rem;
  padding: 12px;
  border-radius: 5px;
	border: unset;
  ${({theme}) => css`
    background-color: ${theme.colors.blueAlphaBackground};

    &:hover {
      outline: 1px solid ${theme.colors.blueAlpha};
    }
  `};

  @media ${DEVICES.tablet} {
    display: none;
  }
`;

export const BackButton = styled(Button)`
	padding: 0.8rem;
	font-size: 2.4rem;
	transition: background-color 0.2s ease-out;

	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

export const SidebarOverlay = styled(OverlayLabel)`
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
`;

export const Sidebar = styled.aside`
  position: fixed;
  width: var(--width-sidebar);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 2;
  ${({theme}) => css`
    background-color: ${theme.colors.bgComponentLightTheme};
    border: 1px solid ${theme.colors.borderDarkBlue};
  `};
  transform: translateX(-100%);

  ${({$showToggleSidebar}) =>
    $showToggleSidebar &&
    css`
      transition: transform 0.2s ease-out;
    `}

  ${FakeCheckbox}:checked ~ & {
    transform: translateX(0);
  }

  @media ${DEVICES.laptop} {
    transform: unset;
    grid-area: sidebar;
    position: relative;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: stretch;
  row-gap: 5.6vh;

  @media ${DEVICES.laptop} {
    row-gap: 4rem;
  }
`;

export const SettingButton = styled(Tooltip)`
  position: absolute;
  bottom: 34px;
`;

export const SettingMenu = styled.ul`
  position: absolute;
  bottom: 50%;
  left: calc(100% + 4px);
  border-radius: 6px;
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  z-index: 2;
  overflow: hidden;
  display: none;

  ${FakeCheckbox}:checked ~ & {
    display: block;
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
  ${hideScrollBarScrolling}
  overflow-y: auto;
  padding: calc(var(--height-header) + 15px) 15px 15px;

  @media ${DEVICES.tablet} {
    grid-area: mainContent;
  }

  @media ${DEVICES.laptop} {
    padding: 25px 20px;
  }
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

export const SidebarButton = styled(Button)`
  color: unset;
  border-radius: unset;
  overflow: unset;
  padding: 0;
  font-size: 3rem;
  ${({$isActive}) => $isActive && ActiveNavigationButton}
`;
