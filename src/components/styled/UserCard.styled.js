import styled from 'styled-components';
import {StyledAvatar} from './Avatar.styled';
import {Button} from './Lib';
import {textStyle} from './Mixins';

export const StyledUserCard = styled.div`
  display: flex;
  padding: 15px;

  ${StyledAvatar} {
    margin-right: 10px;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  line-height: 1.4;
`;

export const InfoContentUsername = styled.a`
  ${textStyle({fontWeight: 600})};
`;

export const AdditionalInfoContent = styled.div`
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
