import {useState} from 'react';
import PropTypes from 'prop-types';
import {StyledLikedButton} from './styled/LikedButton.styled';
import HeaderICon from './icons/HeartIcon';

const LikedButton = ({isLiked, changePostLikeAmountHandler}) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);

  const likePostHandler = () => {
    changePostLikeAmountHandler(isLikedState);
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
  changePostLikeAmountHandler: PropTypes.func.isRequired,
};

export default LikedButton;
