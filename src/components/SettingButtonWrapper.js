import {useState, useRef, useEffect} from 'react';
import {
  StyledSettingButtonWrapper,
  StyledSettingButton,
  FakeCheckbox,
  SettingMenu,
  SettingMenuItem,
  SettingMenuItemLink,
  SettingMenuItemText,
} from './styled/SettingButton.styled';
import SettingIcon from './icons/SettingIcon';
import UserIcon from './icons/UserIcon';
import MenuSettingIcon from './icons/MenuSettingIcon';

const SettingButtonWrapper = () => {
  const [checked, setChecked] = useState(false);

  const tooltipRef = useRef(null);

  useEffect(() => {
    if (checked) {
      tooltipRef.current.setShowState(false);
    }
  }, [checked]);

  const onChangeHandler = (e) => setChecked(e.target.checked);

  return (
    <StyledSettingButtonWrapper
      ref={tooltipRef}
      content="Settings"
      position="right"
      trigger={checked ? 'none' : 'hover'}
    >
      <FakeCheckbox id="checkbox_setting_menu" onChange={onChangeHandler} />
      <StyledSettingButton htmlFor="checkbox_setting_menu">
        <SettingIcon />
      </StyledSettingButton>
      <SettingMenu>
        <SettingMenuItem>
          <SettingMenuItemLink href="#">
            <UserIcon />
            <SettingMenuItemText>Profile</SettingMenuItemText>
          </SettingMenuItemLink>
        </SettingMenuItem>
        <SettingMenuItem>
          <SettingMenuItemLink href="#">
            <MenuSettingIcon />
            <SettingMenuItemText>Settings</SettingMenuItemText>
          </SettingMenuItemLink>
        </SettingMenuItem>
        <SettingMenuItem>
          <SettingMenuItemLink href="#">Log Out</SettingMenuItemLink>
        </SettingMenuItem>
      </SettingMenu>
    </StyledSettingButtonWrapper>
  );
};

export default SettingButtonWrapper;
