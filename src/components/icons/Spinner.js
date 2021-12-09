import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledSpinner,
  Bar1,
  Bar2,
  Bar3,
  Bar4,
  Bar5,
  Bar6,
  Bar7,
  Bar8,
  Bar9,
  Bar10,
  Bar11,
  Bar12,
} from '../styled/Spinner.styled';

const Spinner = ({className}) => {
  return (
    <StyledSpinner className={className}>
      <Bar1 />
      <Bar2 />
      <Bar3 />
      <Bar4 />
      <Bar5 />
      <Bar6 />
      <Bar7 />
      <Bar8 />
      <Bar9 />
      <Bar10 />
      <Bar11 />
      <Bar12 />
    </StyledSpinner>
  );
};

Spinner.propTypes = {
  className: PropTypes.string,
};

export default Spinner;
