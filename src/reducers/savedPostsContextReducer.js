import {
  SET_IS_LOADING,
  SET_SAVED_POSTS_AFTER_LOADING,
} from '../actions/savedPostsContextActions';

export default (state, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_SAVED_POSTS_AFTER_LOADING:
      return {
        ...state,
        isLoading: false,
        savedPosts: action.payload,
      };
    default:
      throw new Error('invalid action');
  }
};
