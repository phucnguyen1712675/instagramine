import {useState} from 'react';
import {NavigationButton} from './styled/MainNavigation.styled';
import navIcons from '../constants/navIcons';

const MainNavigation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateHandler = (idx) => {
    setCurrentIndex(idx);
  };

  return (
    <>
      {navIcons.map((btn, idx) => (
        <NavigationButton
          key={btn.id}
          fontSize={3}
          onClick={() => navigateHandler(idx)}
          isActive={btn.id === currentIndex}
        >
          {btn.icon}
        </NavigationButton>
      ))}
    </>
  );
};

export default MainNavigation;
