import {useRef, useEffect} from 'react';

const useMounted = () => {
  const isMounted = useRef();

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

export default useMounted;
