import {useReducer, useRef, useContext} from 'react';
import PropTypes from 'prop-types';
import {DisabledButtonWrapper} from './styled/Lib';
import {
  StyledRequestItemButtonGroup,
  RequestItemConfirmButton,
  RequestItemFollowButton,
  RequestItemDeleteButton,
} from './styled/RequestItemButtonGroup.styled';
import FollowRequestsContext from '../store/follow-requests-context';
import RequestItemReducer from '../reducers/request-item-button-group-reducer';
import {
  SET_IS_CONFIRM_BUTTON_LOADING,
  SET_IS_DELETE_BUTTON_LOADING,
  SET_IS_FOLLOW_BUTTON_LOADING,
  REQUEST_HAS_BEEN_CONFIRMED,
  REQUEST_HAS_BEEN_DELETED,
  USER_HAS_BEEN_FOLLOWED,
} from '../actions/request-item-button-group-actions';

const RequestItemButtonGroup = ({userId}) => {
  const {confirmRequest, removeRequest} = useContext(FollowRequestsContext);

  const [state, dispatch] = useReducer(RequestItemReducer, {
    isConfirmed: false,
    isDeleted: false,
    isFollowed: false,
    isConfirmButtonLoading: false,
    isDeleteButtonLoading: false,
    isFollowButtonLoading: false,
  });

  const {
    isConfirmed,
    isDeleted,
    isFollowed,
    isConfirmButtonLoading,
    isDeleteButtonLoading,
    isFollowButtonLoading,
  } = state;

  const isConfirmedRef = useRef(isConfirmed);

  const isDeletedRef = useRef(isDeleted);

  const isFollowedRef = useRef(isFollowed);

  isConfirmedRef.current = isConfirmed;

  isDeletedRef.current = isDeleted;

  isFollowedRef.current = isFollowed;

  const confirmHandler = () => {
    dispatch({type: SET_IS_CONFIRM_BUTTON_LOADING, payload: true});

    setTimeout(() => {
      dispatch({
        type: REQUEST_HAS_BEEN_CONFIRMED,
        payload: {
          isConfirmed: !isConfirmedRef.current,
          isConfirmButtonLoading: false,
        },
      });

      confirmRequest(userId);
    }, 1000);
  };

  const deleteHandler = () => {
    dispatch({type: SET_IS_DELETE_BUTTON_LOADING, payload: true});

    setTimeout(() => {
      dispatch({
        type: REQUEST_HAS_BEEN_DELETED,
        payload: {
          isDeleted: !isDeletedRef.current,
          isDeleteButtonLoading: false,
        },
      });

      removeRequest(userId);
    }, 1000);
  };

  const followHandler = () => {
    dispatch({type: SET_IS_FOLLOW_BUTTON_LOADING, payload: true});

    setTimeout(() => {
      dispatch({
        type: USER_HAS_BEEN_FOLLOWED,
        payload: {
          isFollowed: !isFollowedRef.current,
          isFollowButtonLoading: false,
        },
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
};

export default RequestItemButtonGroup;
