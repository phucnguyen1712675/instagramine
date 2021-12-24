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
      {!state.isConfirmed ? (
        <>
          <DisabledButtonWrapper $disabled={state.isDeleteButtonLoading}>
            <RequestItemConfirmButton
              type="primary"
              loading={state.isConfirmButtonLoading}
              disabled={state.isDeleteButtonLoading}
              onClick={confirmRequestHandler}
            >
              Confirm
            </RequestItemConfirmButton>
          </DisabledButtonWrapper>
          <DisabledButtonWrapper $disabled={state.isConfirmButtonLoading}>
            <RequestItemDeleteButton
              loading={state.isDeleteButtonLoading}
              disabled={state.isConfirmButtonLoading}
              onClick={removeRequestHandler}
            >
              Delete
            </RequestItemDeleteButton>
          </DisabledButtonWrapper>
        </>
      ) : (
        <DisabledButtonWrapper $disabled={state.isFollowButtonLoading}>
          <RequestItemFollowButton
            type={!state.isFollowed ? 'primary' : 'default'}
            loading={state.isFollowButtonLoading}
            disabled={state.isFollowButtonLoading}
            onClick={followUserHandler}
            $isFollowed={state.isFollowed}
          >
            {state.isFollowed ? 'Following' : 'Follow'}
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
