import {useState} from 'react';
import PropTypes from 'prop-types';
import {StyledLikedButton} from './styled/LikedButton.styled';
import HeaderICon from './icons/HeartIcon';

const LikedButton = ({isLiked, changePostLikeAmountHandler}) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);

  const toggleIsLiked = () => setIsLikedState((prevState) => !prevState);

  const onClickLikeButtonHandler = () => {
    changePostLikeAmountHandler(isLikedState);
    toggleIsLiked();
  };

  return (
    <StyledLikedButton
      type="text"
      onClick={onClickLikeButtonHandler}
      $isLiked={isLikedState}
    >
      <HeaderICon />
    </StyledLikedButton>
  );
};

LikedButton.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  changePostLikeAmountHandler: PropTypes.func.isRequired,
};

export default LikedButton;
