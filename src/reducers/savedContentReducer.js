import {
  SET_IS_LOADING,
  SET_SAVED_POSTS_AFTER_LOADING,
  UNSAVE_POST,
} from '../actions/savedContentActions';

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
    case UNSAVE_POST:
      return {
        ...state,
        savedPosts: state.savedPosts.filter(
          (post) => post.id !== action.payload
        ),
      };
    default:
      throw new Error('invalid action');
  }
};
