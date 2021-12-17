import {
  SET_HAS_OPENED,
  SET_IS_LOADING,
  FILTER_USERS,
} from '../actions/search-bar-actions';
import usersData from '../data/users.json';

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
    case FILTER_USERS: {
      const query = action.payload;

      const filteredUsers = usersData.filter((user) => {
        const username = user.username.toLowerCase();
        return username.includes(query);
      });

      return {
        ...state,
        filteredUsers,
        // Fake loading
        isLoading: true,
      };
    }
    default:
      return state;
  }
};
