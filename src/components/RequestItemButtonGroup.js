import {useReducer} from 'react';
import PropTypes from 'prop-types';
import {DisabledButtonWrapper} from './styled/Lib';
import {
  StyledRequestItemButtonGroup,
  RequestItemConfirmButton,
  RequestItemFollowButton,
  RequestItemDeleteButton,
} from './styled/RequestItemButtonGroup.styled';
import {requestItemButtonReducer} from '../reducers';
import {
  SET_IS_CONFIRM_BUTTON_LOADING,
  SET_IS_DELETE_BUTTON_LOADING,
  SET_IS_FOLLOW_BUTTON_LOADING,
  REQUEST_HAS_BEEN_CONFIRMED,
  USER_HAS_BEEN_FOLLOWED,
} from '../actions/requestItemButtonGroupActions';

const RequestItemButtonGroup = ({userId, confirmRequest, removeRequest}) => {
  const [state, dispatch] = useReducer(requestItemButtonReducer, {
    isConfirmed: false,
    isFollowed: false,
    isConfirmButtonLoading: false,
    isDeleteButtonLoading: false,
    isFollowButtonLoading: false,
  });

  const {
    isConfirmed,
    isFollowed,
    isConfirmButtonLoading,
    isDeleteButtonLoading,
    isFollowButtonLoading,
  } = state;

  const confirmRequestHandler = () => {
    dispatch({type: SET_IS_CONFIRM_BUTTON_LOADING, payload: true});

    setTimeout(() => {
      dispatch({
        type: REQUEST_HAS_BEEN_CONFIRMED,
      });

      confirmRequest(userId);
    }, 1000);
  };

  const removeRequestHandler = () => {
    dispatch({type: SET_IS_DELETE_BUTTON_LOADING, payload: true});

    setTimeout(() => {
      dispatch({type: SET_IS_DELETE_BUTTON_LOADING, payload: false});

      removeRequest(userId);
    }, 1000);
  };

  const followUserHandler = () => {
    dispatch({type: SET_IS_FOLLOW_BUTTON_LOADING, payload: true});

    setTimeout(() => {
      dispatch({
        type: USER_HAS_BEEN_FOLLOWED,
      });
    }, 1000);
  };

  return (
    <StyledRequestItemButtonGroup>
      {!isConfirmed ? (
        <>
          <DisabledButtonWrapper $disabled={isDeleteButtonLoading}>
            <RequestItemConfirmButton
              type="primary"
              loading={isConfirmButtonLoading}
              disabled={isDeleteButtonLoading}
              onClick={confirmRequestHandler}
            >
              Confirm
            </RequestItemConfirmButton>
          </DisabledButtonWrapper>
          <DisabledButtonWrapper $disabled={isConfirmButtonLoading}>
            <RequestItemDeleteButton
              loading={isDeleteButtonLoading}
              disabled={isConfirmButtonLoading}
              onClick={removeRequestHandler}
            >
              Delete
            </RequestItemDeleteButton>
          </DisabledButtonWrapper>
        </>
      ) : (
        <DisabledButtonWrapper $disabled={isFollowButtonLoading}>
          <RequestItemFollowButton
            type={!isFollowed ? 'primary' : 'default'}
            loading={isFollowButtonLoading}
            disabled={isFollowButtonLoading}
            onClick={followUserHandler}
            $isFollowed={isFollowed}
          >
            {isFollowed ? 'Following' : 'Follow'}
          </RequestItemFollowButton>
        </DisabledButtonWrapper>
      )}
    </StyledRequestItemButtonGroup>
  );
};

RequestItemButtonGroup.propTypes = {
  userId: PropTypes.number.isRequired,
  confirmRequest: PropTypes.func.isRequired,
  removeRequest: PropTypes.func.isRequired,
};

export default RequestItemButtonGroup;
