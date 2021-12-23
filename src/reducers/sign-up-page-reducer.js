import {
  SET_IS_LOADING,
  ON_SUBMIT_FAILED,
} from '../actions/sign-up-page-actions';

export default (state, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ON_SUBMIT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error('invalid action');
  }
};
