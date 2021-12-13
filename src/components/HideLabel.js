import React from 'react';
import PropTypes from 'prop-types';
import {VisuallyHidden} from './styled/HideLabel.styled';

const HideLabel = ({children, htmlFor}) => {
  return (
    <label htmlFor={htmlFor}>
      <VisuallyHidden>{children}</VisuallyHidden>
    </label>
  );
};

HideLabel.propTypes = {
  children: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
};

export default HideLabel;
