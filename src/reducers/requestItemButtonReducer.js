import {
  SET_IS_CONFIRM_BUTTON_LOADING,
  SET_IS_DELETE_BUTTON_LOADING,
  SET_IS_FOLLOW_BUTTON_LOADING,
  TOGGLE_IS_CONFIRMED_AFTER_LOADING,
  TOGGLE_IS_FOLLOWING_AFTER_LOADING,
} from '../actions/requestItemButtonGroupActions';

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
    case TOGGLE_IS_CONFIRMED_AFTER_LOADING:
      return {
        ...state,
        isConfirmed: !state.isConfirmed,
        isConfirmButtonLoading: false,
      };
    case TOGGLE_IS_FOLLOWING_AFTER_LOADING:
      return {
        ...state,
        isFollowing: !state.isFollowing,
        isFollowButtonLoading: false,
      };
    default:
      return state;
  }
};
