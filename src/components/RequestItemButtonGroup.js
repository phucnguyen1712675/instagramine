import {useReducer} from 'react';
import PropTypes from 'prop-types';
import {writeBatch, doc, deleteDoc} from 'firebase/firestore';
import {DisabledButtonWrapper} from './styled/Lib';
import {
  StyledRequestItemButtonGroup,
  RequestItemConfirmButton,
  RequestItemFollowButton,
  RequestItemDeleteButton,
} from './styled/RequestItemButtonGroup.styled';
import {requestItemButtonReducer} from '../reducers';
import {useAuth, useMounted} from '../hooks';
import {db} from '../firebase-config';
import {
  SET_IS_CONFIRM_BUTTON_LOADING,
  SET_IS_DELETE_BUTTON_LOADING,
  SET_IS_FOLLOW_BUTTON_LOADING,
  REQUEST_HAS_BEEN_CONFIRMED,
  USER_HAS_BEEN_FOLLOWED,
} from '../actions/requestItemButtonGroupActions';
import {SET_FOLLOW_REQUESTS} from '../actions/notificationButtonActions';

const RequestItemButtonGroup = ({userId, dispatchCb}) => {
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
    try {
      dispatch({type: SET_IS_CONFIRM_BUTTON_LOADING, payload: true});

      // Get a new write batch
      const batch = writeBatch();

      // Remove from request sender
      batch.delete(
        doc(db, `junction_user_request_sender/${auth.uid}_${userId}`)
      );

      // user with userId follows user with auth.uid
      const itemToAdd = {
        uid: userId,
        followingUserId: auth.uid,
      };

      // Add to following user collection
      batch.set(
        doc(db, `junction_user_following_user/${userId}_${auth.uid}`),
        itemToAdd
      );

      // Commit the batch
      await batch.commit();

      if (mounted.current) {
        dispatch({
          type: REQUEST_HAS_BEEN_CONFIRMED,
        });
      }
    } catch (error) {
      if (mounted.current) {
        dispatch({type: SET_IS_CONFIRM_BUTTON_LOADING, payload: false});
      }

      alert(`Error confirming follow request: ${error}`);
    }
  };

  const removeRequestHandler = async () => {
    try {
      dispatch({type: SET_IS_DELETE_BUTTON_LOADING, payload: true});

      await deleteDoc(
        doc(db, `junction_user_request_sender/${auth.uid}_${userId}`)
      );

      const newFollowRequests = state.followRequests.filter(
        (user) => user.id !== userId
      );

      if (mounted.current) {
        dispatchCb({
          type: SET_FOLLOW_REQUESTS,
          payload: newFollowRequests,
        });
      }

      if (mounted.current) {
        dispatch({type: SET_IS_DELETE_BUTTON_LOADING, payload: false});
      }
    } catch (error) {
      if (mounted.current) {
        dispatch({type: SET_IS_DELETE_BUTTON_LOADING, payload: false});
      }

      alert(`Error removing follow request: ${error}`);
    }
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
  dispatchCb: PropTypes.func.isRequired,
};

export default RequestItemButtonGroup;
