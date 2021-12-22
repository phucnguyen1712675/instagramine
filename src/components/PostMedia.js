import {useState} from 'react';
import PropTypes from 'prop-types';
import {PostImage, PostVideo} from './styled/PostMedia.styled';
import {
  ONERROR_IMAGE_PLACEHOLDER,
  ONERROR_VIDEO_PLACEHOLDER,
} from '../constants';

const PostMedia = ({className, type, url}) => {
  const [hasError, setError] = useState(false);

  const errorHandler = (e) => {
    e.target.onerror = null;
    setError(true);
  };

  const placeholder =
    type === 'image' ? ONERROR_IMAGE_PLACEHOLDER : ONERROR_VIDEO_PLACEHOLDER;

  if (hasError) {
    return <PostImage className={className} src={placeholder} />;
  }

  if (type === 'image') {
    return (
      <PostImage className={className} src={url} onError={errorHandler} />
    );
  }

  return (
    <PostVideo className={className} onError={errorHandler} controls>
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </PostVideo>
  );
};

PostMedia.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default PostMedia;
