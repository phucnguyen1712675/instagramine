import {useState, forwardRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';
import {StyledTooltip, TooltipContent} from './styled/Tooltip.styled';

const Tooltip = forwardRef(
  ({className, children, content, position, trigger}, ref) => {
    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({
      setShowState: (value) => setShow(value),
    }));

    const mouseInHandler = () => setShow(true);

    const mouseOutHandler = () => setShow(false);

    const onClickHandler = () => setShow((prevState) => !prevState);

    return (
      <StyledTooltip
        className={className}
        onMouseOver={trigger === 'hover' ? mouseInHandler : null}
        onMouseLeave={trigger === 'hover' ? mouseOutHandler : null}
        onClick={trigger === 'click' ? onClickHandler : null}
      >
        {show && (
          <TooltipContent
            position={position}
            dangerouslySetInnerHTML={{__html: content}}
          />
        )}
        {children}
      </StyledTooltip>
    );
  }
);

Tooltip.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  content: PropTypes.string.isRequired,
  position: PropTypes.string,
  trigger: PropTypes.string,
};

Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {
  position: 'top',
  trigger: 'hover',
};

export default Tooltip;
