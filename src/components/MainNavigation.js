import {useState} from 'react';
import {NavigationButton} from './styled/MainNavigation.styled';
import navIcons from '../constants/nav-icons';

const MainNavigation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateHandler = (idx) => {
    setCurrentIndex(idx);
  };

  const content = navIcons.map((btn, idx) => (
    <NavigationButton
      key={btn.id}
      onClick={() => navigateHandler(idx)}
      isActive={btn.id === currentIndex}
    >
      {btn.icon}
    </NavigationButton>
  ));

  return content;
};

export default MainNavigation;
