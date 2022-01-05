import {
  SET_IS_LOADING,
  SET_STORY_CATEGORIES_AFTER_LOADING,
} from '../actions/userMenuActions';

export default (state, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_STORY_CATEGORIES_AFTER_LOADING:
      return {
        ...state,
        isLoading: false,
        storyCategories: action.payload,
      };
    default:
      return state;
  }
};
