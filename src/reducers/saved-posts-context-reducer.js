import {
  SET_IS_LOADING,
  SAVE_POST,
  UNSAVE_POST,
  SET_SAVED_POSTS_AFTER_FETCHING,
} from '../actions/saved-posts-context-actions';

export default (state, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SAVE_POST:
      return {
        ...state,
        savedPosts: [action.payload, ...state.savedPosts],
      };
    case UNSAVE_POST:
      return {
        ...state,
        savedPosts: state.savedPosts.filter(
          (post) => post.id !== action.payload
        ),
      };
    case SET_SAVED_POSTS_AFTER_FETCHING:
      return {
        ...state,
        isLoading: false,
        savedPosts: action.payload,
      };
    default:
      throw new Error('invalid action');
  }
};
