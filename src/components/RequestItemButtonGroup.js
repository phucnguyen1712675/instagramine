import {useReducer, useRef} from 'react';
import {
  StyledRequestItemButtonGroup,
  RequestItemConfirmButton,
  RequestItemFollowButton,
  RequestItemDeleteButton,
} from './styled/RequestItemButtonGroup.styled';
import Reducer from '../reducers/request-item-button-group-reducer';
import {
  SET_IS_CONFIRM_BUTTON_LOADING,
  SET_IS_DELETE_BUTTON_LOADING,
  SET_IS_FOLLOW_BUTTON_LOADING,
  REQUEST_HAS_BEEN_CONFIRMED,
  REQUEST_HAS_BEEN_DELETED,
  USER_HAS_BEEN_FOLLOWED,
} from '../actions/request-item-button-group-actions';

const RequestItemButtonGroup = () => {
  const [state, dispatch] = useReducer(Reducer, {
    isConfirmed: false,
    isDeleted: false,
    isFollowed: false,
    isConfirmButtonLoading: false,
    isDeleteButtonLoading: false,
    isFollowButtonLoading: false,
  });

  const isConfirmedRef = useRef(state.isConfirmed);

  const isDeletedRef = useRef(state.isDeleted);

  const isFollowedRef = useRef(state.isFollowed);

  isConfirmedRef.current = state.isConfirmed;

  isDeletedRef.current = state.isDeleted;

  isFollowedRef.current = state.isFollowed;

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

  const content = !state.isConfirmed ? (
    <>
      <RequestItemConfirmButton
        type="primary"
        loading={state.isConfirmButtonLoading}
        onClick={confirmHandler}
      >
        Confirm
      </RequestItemConfirmButton>
      <RequestItemDeleteButton
        loading={state.isDeleteButtonLoading}
        disabled={state.isConfirmButtonLoading}
        onClick={deleteHandler}
      >
        Delete
      </RequestItemDeleteButton>
    </>
  ) : (
    <RequestItemFollowButton
      loading={state.isFollowButtonLoading}
      onClick={followHandler}
    >
      Follow
    </RequestItemFollowButton>
  );

  return <StyledRequestItemButtonGroup>{content}</StyledRequestItemButtonGroup>;
};

export default RequestItemButtonGroup;
