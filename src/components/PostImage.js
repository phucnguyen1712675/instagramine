import React from 'react';
import PropTypes from 'prop-types';
import {StyledPostImage} from './styled/PostImage.styled';
import {onErrorMedia} from '../utils/media';

const PostImage = ({className, src}) => {
  return (
    <StyledPostImage className={className} src={src} onError={onErrorMedia} />
  );
};

PostImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
};

export default PostImage;
