import styled from 'styled-components';
import {StyledDeleteButton} from './DeleteButton.styled';
import DeleteButton from '../DeleteButton';
import FollowButton from '../FollowButton';
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

export const RequestItemFollowButton = styled(FollowButton)`
  ${requestItemButtonStyle}
  width: 63px;
`;

export const RequestItemDeleteButton = styled(DeleteButton)`
  ${StyledDeleteButton} {
    ${requestItemButtonStyle}
    width: 62px;
  }
`;
