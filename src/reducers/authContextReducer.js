import {
  SET_IS_LOADING,
  SET_AUTH_USER_AFTER_FETCHING,
} from '../actions/authContextActions';

export default (state, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_AUTH_USER_AFTER_FETCHING:
      return {
        ...state,
        isLoading: false,
        authUser: action.payload,
      };
    default:
      throw new Error('invalid action');
  }
};
