import {
  SET_IS_LOADING,
  ON_SUCCESS,
  ON_ERROR,
} from '../actions/requestActions';

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
    default:
      return state;
  }
};
