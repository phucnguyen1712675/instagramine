import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const useOnScreen = ({ref, rootMargin}) => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
};

useOnScreen.propTypes = {
  ref: PropTypes.object.isRequired,
  rootMargin: PropTypes.string,
};

useOnScreen.defaultProps = {
  rootMargin: '0px',
};

export {useOnScreen};
