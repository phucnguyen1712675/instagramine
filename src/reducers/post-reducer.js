import {
  SET_LIKE_AMOUNT,
  SET_IS_LIKED,
  SET_IS_SAVED,
  LIKE_POST,
  UNLIKE_POST,
} from '../actions/post-actions';

export default (state, action) => {
  switch (action.type) {
    case SET_LIKE_AMOUNT:
      return {
        ...state,
        likeAmount: action.payload,
      };
    case SET_IS_LIKED:
      return {
        ...state,
        isLiked: action.payload,
      };
    case SET_IS_SAVED:
      return {
        ...state,
        isSaved: action.payload,
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
      return state;
  }
};
