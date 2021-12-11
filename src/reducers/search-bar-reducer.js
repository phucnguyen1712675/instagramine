import {
  SET_HAS_OPENED,
  SET_IS_LOADING,
  SET_QUERY,
  ADD_USER,
  REMOVE_USER,
  REMOVE_ALL_USERS,
  FILTER_USERS,
} from '../actions/search-bar-actions';
import searchHistoryData from '../data/search-history.json';

export default (state, action) => {
  switch (action.type) {
    case SET_HAS_OPENED:
      return {
        ...state,
        hasOpened: action.payload,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        history: [...state.history, action.payload],
      };
    case REMOVE_USER:
      return {
        ...state,
        history: state.history.filter((user) => user.id !== action.payload),
      };
    case REMOVE_ALL_USERS:
      return {
        ...state,
        history: [],
      };
    case FILTER_USERS: {
      const query = action.payload;

      if (!query) {
        return state;
      }

      const filteredUsers = searchHistoryData.filter((user) => {
        const username = user.username.toLowerCase();
        return username.includes(query);
      });

      return {
        ...state,
        query,
        filteredUsers: filteredUsers,
        // Fake loading
        isLoading: true,
      };
    }
    default:
      return state;
  }
};
