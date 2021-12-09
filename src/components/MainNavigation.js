import {useState} from 'react';
import Tooltip from './Tooltip';
import {NavigationButton} from './styled/MainNavigation.styled';
import {NAV_ICONS} from '../constants';

const MainNavigation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateHandler = (index) => {
    setCurrentIndex(index);
  };

  const content = NAV_ICONS.map((navItem, index) => (
    <Tooltip key={navItem.id} content={navItem.content} position="right">
      <NavigationButton
        type="text"
        onClick={() => navigateHandler(index)}
        disabledHover
        $isActive={navItem.id === currentIndex}
      >
        {navItem.icon}
      </NavigationButton>
    </Tooltip>
  ));

  return content;
};

export default MainNavigation;
