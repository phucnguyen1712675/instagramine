import {useState, useEffect, useRef} from 'react';
import SearchHistory from './SearchHistory';
import {
  StyledSearchBar,
  SearchInput,
  SearchInputSearchIcon,
} from './styled/SearchBar.styled';
import {SearchHistoryResultsContextProvider} from '../store/search-history-results-context';
import useBlur from '../hooks/useBlur';
import {LOADING_DELAY} from '../constants';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  const [hasSearchHistoryOpened, setHasSearchHistoryOpened] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const searchHistoryRef = useRef(null);

  const [inputRef, setInputBlur] = useBlur();

  let timeoutId;

  useEffect(() => {
    const onSearch = (e) => {
      if (e.target.value === '') {
        setInputBlur();
      }
    };

    inputRef?.current?.addEventListener('search', onSearch);

    return () => {
      inputRef?.current?.removeEventListener('search', onSearch);
    };
  }, []);

  useEffect(() => {
    if (isFocused && !hasSearchHistoryOpened) {
      setHasSearchHistoryOpened(true);

      timeoutId = setTimeout(() => {
        searchHistoryRef.current.setIsLoadingState(false);
      }, LOADING_DELAY);

      return () => {
        const isLoading = searchHistoryRef.current.getIsLoadingState();
        isLoading && searchHistoryRef.current.setIsLoadingState(false);

        clearTimeout(timeoutId);
      };
    }
  }, [isFocused]);

  useEffect(() => {
    if (searchTerm !== '') {
      searchHistoryRef.current.setIsLoadingState(true);

      timeoutId = setTimeout(() => {
        searchHistoryRef.current.setIsLoadingState(false);
      }, LOADING_DELAY);

      return () => {
        const isLoading = searchHistoryRef.current.getIsLoadingState();
        isLoading && searchHistoryRef.current.setIsLoadingState(false);

        clearTimeout(timeoutId);
      };
    }
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => e.preventDefault();

  const onFocus = () => setIsFocused(true);

  const onBlur = () => setIsFocused(false);

  return (
    <StyledSearchBar onSubmit={handleSubmit}>
      <SearchInput
        name="searchTerm"
        value={searchTerm}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
      />
      <SearchInputSearchIcon />
      <SearchHistoryResultsContextProvider>
        <SearchHistory ref={searchHistoryRef} />
      </SearchHistoryResultsContextProvider>
    </StyledSearchBar>
  );
};

export default SearchBar;
