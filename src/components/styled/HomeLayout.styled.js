import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import {MenuItem, FakeCheckbox, OverlayLabel, Dot} from './Lib';
import {circle, hideScrollBarScrolling, hoverUnderline} from './Mixins';
import Button from '../Button';
import Avatar from '../Avatar';
import ReadMore from '../ReadMore';
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
    z-index: 0;
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

const UserMenuStyle = ({theme}) => css`
  background-color: ${theme.colors.bgComponentLightTheme};
  border-left: var(--width-border) solid ${theme.colors.borderDarkBlue};
`;

export const UserMenu = styled.div`
  --width-border: 1px;
  --padding-horizontal: 30px;
  --padding-vertical: 36px;
  position: relative;
  padding-top: var(--padding-vertical);
  padding-right: var(--padding-horizontal);
  padding-bottom: var(--padding-vertical);
  padding-left: calc(var(--padding-horizontal) - var(--width-border));
  ${UserMenuStyle}
  display: none;
  flex-direction: column;

  @media ${DEVICES.laptopL} {
    grid-area: userMenu;
    display: flex;
  }
`;

export const UserMenuTopContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

export const UserMenuMiddleContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const UserMenuBottomContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 240px;
`;

export const ThumbnailContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  line-height: 1.4;
`;

export const ThumbnailContentAvatar = styled(Avatar)`
  --size: 8rem;
  cursor: pointer;
`;

export const ThumbnailContentUserName = styled.h2`
  margin-top: 16px;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.4;
`;

export const ThumbnailContentJobDescription = styled.h5`
  color: ${({theme}) => theme.colors.secondary};
  font-size: 1.4rem;
  font-weight: 500;
`;

export const EditButtonWrapper = styled(Tooltip)`
  margin-top: 12px;
`;

export const EditButton = styled(Button)`
  padding: 7px 27px;
  ${({theme}) => `
			background-color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
		`}
`;

export const StatisticalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  padding: 32px 0 16px;
`;

export const StatisticalContentInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StatisticalContentInnerDot = styled(Dot)`
  color: #6d6c76;
`;

export const StatisticItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 2px;
  line-height: 1.4;
  width: 60px;
`;

export const StatisticNumber = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
`;

export const StatisticName = styled.div`
  color: ${({theme}) => theme.colors.secondary};
  font-size: 1.2rem;
`;

export const BioContentContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
  padding: 15px 0;
`;

export const BioContent = styled(ReadMore)`
  color: ${({theme}) => theme.colors.secondary};
  margin-top: 12px;
  line-height: 1.9rem;
`;

export const BioContentSocialLinks = styled.div`
  margin-top: 8px;
`;

export const BioContentSocialLink = styled.a`
  color: ${({theme}) => theme.colors.link};
  ${hoverUnderline}
`;

export const BioContentNoSocialLinks = styled.div`
  margin-top: 8px;
`;

const gradientBackground = css`
  background: linear-gradient(
    99.27deg,
    #ff1cf6 -35.3%,
    rgba(253, 96, 28, 0.74) 66.33%,
    #de2442 138.45%
  );
`;

export const CreatePostButton = styled(Button)`
  padding: 15px 0;
  line-height: 1.3;
  position: relative;
  /* z-index: 1; */
  font-weight: 800;
  border: unset;
  ${gradientBackground}/* &:after {
    --height-blur: 40px;
    content: '';
    position: absolute;
    top: 23px;
    width: calc(var(--width-user-menu) - (var(--padding-vertical) + 28px) * 2);
    height: var(--height-blur);
    filter: blur(var(--height-blur));
    ${gradientBackground}
    z-index: -1;
  } */
`;
