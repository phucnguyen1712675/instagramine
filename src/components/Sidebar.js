import React from 'react';
import MainNavigation from './MainNavigation';
import {HoverScaleButton} from './styled/Lib';
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
          <HoverScaleButton>
            <SettingIcon />
          </HoverScaleButton>
        </SettingButtonWrapper>
      </Nav>
    </StyledSidebar>
  );
};

export default Sidebar;
