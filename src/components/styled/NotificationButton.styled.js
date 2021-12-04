import styled from 'styled-components';
import {Dot, CircleImgWrapper, FakeCheckbox} from './Lib';
import {Menu} from './OverlayMenuIconButtonWithTooltip.styled';
import {TextContent} from './UserCard.styled';
import OverlayMenuIconButtonWithTooltip from '../OverlayMenuIconButtonWithTooltip';
import UserCard from '../UserCard';

const flexCenter = `
	align-items: center;
	justify-content: center;
`;

export const StyledNotificationButton = styled(
  OverlayMenuIconButtonWithTooltip
)`
  --distance: 24px;
  position: absolute;
  top: var(--padding-vertical);
  right: var(--padding-vertical);

  ${Menu} {
    top: 0;
    right: calc(100% + 4px);
    width: 500px;
    height: 362px;
    ${({isLoading}) => isLoading && flexCenter}
    ${({isEmpty}) => isEmpty && flexCenter}
  }

  ${FakeCheckbox}:checked ~ ${Menu} {
    display: flex;
    flex-direction: column;
  }
`;

export const NotificationMenuItem = styled.li`
  padding: 12px 16px;
  font-size: 1.4rem;

  &:hover {
    background-color: ${({theme}) => theme.colors.menuItemHover};
  }
`;

export const NotificationMenuItemLink = styled.a`
  display: flex;
  align-items: center;
`;

export const NotificationMenuItemContent = styled(UserCard)`
  width: 100%;

  ${TextContent} {
    --margin-left-info-content: 16px;
  }
`;

export const NotificationMenuItemRequestText = styled.p`
  font-size: 1.2rem;
`;

export const NotificationMenuItemOption = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  font-size: 1.2rem;
`;

export const NotificationMenuItemDot = styled(Dot)`
  --size: 8px;
  background-color: ${({theme}) => theme.colors.link};
  margin: 12px;
`;

export const NotificationMenuItemAvatarGroup = styled.div`
  --size: 4.2rem;
  position: relative;
  width: var(--size);
  height: var(--size);
  flex: 0 0 auto;
`;

export const NotificationMenuItemAvatarWrapper = styled(CircleImgWrapper)`
  --size: 3.2rem;
  position: absolute;

  &:first-child {
    top: 0;
    left: 0;
  }

  &:last-child {
    right: 0;
    bottom: 0;
  }
`;

export const NotificationMenuItemAvatar = styled.img``;

export const NotificationMenuItemText = styled.span`
  margin-left: 12px;
`;
