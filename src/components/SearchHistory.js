import {useState, useContext, forwardRef, useImperativeHandle} from 'react';
import SearchHistoryItem from './SearchHistoryItem';
import Spinner from './Spinner';
import {
  StyledSearchHistory,
  NoResultsText,
  SearchHistoryHeader,
  SearchHistoryHeaderTitle,
  ClearAllButton,
  SearchHistoryList,
} from './styled/SearchHistory.styled';
import SearchHistoryResultsContext from '../store/search-history-results-context';

const SearchHistory = forwardRef((props, ref) => {
  const [isLoading, setIsLoading] = useState(true);

  const {users, removeAllUsers} = useContext(SearchHistoryResultsContext);

  useImperativeHandle(ref, () => ({
    getIsLoadingState: () => isLoading,
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
        <SearchHistoryHeaderTitle>Recent</SearchHistoryHeaderTitle>
        {users.length > 0 && (
          <ClearAllButton type="link" onMouseDown={clearAllHandler}>
            Clear All
          </ClearAllButton>
        )}
      </SearchHistoryHeader>
      {users.length > 0 ? (
        <SearchHistoryList>
          {users.map((user) => (
            <SearchHistoryItem key={user.id} user={user} />
          ))}
        </SearchHistoryList>
      ) : (
        <NoResultsText>No result founds.</NoResultsText>
      )}
    </>
  );

  return (
    <StyledSearchHistory $isLoading={isLoading}>
      {content}
    </StyledSearchHistory>
  );
});

SearchHistory.displayName = 'SearchHistory';

export default SearchHistory;
