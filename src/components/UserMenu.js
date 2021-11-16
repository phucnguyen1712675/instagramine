import React from 'react';
import {StyledUserMenu, NotificationButton} from './styled/UserMenu.styled';
import BellIcon from './icons/BellIcon';

const UserMenu = () => {
  return (
    <StyledUserMenu>
      <NotificationButton>
        <BellIcon />
      </NotificationButton>
    </StyledUserMenu>
  );
};

export default UserMenu;
