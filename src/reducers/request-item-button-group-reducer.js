import {
  SET_IS_CONFIRM_BUTTON_LOADING,
  SET_IS_DELETE_BUTTON_LOADING,
  SET_IS_FOLLOW_BUTTON_LOADING,
  REQUEST_HAS_BEEN_CONFIRMED,
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
        isConfirmed: !state.isConfirmed,
        isConfirmButtonLoading: false,
      };
    case USER_HAS_BEEN_FOLLOWED:
      return {
        ...state,
        isFollowed: !state.isFollowed,
        isFollowButtonLoading: false,
      };
    default:
      throw new Error('invalid action');
  }
};
