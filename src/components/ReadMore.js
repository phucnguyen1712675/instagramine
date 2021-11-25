import {useState} from 'react';
import PropTypes from 'prop-types';
import {StyledReadMore, ReadOrHide} from './styled/ReadMore.styled';

const ReadMore = ({
  className,
  children,
  showChar,
  readMoreText,
  showLessText,
  ellipsesText,
  readMoreLink,
}) => {
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => setIsReadMore((prevState) => !prevState);

  const textContent = isReadMore
    ? `${children.slice(0, showChar)}${ellipsesText} `
    : children;

  const readOrHideContent = readMoreLink ? (
    <ReadOrHide href={readMoreLink}>
      ({isReadMore ? readMoreText : showLessText})
    </ReadOrHide>
  ) : (
    <ReadOrHide as="span" onClick={toggleReadMore} style={{cursor: 'pointer'}}>
      ({isReadMore ? readMoreText : showLessText})
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
  ellipsesText: PropTypes.string,
  readMoreLink: PropTypes.string,
};

ReadMore.defaultProps = {
  showChar: 150,
  readMoreText: 'More',
  showLessText: 'Less',
  ellipsesText: '...',
};

export default ReadMore;
