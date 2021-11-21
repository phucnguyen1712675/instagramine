import {useState} from 'react';
import PropTypes from 'prop-types';
import {StyledLikedButton} from './styled/LikedButton.styled';
import HeaderICon from './icons/HeartIcon';

const LikedButton = ({isLiked}) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);

  const likePostHandler = () => {
    setIsLikedState((prevState) => !prevState);
  };

  return (
    <StyledLikedButton isLiked={isLikedState} onClick={likePostHandler}>
      <HeaderICon />
    </StyledLikedButton>
  );
};

LikedButton.propTypes = {
  isLiked: PropTypes.bool.isRequired,
};

export default LikedButton;
