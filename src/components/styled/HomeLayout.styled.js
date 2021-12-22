import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import {MenuItem, FakeCheckbox, OverlayLabel} from './Lib';
import {circle, hideScrollBarScrolling} from './Mixins';
import Button from '../Button';
import Tooltip from '../Tooltip';
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
  --padding-top-main-content-mobile: calc(var(--height-header) + 15px);
  --padding-bottom-main-content: 15px;
  ${hideScrollBarScrolling}
  height: 100vh;
  overflow-y: auto;
  padding: var(--padding-top-main-content-mobile) 15px
    var(--padding-bottom-main-content);

  @media ${DEVICES.tablet} {
    grid-area: mainContent;
  }

  @media ${DEVICES.laptop} {
    height: unset;
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
