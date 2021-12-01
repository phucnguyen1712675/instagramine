import {useState} from 'react';
import PropTypes from 'prop-types';
import {StyledPostVideo} from './styled/PostVideo.styled';
import {ONERROR_VIDEO_PLACEHOLDER} from '../constants';
import {onErrorMedia} from '../utils/media';

const PostVideo = ({className, src}) => {
  const [hasError, setError] = useState(false);

  const onErrorHandler = (e) => {
    setError(true);
    onErrorMedia(e, ONERROR_VIDEO_PLACEHOLDER);
  };

  if (hasError) {
    return <StyledPostVideo as="img" className={className} src={src} />;
  }

  return (
    <StyledPostVideo className={className} onError={onErrorHandler} controls>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </StyledPostVideo>
  );
};

PostVideo.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
};

export default PostVideo;
