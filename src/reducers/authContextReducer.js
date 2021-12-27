import {
  SET_IS_LOADING,
  ON_SUCCESS,
  ON_ERROR,
  SET_CURRENT_USER,
  SET_CURRENT_USER_AFTER_FETCHING,
  SIGN_OUT,
} from '../actions/authContextActions';

export default (state, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case ON_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SET_CURRENT_USER_AFTER_FETCHING:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    default:
      throw new Error('invalid action');
  }
};
