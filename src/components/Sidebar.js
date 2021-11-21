import React from 'react';
import MainNavigation from './MainNavigation';
import {
  StyledSidebar,
  Nav,
  SettingButtonWrapper,
  SettingButton,
} from './styled/Sidebar.styled';
import SettingIcon from './icons/SettingIcon';

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Nav>
        <MainNavigation />
        <SettingButtonWrapper>
          <SettingButton>
            <SettingIcon />
          </SettingButton>
        </SettingButtonWrapper>
      </Nav>
    </StyledSidebar>
  );
};

export default Sidebar;
