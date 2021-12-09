import {useContext} from 'react';
import PropTypes from 'prop-types';
import {
  StyledSearchHistoryItem,
  SearchHistoryItemLink,
  SearchHistoryItemContent,
  RemoveHistoryItemButtonIcon,
  SearchHistoryItemAvatar,
  SearchHistoryUserAdditionalInfo,
  CloseButton,
  SearchHistoryUserAdditionalInfoDot,
} from './styled/SearchHistoryItem.styled';
import SearchHistoryResultsContext from '../store/search-history-results-context';

const SearchHistoryItem = ({user}) => {
  const {removeUser} = useContext(SearchHistoryResultsContext);

  const removeHistoryItemHandler = (e) => {
    e.preventDefault();
    removeUser(user.id);
  };

  const avatarComponent = (
    <SearchHistoryItemAvatar
      url={user.avatar}
      hasStory={user.hasStory}
      hasStoryBeenSeen={user.hasStoryBeenSeen}
      disableOnClickHandler
    />
  );

  const bottomTextComponent = (
    <SearchHistoryUserAdditionalInfo>
      <span>{user.name}</span>
      {user.isFollowed && (
        <>
          <SearchHistoryUserAdditionalInfoDot />
          <span>Following</span>
        </>
      )}
    </SearchHistoryUserAdditionalInfo>
  );

  const optionComponent = (
    <CloseButton
      type="text"
      onMouseDown={removeHistoryItemHandler}
      disabledHover
    >
      <RemoveHistoryItemButtonIcon />
    </CloseButton>
  );

  return (
    <StyledSearchHistoryItem>
      <SearchHistoryItemLink
        href={user.profile}
        onMouseDown={(e) => e.preventDefault()}
      >
        <SearchHistoryItemContent
          avatarComponent={avatarComponent}
          topText={user.username}
          bottomTextComponent={bottomTextComponent}
          optionComponent={optionComponent}
          topTextAsHeading
        />
      </SearchHistoryItemLink>
    </StyledSearchHistoryItem>
  );
};

SearchHistoryItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default SearchHistoryItem;
