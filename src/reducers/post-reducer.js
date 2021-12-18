import {TOGGLE_IS_SAVED, LIKE_POST, UNLIKE_POST} from '../actions/post-actions';

export default (state, action) => {
  switch (action.type) {
    case TOGGLE_IS_SAVED:
      return {
        ...state,
        isSaved: !state.isSaved,
      };
    case LIKE_POST:
      return {
        ...state,
        likeAmount: state.likeAmount + 1,
        isLiked: true,
      };
    case UNLIKE_POST:
      return {
        ...state,
        likeAmount: state.likeAmount - 1,
        isLiked: false,
      };
    default:
      throw new Error('invalid action');
  }
};
