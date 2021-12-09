import {useState} from 'react';
import {
  StyledRequestItemButtonGroup,
  RequestItemConfirmButton,
  RequestItemFollowButton,
  RequestItemDeleteButton,
} from './styled/RequestItemButtonGroup.styled';

const RequestItemButtonGroup = () => {
  // eslint-disable-next-line no-unused-vars
  const [isConfirmed, setIsConfirmed] = useState(true);

  const content = !isConfirmed ? (
    <>
      <RequestItemConfirmButton type="primary">
        Confirm
      </RequestItemConfirmButton>
      <RequestItemDeleteButton>Delete</RequestItemDeleteButton>
    </>
  ) : (
    <RequestItemFollowButton>Follow</RequestItemFollowButton>
  );

  return <StyledRequestItemButtonGroup>{content}</StyledRequestItemButtonGroup>;
};

export default RequestItemButtonGroup;
