import React from 'react';
import PropTypes from 'prop-types';
import {StyledButton, ButtonSpinner} from './styled/Button.styled';

const Button = ({
  type = 'default',
  htmlType = 'button',
  shape = 'default',
  size = 'middle',
  danger = false,
  block = false,
  loading = false,
  disabled = false,
  disabledHover = false,
  className,
  children,
  icon,
  onClick,
  onMouseDown,
}) => {
  let content = null;

  if (loading) {
    content = <ButtonSpinner $size={size} />;
  } else if (icon) {
    content = icon;
  } else {
    content = children;
  }

  return (
    <StyledButton
      className={className}
      type={htmlType}
      onClick={onClick}
      onMouseDown={onMouseDown}
      disabled={disabled}
      $type={type}
      $shape={shape}
      $block={block}
      $danger={danger}
      $size={size}
      $disabledHover={disabledHover}
      $loading={loading}
    >
      {content}
    </StyledButton>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
  type: PropTypes.oneOf(['primary', 'link', 'text', 'default']),
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  loading: PropTypes.bool,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
  shape: PropTypes.oneOf(['circle', 'round', 'default']),
  size: PropTypes.oneOf(['small', 'middle', 'large']),
  disabledHover: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.node,
};

export default Button;
