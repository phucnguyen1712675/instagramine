import styled from 'styled-components';
import {hoverUnderline} from './Mixins';

export const StyledReadMore = styled.p`
  width: 100%;
`;

export const ReadOrHide = styled.a`
  font-weight: 800;
  ${hoverUnderline};
`;
