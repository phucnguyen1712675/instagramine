import {useState, useEffect, useRef} from 'react';
import SearchHistory from './SearchHistory';
import SearchIcon from './icons/SearchIcon';
import {StyledSearchBar, SearchInput} from './styled/SearchBar.styled';
import {SearchHistoryResultsContextProvider} from '../store/search-history-results-context';

const SearchForm = () => {
  // const [isFocused, setIsFocused] = useState(false);

  const [hasSearchHistoryOpened, setHasSearchHistoryOpened] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const searchHistoryRef = useRef(null);

  useEffect(() => {
    if (!hasSearchHistoryOpened) {
      searchHistoryRef.current?.setIsLoadingState(true);

      setTimeout(() => {
        searchHistoryRef.current?.setIsLoadingState(false);
      }, 1000);

      setHasSearchHistoryOpened(true);
    }
  }, []);

  // const onFocus = () => setIsFocused(true);

  // const onBlur = () => setIsFocused(false);

  const onSearch = () => {
    if (searchTerm === '') {
      setSearchTerm('');
    }
  };

  const fetchDataFake = () => {
    searchHistoryRef.current.setIsLoadingState(true);

    setTimeout(() => {
      searchHistoryRef.current.setIsLoadingState(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);

    // Fake loading
    fetchDataFake();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <StyledSearchBar onSubmit={handleSubmit}>
      {/* {!isFocused && <SearchIcon />} */}
      <SearchInput
        name="searchTerm"
        placeholder="Search"
        autoComplete="off"
        value={searchTerm}
        onChange={handleChange}
        // onFocus={onFocus}
        // onBlur={onBlur}
        ref={(element) => ((element || {}).onsearch = onSearch)}
      />
      <SearchIcon />
      <SearchHistoryResultsContextProvider>
        <SearchHistory
          ref={searchHistoryRef}
          hasSearchHistoryOpened={hasSearchHistoryOpened}
          setHasSearchHistoryOpened={setHasSearchHistoryOpened}
        />
      </SearchHistoryResultsContextProvider>
    </StyledSearchBar>
  );
};

export default SearchForm;
