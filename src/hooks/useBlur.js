import {useRef} from 'react';

const useBlur = () => {
  const htmlRef = useRef(null);

  const setBlur = () => htmlRef.current?.blur();

  return [htmlRef, setBlur];
};

export default useBlur;
