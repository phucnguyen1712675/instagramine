import styled from 'styled-components';
import {FakeCheckbox} from './Lib';
import Tooltip from '../Tooltip';

export const StyledOverlayMenuIconButtonWithTooltip = styled(Tooltip)`
  position: relative;
`;

export const LabelButton = styled.label`
  cursor: pointer;
  font-size: 2.4rem;
`;

export const Menu = styled.ul`
  position: absolute;
  border-radius: 6px;
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  z-index: 3;
  overflow: hidden;
  display: none;

  ${FakeCheckbox}:checked ~ & {
    display: block;
  }
`;


