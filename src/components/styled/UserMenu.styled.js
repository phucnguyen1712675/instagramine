import styled from 'styled-components';
import {HoverScaleButton} from './Lib';
import {flexColumn} from './Mixins';

export const StyledUserMenu = styled.div`
  grid-area: userMenu;
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  ${flexColumn}
  border-left: 1px solid ${({theme}) => theme.colors.primaryBorderDark};
  position: relative;
`;

export const NotificationButton = styled(HoverScaleButton)`
  --distance: 24px;
  position: absolute;
  top: var(--distance);
  right: var(--distance);
  padding: 8px;
`;
