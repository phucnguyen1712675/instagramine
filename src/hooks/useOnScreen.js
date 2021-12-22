import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const useOnScreen = ({ref, rootMargin = '0px'}) => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    let observerRefValue = null; // <-- variable to hold ref value

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
      observerRefValue = ref.current; // <-- save ref value
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [ref, rootMargin]); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
};

useOnScreen.propTypes = {
  ref: PropTypes.object.isRequired,
  rootMargin: PropTypes.string,
};

export {useOnScreen};
