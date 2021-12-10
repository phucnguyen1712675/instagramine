import {
  SET_IS_CONFIRM_BUTTON_LOADING,
  SET_IS_DELETE_BUTTON_LOADING,
  SET_IS_FOLLOW_BUTTON_LOADING,
  REQUEST_HAS_BEEN_CONFIRMED,
  REQUEST_HAS_BEEN_DELETED,
  USER_HAS_BEEN_FOLLOWED,
} from '../actions/request-item-button-group-actions';

export default (state, action) => {
  switch (action.type) {
    case SET_IS_CONFIRM_BUTTON_LOADING:
      return {
        ...state,
        isConfirmButtonLoading: action.payload,
      };
    case SET_IS_DELETE_BUTTON_LOADING:
      return {
        ...state,
        isDeleteButtonLoading: action.payload,
      };
    case SET_IS_FOLLOW_BUTTON_LOADING:
      return {
        ...state,
        isFollowButtonLoading: action.payload,
      };
    case REQUEST_HAS_BEEN_CONFIRMED:
      return {
        ...state,
        isConfirmed: action.payload.isConfirmed,
        isConfirmButtonLoading: action.payload.isConfirmButtonLoading,
      };
    case REQUEST_HAS_BEEN_DELETED:
      return {
        ...state,
        isDeleted: action.payload.isDeleted,
        isDeleteButtonLoading: action.payload.isDeleteButtonLoading,
      };
    case USER_HAS_BEEN_FOLLOWED:
      return {
        ...state,
        isFollowed: action.payload.isFollowed,
        isFollowButtonLoading: action.payload.isFollowButtonLoading,
      };
    default:
      return state;
  }
};
