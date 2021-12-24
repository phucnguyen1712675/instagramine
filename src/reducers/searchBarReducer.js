import {
  SET_IS_OPEN,
  SET_IS_LOADING,
  OPEN_FIRST_TIME,
  FILTER_USERS,
} from '../actions/searchBarActions';
import usersData from '../data/users.json';

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
      throw new Error('invalid action');
  }
};
