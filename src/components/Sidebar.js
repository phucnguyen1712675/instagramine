import React from 'react';
import MainNavigation from './MainNavigation';
import {Button} from './styled/Lib';
import {
  StyledSidebar,
  Nav,
  SettingButtonWrapper,
} from './styled/Sidebar.styled';
import SettingIcon from './icons/SettingIcon';

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Nav>
        <MainNavigation />
        <SettingButtonWrapper>
          <Button fontSize={2.4}>
            <SettingIcon />
          </Button>
        </SettingButtonWrapper>
      </Nav>
    </StyledSidebar>
  );
};

export default Sidebar;
