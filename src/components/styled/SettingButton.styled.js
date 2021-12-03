import styled from 'styled-components';
// import {TooltipContent} from './Tooltip.styled';
import Tooltip from '../Tooltip';

export const FakeCheckbox = styled.input.attrs(() => ({
  type: 'checkbox',
}))`
  display: none;
`;

export const StyledSettingButtonWrapper = styled(Tooltip)`
  position: absolute;
  bottom: 34px;
`;

export const StyledSettingButton = styled.label`
  font-size: 2.4rem;
  cursor: pointer;
  position: relative;
`;

export const SettingMenu = styled.ul`
  position: absolute;
  bottom: 50%;
  left: 100%;
  border-radius: 6px;
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  z-index: 1;
  overflow: hidden;
  display: none;

  ${FakeCheckbox}:checked ~ & {
    display: block;
  }
`;

export const SettingMenuItem = styled.li`
  padding: 14px 20px;
  font-size: 1.4rem;

  &:hover {
    background-color: ${({theme}) => theme.colors.menuItemHover};
  }

  &:last-child {
    border-top: 1px solid #dbdbdb;
  }
`;

export const SettingMenuItemLink = styled.a`
  display: flex;
  align-items: center;
`;

export const SettingMenuItemText = styled.span`
  margin-left: 12px;
`;
