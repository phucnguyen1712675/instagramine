import styled from 'styled-components';

export const DeleteButtonWrapper = styled.div`
  display: inline-block;

  ${({$disabled}) => $disabled && 'cursor: not-allowed;'}
`;
