import {
  SET_IS_LOADING,
  SET_POSTS_AFTER_LOADING,
} from '../actions/homeContentActions';

export default (state, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_POSTS_AFTER_LOADING:
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
      };
    default:
      throw new Error('invalid action');
  }
};
