import {useState} from 'react';
import {NavigationButton} from './styled/MainNavigation.styled';
import {NAV_ICONS} from '../constants';

const MainNavigation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateHandler = (index) => {
    setCurrentIndex(index);
  };

  const content = NAV_ICONS.map((btn, index) => (
    <NavigationButton
      key={btn.id}
      onClick={() => navigateHandler(index)}
      isActive={btn.id === currentIndex}
    >
      {btn.icon}
    </NavigationButton>
  ));

  return content;
};

export default MainNavigation;
