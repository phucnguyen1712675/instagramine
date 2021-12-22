import {
  SET_IS_LOADING,
  SET_CHECKED,
  SET_SHOW_REQUESTS,
  SET_FOLLOW_REQUESTS,
  ON_HIDDEN,
} from '../actions/notification-button-actions';

export default (state, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_CHECKED:
      return {
        ...state,
        checked: action.payload,
      };
    case SET_SHOW_REQUESTS:
      return {
        ...state,
        showRequests: action.payload,
      };
    case SET_FOLLOW_REQUESTS:
      return {
        ...state,
        followRequests: action.payload,
      };
    case ON_HIDDEN:
      return {
        ...state,
        showRequests: false,
        isLoading: true,
      };
    default:
      throw new Error('invalid action');
  }
};
