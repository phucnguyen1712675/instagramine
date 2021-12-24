import {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

const useMemoCompare = ({next, compare}) => {
  // Ref for storing previous value
  const previousRef = useRef();
  const previous = previousRef.current;

  // Pass previous and next value to compare function
  // to determine whether to consider them equal.
  const isEqual = compare(previous, next);

  // If not equal update previousRef to next value.
  // We only update if not equal so that this hook continues to return
  // the same old value if compare keeps returning true.
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });

  // Finally, if equal then return the previous value
  return isEqual ? previous : next;
};

useMemoCompare.propTypes = {
  next: PropTypes.object.isRequired,
  compare: PropTypes.func.isRequired,
};

export default useMemoCompare;

// // Use the previous obj value if the "id" property hasn't changed
// const objFinal = useMemoCompare(obj, (prev, next) => {
// 	return prev && prev.id === next.id;
// });
