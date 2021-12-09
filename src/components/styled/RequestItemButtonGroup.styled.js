import styled from 'styled-components';
import DeleteButton from '../DeleteButton';
import FollowButton from '../FollowButton';
import Button from '../Button';

export const StyledRequestItemButtonGroup = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

const requestItemButtonStyle = `
	padding: 5px 9px;
`;

export const RequestItemConfirmButton = styled(Button)`
  && {
    ${requestItemButtonStyle}
  }
`;

export const RequestItemFollowButton = styled(FollowButton)`
  && {
    ${requestItemButtonStyle}
  }
`;

export const RequestItemDeleteButton = styled(DeleteButton)`
  ${Button} {
    ${requestItemButtonStyle}
  }
`;
