import {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {FakeCheckbox, OverlayLabel} from './styled/Lib';
import {
  StyledOverlayMenuIconButtonWithTooltip,
  LabelButton,
  Menu,
} from './styled/OverlayMenuIconButtonWithTooltip.styled';

const OverlayMenuIconButtonWithTooltip = ({
  className,
  children,
  checkboxId,
  tooltipTitle,
  tooltipPosition,
  icon,
  onOpen,
  onClose,
}) => {
  const [checked, setChecked] = useState(false);

  const tooltipRef = useRef(null);

  useEffect(() => {
    if (checked) {
      tooltipRef.current.setShowState(false);

      onOpen && onOpen();

      return () => {
        onClose && onClose();
      };
    }
  }, [checked, onOpen, onClose]);

  const onChangeHandler = (e) => setChecked(e.target.checked);

  return (
    <StyledOverlayMenuIconButtonWithTooltip
      className={className}
      ref={tooltipRef}
      content={tooltipTitle}
      position={tooltipPosition}
      trigger={checked ? 'none' : 'hover'}
    >
      <FakeCheckbox id={checkboxId} onChange={onChangeHandler} />
      <LabelButton htmlFor={checkboxId}>{icon}</LabelButton>
      <OverlayLabel htmlFor={checkboxId} />
      <Menu>{children}</Menu>
    </StyledOverlayMenuIconButtonWithTooltip>
  );
};

OverlayMenuIconButtonWithTooltip.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  checkboxId: PropTypes.string.isRequired,
  tooltipTitle: PropTypes.string.isRequired,
  tooltipPosition: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default OverlayMenuIconButtonWithTooltip;
