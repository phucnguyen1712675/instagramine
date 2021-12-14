import styled, {css} from 'styled-components';
import {Dot, CircleImgWrapper, FakeCheckbox, MenuItem} from './Lib';
import {hideScrollBarScrolling} from './Mixins';
import {Menu} from './OverlayMenuIconButtonWithTooltip.styled';
import {TextContent} from './UserCard.styled';
import OverlayMenuIconButtonWithTooltip from '../OverlayMenuIconButtonWithTooltip';
import UserCard from '../UserCard';
import Spinner from '../Spinner';

const flexCenter = css`
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
    ${({$isLoading}) => $isLoading && flexCenter}
    ${({$isEmpty}) => $isEmpty && flexCenter}
		overflow-y: auto;
    ${hideScrollBarScrolling}
  }

  ${FakeCheckbox}:checked ~ ${Menu} {
    display: flex;
    flex-direction: column;
  }
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
