import {
  SET_IS_OPEN,
  SET_IS_LOADING,
  SET_FILTERED_USERS_AFTER_FETCHING,
  OPEN_FIRST_TIME,
} from '../actions/searchBarActions';

export default (state, action) => {
  switch (action.type) {
    case SET_IS_OPEN:
      return {
        ...state,
        isOpen: action.payload,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_FILTERED_USERS_AFTER_FETCHING:
      return {
        ...state,
        isLoading: false,
        filteredUsers: action.payload,
      };
    case OPEN_FIRST_TIME:
      return {
        ...state,
        hasOpened: true,
        isOpen: true,
      };
    default:
      throw new Error('invalid action');
  }
};
