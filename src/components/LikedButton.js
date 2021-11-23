import {useState} from 'react';
import PropTypes from 'prop-types';
import {StyledLikedButton} from './styled/LikedButton.styled';
import HeaderICon from './icons/HeartIcon';

const LikedButton = ({isLiked, increaseLikeAmount, decreaseLikeAmount}) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);

  const likePostHandler = () => {
    isLikedState ? decreaseLikeAmount() : increaseLikeAmount();
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
  increaseLikeAmount: PropTypes.func.isRequired,
  decreaseLikeAmount: PropTypes.func.isRequired,
};

export default LikedButton;
