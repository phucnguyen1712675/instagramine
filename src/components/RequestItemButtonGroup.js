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
import {useAuth, useMounted} from '../hooks';
import {
  confirmRequest,
  removeJunctionUserRequestSender,
  addJunctionUserFollowingUser,
  removeJunctionUserFollowingUser,
} from '../services/firestore';
import {
  SET_IS_CONFIRM_BUTTON_LOADING,
  SET_IS_DELETE_BUTTON_LOADING,
  SET_IS_FOLLOW_BUTTON_LOADING,
  TOGGLE_IS_CONFIRMED_AFTER_LOADING,
  TOGGLE_IS_FOLLOWING_AFTER_LOADING,
} from '../actions/requestItemButtonGroupActions';

const RequestItemButtonGroup = ({userId, setRequestSendersAfterRemoving}) => {
  const [state, dispatch] = useReducer(requestItemButtonReducer, {
    isConfirmed: false,
    isFollowing: false,
    isConfirmButtonLoading: false,
    isDeleteButtonLoading: false,
    isFollowButtonLoading: false,
  });

  const auth = useAuth();

  const mounted = useMounted();

  const confirmRequestHandler = async () => {
    dispatch({type: SET_IS_CONFIRM_BUTTON_LOADING, payload: true});

    await confirmRequest({
      uid: auth.authUser.id,
      requestSenderId: userId,
    });

    if (mounted.current) {
      dispatch({
        type: TOGGLE_IS_CONFIRMED_AFTER_LOADING,
      });
    }
  };

  const removeRequestHandler = async () => {
    dispatch({type: SET_IS_DELETE_BUTTON_LOADING, payload: true});

    await removeJunctionUserRequestSender({
      uid: auth.authUser.id,
      requestSenderId: userId,
    });

    setRequestSendersAfterRemoving(userId);

    if (mounted.current) {
      dispatch({type: SET_IS_DELETE_BUTTON_LOADING, payload: false});
    }
  };

  const followUserHandler = async () => {
    dispatch({type: SET_IS_FOLLOW_BUTTON_LOADING, payload: true});

    if (state.isFollowing) {
      await removeJunctionUserFollowingUser({
        uid: auth.authUser.id,
        followingUserId: userId,
      });
    } else {
      await addJunctionUserFollowingUser({
        uid: auth.authUser.id,
        followingUserId: userId,
      });
    }

    if (mounted.current) {
      dispatch({
        type: TOGGLE_IS_FOLLOWING_AFTER_LOADING,
      });
    }
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
            type={!state.isFollowing ? 'primary' : 'default'}
            loading={state.isFollowButtonLoading}
            disabled={state.isFollowButtonLoading}
            onClick={followUserHandler}
            $isFollowing={state.isFollowing}
          >
            {state.isFollowing ? 'Following' : 'Follow'}
          </RequestItemFollowButton>
        </DisabledButtonWrapper>
      )}
    </StyledRequestItemButtonGroup>
  );
};

RequestItemButtonGroup.propTypes = {
  userId: PropTypes.number.isRequired,
  setRequestSendersAfterRemoving: PropTypes.func.isRequired,
};

export default RequestItemButtonGroup;
