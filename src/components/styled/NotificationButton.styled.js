import styled, {css} from 'styled-components';
import {
  Dot,
  CircleImgWrapper,
  FakeCheckbox,
  MenuItem,
  OverlayLabel,
} from './Lib';
import {hideScrollBarScrolling} from './Mixins';
import {TextContent} from './UserCard.styled';
import Tooltip from '../Tooltip';
import UserCard from '../UserCard';
import Spinner from '../Spinner';

export const StyledNotificationButton = styled(Tooltip)`
  --distance: 24px;
  position: absolute;
  top: var(--padding-vertical);
  right: var(--padding-vertical);
`;

export const NotificationOverlayLabel = styled(OverlayLabel)`
  z-index: 2;
`;

const flexCenter = css`
  align-items: center;
  justify-content: center;
`;

export const NotificationPopup = styled.div`
  width: 500px;
  height: 362px;
  border-radius: 6px;
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  z-index: 2;
  position: absolute;
  top: 0;
  right: calc(100% + 4px);
  overflow-y: auto;
  ${hideScrollBarScrolling}
  ${({$shouldCenterChild}) => $shouldCenterChild && flexCenter}
  display: none;
  flex-direction: column;

  ${FakeCheckbox}:checked ~ & {
    display: flex;
  }
`;

export const NotificationMenu = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const NotificationMenuSpinner = styled(Spinner)`
  padding: 2.7rem;
`;

export const AllRequestsItem = styled(MenuItem)`
  padding: 12px 16px;
`;

export const AllRequestsItemContent = styled(UserCard)`
  ${TextContent} {
    --margin-left-info-content: 16px;
  }
`;

export const NotificationMenuItemBottomText = styled.p`
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
  align-self: center;
`;

export const NotificationMenuItemAvatarGroupWrapper = styled(CircleImgWrapper)`
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

export const NoNotificationsText = styled.p`
  font-size: 1.4rem;
`;

export const RequestItem = styled(MenuItem)`
  --padding-horizontal: 16px;
  padding: 12px var(--padding-horizontal);
  position: relative;

  &:not(:last-child)::after {
    content: '';
    border-bottom: 1px solid ${({theme}) => theme.colors.borderGray};
    height: 0;
    position: absolute;
    right: var(--padding-horizontal);
    bottom: 0;
    left: 64px;
  }
`;

export const RequestItemContent = styled(UserCard)`
  padding: 0;

  ${TextContent} {
    --margin-left-info-content: 12px;
  }
`;
