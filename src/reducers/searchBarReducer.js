// import {serverTimestamp} from 'firebase/firestore';
import {
  SET_IS_OPEN,
  SET_IS_LOADING,
  SET_SEARCH_HISTORY_AFTER_LOADING,
  ADD_SEARCH_HISTORY_ITEM,
  UPDATE_SEARCH_HISTORY_ITEM_CREATED_AT,
  SET_SEARCH_HISTORY_AFTER_REMOVING,
  SET_SEARCH_HISTORY_AFTER_REMOVING_ALL,
  SET_FILTERED_USERS,
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
    case ADD_SEARCH_HISTORY_ITEM:
      return {
        ...state,
        isLoading: false,
        searchHistory: [
          {
            ...action.payload,
            createdAt: new Date(),
          },
          ...state.searchHistory,
        ],
      };
    case UPDATE_SEARCH_HISTORY_ITEM_CREATED_AT: {
      const searchUserId = action.payload;
      const {searchHistory} = state;
      const indexFound = searchHistory.findIndex(
        (item) => item.id === searchUserId
      );

      if (indexFound === -1) {
        return {
          ...state,
          isLoading: false,
        };
      }

      const itemToUpdate = searchHistory[indexFound];
      itemToUpdate.createdAt = +new Date();
      const sortedSearchHistory = state.searchHistory.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return {
        ...state,
        isLoading: false,
        searchHistory: sortedSearchHistory,
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
