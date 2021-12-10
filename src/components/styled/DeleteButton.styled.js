import styled from 'styled-components';
import {buttonColorHover} from './Mixins';
import Button from '../Button';

export const DeleteButtonWrapper = styled.div`
  display: inline-block;

  ${({$disabled}) => $disabled && 'cursor: not-allowed;'}
`;

export const StyledDeleteButton = styled(Button)`
  ${({theme}) => buttonColorHover({color: theme.colors.danger})}
`;
