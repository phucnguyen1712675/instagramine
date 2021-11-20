import styled from 'styled-components';
import {StyledAvatar} from './Avatar.styled';
import {Button} from './Lib';
import {textStyle, flexCenter, flexColumn} from './Mixins';

export const StyledUserCard = styled.div`
  display: flex;
  padding: 15px;

  ${StyledAvatar} {
    margin-right: 10px;
  }
`;

export const InfoWrapper = styled.div`
  ${flexCenter({horizontally: false})};
  flex-grow: 1;
`;

export const InfoContent = styled.div`
  ${flexColumn}
  font-size: 1.4rem;
  line-height: 1.4;
`;

export const InfoContentUsername = styled.a`
  ${({theme}) => textStyle({color: theme.colors.primary, fontWeight: 600})};
`;

export const AdditionalInfoContent = styled.div`
  ${flexCenter({horizontally: false})};
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
