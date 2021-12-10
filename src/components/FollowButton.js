import {useState} from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const FollowButton = ({className, onClick}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleIsFollowing = () => setIsFollowing((prevState) => !prevState);

  const onClickHandler = () => {
    toggleIsFollowing();
    onClick && onClick();
  };

  if (isFollowing) {
    return (
      <Button className={className} onClick={onClickHandler}>
        Following
      </Button>
    );
  }

  return (
    <Button className={className} type="primary" onClick={onClickHandler}>
      Follow
    </Button>
  );
};

FollowButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default FollowButton;
