import {useState} from 'react';
import SearchHistory from './SearchHistory';
import {Button} from './styled/Lib';
import CloseIcon from './icons/CloseIcon';
import SearchIcon from './icons/SearchIcon';
import {StyledSearchForm, SearchInput} from './styled/SearchForm.styled';
import {SearchHistoryResultsContextProvider} from '../store/search-history-results-context';

const SearchForm = () => {
  const [isFocused, setIsFocused] = useState(false);

  const [hasSearchHistoryOpened, setHasSearchHistoryOpened] = useState(false);

  const onFocus = () => setIsFocused(true);

  const onBlur = () => setIsFocused(false);

  const onCloseInputHandler = () => {
    setIsFocused(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <StyledSearchForm onSubmit={submitHandler}>
      {!isFocused && <SearchIcon />}
      <SearchInput placeholder="Search" onFocus={onFocus} onBlur={onBlur} />
      {isFocused && (
        <Button onClick={onCloseInputHandler}>
          <CloseIcon />
        </Button>
      )}
      {isFocused && (
        <SearchHistoryResultsContextProvider>
          <SearchHistory
            hasSearchHistoryOpened={hasSearchHistoryOpened}
            setHasSearchHistoryOpened={setHasSearchHistoryOpened}
          />
        </SearchHistoryResultsContextProvider>
      )}
    </StyledSearchForm>
  );
};

export default SearchForm;
