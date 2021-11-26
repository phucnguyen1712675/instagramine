import {useState, createContext} from 'react';
import PropTypes from 'prop-types';
import searchHistoryData from '../data/search-history.json';

const initialState = {
  users: [],
  // eslint-disable-next-line no-unused-vars
  addUser: (user) => {},
  // eslint-disable-next-line no-unused-vars
  removeUser: (userId) => {},
  removeAllUsers: () => {},
};

const SearchHistoryResultsContext = createContext(initialState);

export const SearchHistoryResultsContextProvider = ({children}) => {
  const [users, setUsers] = useState(searchHistoryData);

  const addUser = (user) => setUsers((prevUsers) => [...prevUsers, user]);

  const removeUser = (userId) =>
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

  const removeAllUsers = () => setUsers([]);

  const context = {
    users,
    addUser,
    removeUser,
    removeAllUsers,
  };

  return (
    <SearchHistoryResultsContext.Provider value={context}>
      {children}
    </SearchHistoryResultsContext.Provider>
  );
};

SearchHistoryResultsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchHistoryResultsContext;
