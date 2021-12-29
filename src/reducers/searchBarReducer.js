import {
  SET_IS_OPEN,
  SET_IS_LOADING,
  SET_SEARCH_HISTORY_AFTER_LOADING,
  SET_SEARCH_HISTORY_AFTER_ADDING,
  SET_SEARCH_HISTORY_AFTER_REMOVING,
  SET_SEARCH_HISTORY_AFTER_REMOVING_ALL,
  SET_FILTERED_USERS,
  OPEN_FIRST_TIME,
} from '../actions/searchBarActions';
import {move} from '../utils/array';

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
    case OPEN_FIRST_TIME:
      return {
        ...state,
        hasOpened: true,
        isOpen: true,
      };
    case SET_SEARCH_HISTORY_AFTER_LOADING:
      return {
        ...state,
        isLoading: false,
        searchHistory: action.payload,
      };
    case SET_SEARCH_HISTORY_AFTER_ADDING: {
      const {searchHistory} = state;
      const user = action.payload;
      const userIndex = searchHistory.findIndex((item) => item.id === user.id);
      const hasUserIncluded = userIndex !== -1;

      if (!hasUserIncluded) {
        return {
          ...state,
          isLoading: false,
          searchHistory: [user, ...searchHistory],
        };
      }
      // Move to the top of the list
      return {
        ...state,
        isLoading: false,
        searchHistory: move(searchHistory, userIndex, 0),
      };
    }
    case SET_SEARCH_HISTORY_AFTER_REMOVING:
      return {
        ...state,
        isLoading: false,
        searchHistory: state.searchHistory.filter(
          (item) => item.id !== action.payload
        ),
      };
    case SET_SEARCH_HISTORY_AFTER_REMOVING_ALL:
      return {
        ...state,
        isLoading: false,
        searchHistory: [],
      };
    case SET_FILTERED_USERS:
      return {
        ...state,
        filteredUsers: action.payload,
      };

    default:
      throw new Error('invalid action');
  }
};
