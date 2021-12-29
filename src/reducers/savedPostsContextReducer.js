import {
  SET_IS_LOADING,
  SET_SAVED_POSTS_AFTER_LOADING,
  SET_SAVED_POSTS_AFTER_ADDING,
  SET_SAVED_POSTS_AFTER_REMOVING,
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
    case SET_SAVED_POSTS_AFTER_ADDING:
      return {
        ...state,
        isLoading: false,
        savedPosts: [action.payload, ...state.savedPosts],
      };
    case SET_SAVED_POSTS_AFTER_REMOVING:
      return {
        ...state,
        isLoading: false,
        savedPosts: state.savedPosts.filter(
          (post) => post.id !== action.payload
        ),
      };
    default:
      throw new Error('invalid action');
  }
};
