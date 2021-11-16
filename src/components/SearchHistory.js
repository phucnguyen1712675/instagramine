import {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import SearchHistoryItem from './SearchHistoryItem';
import Spinner from './icons/Spinner';
import {Button} from './styled/Lib';
import {
  StyledSearchHistory,
  SearchHistoryHeader,
  SearchHistoryList,
} from './styled/SearchHistory.styled';
import SearchHistoryResultsContext from '../store/search-history-results-context';

const SearchHistory = ({hasSearchHistoryOpened, setHasSearchHistoryOpened}) => {
  const [isLoading, setIsLoading] = useState(!hasSearchHistoryOpened);

  useEffect(() => {
    // Fake loading
    if (!hasSearchHistoryOpened) {
      setTimeout(() => {
        setIsLoading(false);
        setHasSearchHistoryOpened(true);
      }, 1000);
    }
  }, []);

  const {users, removeAllUsers} = useContext(SearchHistoryResultsContext);

  const clearAllHandler = (e) => {
    e.preventDefault();
    removeAllUsers();
  };

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else {
    content = (
      <>
        <SearchHistoryHeader>
          <h3>Recent</h3>
          {users.length > 0 && (
            <Button onMouseDown={clearAllHandler}>Clear All</Button>
          )}
        </SearchHistoryHeader>
        {users.length > 0 ? (
          <SearchHistoryList>
            {users.map((user) => (
              <SearchHistoryItem key={user.id} user={user} />
            ))}
          </SearchHistoryList>
        ) : (
          <p>No recent searches</p>
        )}
      </>
    );
  }

  return (
    <StyledSearchHistory isLoading={isLoading}>{content}</StyledSearchHistory>
  );
};

SearchHistory.propTypes = {
  hasSearchHistoryOpened: PropTypes.bool.isRequired,
  setHasSearchHistoryOpened: PropTypes.func.isRequired,
};

export default SearchHistory;
