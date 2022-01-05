import {
  TOGGLE_IS_SAVED_AFTER_LOADING,
  LIKE_POST,
  UNLIKE_POST,
  SET_IS_LIKE_BUTTON_LOADING,
  SET_IS_SAVE_BUTTON_LOADING,
} from '../actions/postActions';

export default (state, action) => {
  switch (action.type) {
    case SET_IS_LIKE_BUTTON_LOADING:
      return {
        ...state,
        isLikeButtonLoading: action.payload,
      };
    case SET_IS_SAVE_BUTTON_LOADING:
      return {
        ...state,
        isSaveButtonLoading: action.payload,
      };
    case TOGGLE_IS_SAVED_AFTER_LOADING:
      return {
        ...state,
        isSaved: !state.isSaved,
        isSaveButtonLoading: false,
      };
    case LIKE_POST:
      return {
        ...state,
        likeAmount: state.likeAmount + 1,
        isLiked: true,
        isLikeButtonLoading: false,
      };
    case UNLIKE_POST:
      return {
        ...state,
        likeAmount: state.likeAmount - 1,
        isLiked: false,
        isLikeButtonLoading: false,
      };
    default:
      throw new Error('invalid action');
  }
};
