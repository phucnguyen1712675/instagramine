import {useContext} from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import {Button, Dot} from './styled/Lib';
import {
  StyledSearchHistoryItem,
  SearchHistoryContentWrapper,
  SearchHistoryContent,
} from './styled/SearchHistoryItem.styled';
import MultiplyIcon from './icons/MultiplyIcon';
import SearchHistoryResultsContext from '../store/search-history-results-context';

const SearchHistoryItem = ({user}) => {
  const {removeUser} = useContext(SearchHistoryResultsContext);

  const removeHistoryItemHandler = (e) => {
    e.preventDefault();
    removeUser(user.id);
  };

  return (
    <StyledSearchHistoryItem>
      <a href={user.profile} onMouseDown={(e) => e.preventDefault()}>
        <Avatar
          size="52px"
          url={user.avatar}
          hasStory={user.hasStory}
          hasStoryBeenSeen={user.hasStoryBeenSeen}
        />
        <SearchHistoryContentWrapper>
          <SearchHistoryContent>
            <h4>{user.username}</h4>
            <div>
              <span>{user.name}</span>
              {user.isFollowed && (
                <>
                  <Dot />
                  <span>Following</span>
                </>
              )}
            </div>
          </SearchHistoryContent>
        </SearchHistoryContentWrapper>
        <Button onMouseDown={removeHistoryItemHandler}>
          <MultiplyIcon />
        </Button>
      </a>
    </StyledSearchHistoryItem>
  );
};

SearchHistoryItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default SearchHistoryItem;
