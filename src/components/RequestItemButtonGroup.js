import {useReducer} from 'react';
import PropTypes from 'prop-types';
import {DisabledButtonWrapper} from './styled/Lib';
import {
  StyledRequestItemButtonGroup,
  RequestItemConfirmButton,
  RequestItemFollowButton,
  RequestItemDeleteButton,
} from './styled/RequestItemButtonGroup.styled';
import RequestItemReducer from '../reducers/request-item-button-group-reducer';
import {
  SET_IS_CONFIRM_BUTTON_LOADING,
  SET_IS_DELETE_BUTTON_LOADING,
  SET_IS_FOLLOW_BUTTON_LOADING,
  REQUEST_HAS_BEEN_CONFIRMED,
  USER_HAS_BEEN_FOLLOWED,
} from '../actions/request-item-button-group-actions';

const RequestItemButtonGroup = ({userId, confirmRequest, removeRequest}) => {
  const [state, dispatch] = useReducer(RequestItemReducer, {
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

  const confirmHandler = () => {
    dispatch({type: SET_IS_CONFIRM_BUTTON_LOADING, payload: true});

    setTimeout(() => {
      dispatch({
        type: REQUEST_HAS_BEEN_CONFIRMED,
      });

      confirmRequest(userId);
    }, 1000);
  };

  const deleteHandler = () => {
    dispatch({type: SET_IS_DELETE_BUTTON_LOADING, payload: true});

    setTimeout(() => {
      dispatch({type: SET_IS_DELETE_BUTTON_LOADING, payload: false});

      removeRequest(userId);
    }, 1000);
  };

  const followHandler = () => {
    dispatch({type: SET_IS_FOLLOW_BUTTON_LOADING, payload: true});

    setTimeout(() => {
      dispatch({
        type: USER_HAS_BEEN_FOLLOWED,
      });
    }, 1000);
  };

  const content = !isConfirmed ? (
    <>
      <DisabledButtonWrapper $disabled={isDeleteButtonLoading}>
        <RequestItemConfirmButton
          type="primary"
          loading={isConfirmButtonLoading}
          disabled={isDeleteButtonLoading}
          onClick={confirmHandler}
        >
          Confirm
        </RequestItemConfirmButton>
      </DisabledButtonWrapper>
      <DisabledButtonWrapper $disabled={isConfirmButtonLoading}>
        <RequestItemDeleteButton
          loading={isDeleteButtonLoading}
          disabled={isConfirmButtonLoading}
          onClick={deleteHandler}
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
        onClick={followHandler}
        $isFollowed={isFollowed}
      >
        {isFollowed ? 'Following' : 'Follow'}
      </RequestItemFollowButton>
    </DisabledButtonWrapper>
  );

  return <StyledRequestItemButtonGroup>{content}</StyledRequestItemButtonGroup>;
};

RequestItemButtonGroup.propTypes = {
  userId: PropTypes.number.isRequired,
  confirmRequest: PropTypes.func.isRequired,
  removeRequest: PropTypes.func.isRequired,
};

export default RequestItemButtonGroup;
