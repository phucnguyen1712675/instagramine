import React from 'react';
import PropTypes from 'prop-types';

const Compose = ({children, components}) => {
  return (
    <>
      {components.reduceRight(
        (acc, Comp) => (
          <Comp>{acc}</Comp>
        ),
        children
      )}
    </>
  );
};

Compose.propTypes = {
  children: PropTypes.node.isRequired,
  components: PropTypes.arrayOf(PropTypes.elementType),
};

Compose.defaultProps = {
  components: [],
};

export default Compose;
