import {useState, useEffect, useContext} from 'react';
import SearchHistoryItem from './SearchHistoryItem';
import {Button} from './styled/Lib';
import {
  StyledSearchHistory,
  SearchHistoryHeader,
  SearchHistoryList,
} from './styled/SearchHistory.styled';
import SearchHistoryResultsContext from '../store/search-history-results-context';

const SearchHistory = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fake loading
    // setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const {users, removeAllUsers} = useContext(SearchHistoryResultsContext);

  const clearAllHandler = () => {
    removeAllUsers();
  };

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else {
    content = (
      <>
        <SearchHistoryHeader>
          <h3>Recent</h3>
          {users.length > 0 && (
            <Button onClick={clearAllHandler}>Clear All</Button>
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

export default SearchHistory;
