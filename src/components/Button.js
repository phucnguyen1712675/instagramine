import React from 'react';
import PropTypes from 'prop-types';
import {StyledButton, ButtonSpinner} from './styled/Button.styled';

const Button = ({
  className,
  loading,
  children,
  icon,
  shape,
  type,
  htmlType,
  onClick,
  onMouseDown,
  block,
  disabled,
  danger,
  size,
  disabledHover,
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

Button.defaultProps = {
  htmlType: 'button',
  type: 'default',
  loading: false,
  block: false,
  disabled: false,
  danger: false,
  shape: 'default',
  size: 'middle',
  disabledHover: false,
};

export default Button;
