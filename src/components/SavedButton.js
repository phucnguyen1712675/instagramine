import {useState} from 'react';
import PropTypes from 'prop-types';
import SavedIcon from './icons/SavedIcon';
import {StyledSavedButton} from './styled/SavedButton.styled';

const SavedButton = ({isSaved}) => {
  const [isSavedState, setIsSavedState] = useState(isSaved);

  const toggleIsSaved = () => setIsSavedState((prevState) => !prevState);

  const savePostHandler = () => {
    toggleIsSaved();
  };

  return (
    <StyledSavedButton isSaved={isSavedState} onClick={savePostHandler}>
      <SavedIcon />
    </StyledSavedButton>
  );
};

SavedButton.propTypes = {
  isSaved: PropTypes.bool.isRequired,
};

export default SavedButton;
