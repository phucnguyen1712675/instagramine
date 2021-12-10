import React from 'react';
import PropTypes from 'prop-types';
import {
  DeleteButtonWrapper,
  StyledDeleteButton,
} from './styled/DeleteButton.styled';

const DeleteButton = ({className, children, onClick, loading, disabled}) => {
  return (
    <DeleteButtonWrapper className={className} $disabled={disabled}>
      <StyledDeleteButton
        disabled={disabled}
        onClick={onClick}
        loading={loading}
        disabledHover
      >
        {children}
      </StyledDeleteButton>
    </DeleteButtonWrapper>
  );
};
DeleteButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

DeleteButton.displayName = 'DeleteButton';

export default DeleteButton;
