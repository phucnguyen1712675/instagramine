import styled from 'styled-components';
import {buttonColorHover} from './Mixins';
import Button from '../Button';

export const StyledRequestItemButtonGroup = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

const requestItemButtonStyle = `
	padding: 0;
	height: 30px;
`;

export const RequestItemConfirmButton = styled(Button)`
  ${requestItemButtonStyle}
  width: 69.5px;
`;

export const RequestItemFollowButton = styled(Button)`
  ${requestItemButtonStyle}
  width: ${({$isFollowed}) => ($isFollowed ? '82px' : '63px')};
`;

export const RequestItemDeleteButton = styled(Button)`
  ${requestItemButtonStyle}
  ${({theme, loading}) =>
    !loading && buttonColorHover({color: theme.colors.danger})}
  width: 62px;
`;
