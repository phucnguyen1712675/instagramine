import {useState} from 'react';
import PropTypes from 'prop-types';
import {StyledReadMore, ReadOrHide} from './styled/ReadMore.styled';
import {POST_CAPTION_SHOW_CHAR} from '../constants';

const ReadMore = ({
  className,
  children,
  showChar,
  readMoreText,
  showLessText,
  readMoreLink,
}) => {
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => setIsReadMore((prevState) => !prevState);

  const readMoreTextLength = readMoreText.length;
  const showLessTextLength = showLessText.length;
  const lengthToSubtract =
    readMoreTextLength > showLessTextLength
      ? readMoreTextLength
      : showLessTextLength;

  const textContent = isReadMore
    ? `${children.slice(0, showChar - lengthToSubtract - 3)}... `
    : children;

  const readOrHideChildren = isReadMore ? readMoreText : showLessText;

  const readOrHideContent = readMoreLink ? (
    <ReadOrHide href={readMoreLink}>{readOrHideChildren}</ReadOrHide>
  ) : (
    <ReadOrHide as="span" onClick={toggleReadMore} style={{cursor: 'pointer'}}>
      {readOrHideChildren}
    </ReadOrHide>
  );

  return (
    <StyledReadMore className={className}>
      {textContent}
      {readOrHideContent}
    </StyledReadMore>
  );
};

ReadMore.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  showChar: PropTypes.number,
  readMoreText: PropTypes.string,
  showLessText: PropTypes.string,
  readMoreLink: PropTypes.string,
};

ReadMore.defaultProps = {
  showChar: POST_CAPTION_SHOW_CHAR,
  readMoreText: 'More',
  showLessText: 'Less',
};

export default ReadMore;
