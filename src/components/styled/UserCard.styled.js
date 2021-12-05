import styled from 'styled-components';
import {Button} from './Lib';
import {textStyle} from './Mixins';

export const StyledUserCard = styled.div`
  display: flex;
  padding: 15px;
`;

export const TextContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

export const TextContent = styled.div`
  --margin-left-info-content: 10px;
  display: flex;
  flex-direction: column;
  line-height: 1.4;
  margin-left: var(--margin-left-info-content);
`;

export const TopText = styled.a`
  ${textStyle({fontWeight: 600})};
`;

export const BottomText = styled.div`
  display: flex;
  align-items: center;
  ${({theme}) =>
    textStyle({
      color: theme.colors.secondary,
      fontWeight: 400,
      fontSize: '1rem',
    })};
`;

export const OptionWrapper = styled.div`
  align-self: center;

  ${Button} {
    padding: 0.5em;
  }
`;
