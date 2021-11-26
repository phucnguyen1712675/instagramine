import {useState, useContext, forwardRef, useImperativeHandle} from 'react';
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

const SearchHistory = forwardRef((props, ref) => {
  const [isLoading, setIsLoading] = useState(false);

  const {users, removeAllUsers} = useContext(SearchHistoryResultsContext);

  useImperativeHandle(ref, () => ({
    setIsLoadingState: (isLoadingState) => setIsLoading(isLoadingState),
  }));

  const clearAllHandler = (e) => {
    e.preventDefault();
    removeAllUsers();
  };

  const content = isLoading ? (
    <Spinner />
  ) : (
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

  return (
    <StyledSearchHistory isLoading={isLoading} {...props}>
      {content}
    </StyledSearchHistory>
  );
});

SearchHistory.displayName = 'SearchHistory';

SearchHistory.propTypes = {
  hasSearchHistoryOpened: PropTypes.bool.isRequired,
  setHasSearchHistoryOpened: PropTypes.func.isRequired,
};

export default SearchHistory;
