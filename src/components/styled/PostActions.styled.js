import styled from 'styled-components';
import {HoverBrighterButton} from './Lib';
import {flexCenter} from './Mixins';

export const PostActionButton = styled(HoverBrighterButton).attrs(() => ({
  amount: 0.8,
}))`
  font-size: 1.6rem;
  color: ${({theme}) => theme.colors.postAction};

  &:last-child {
    margin-left: auto;
  }
`;

export const StyledPostActions = styled.div.attrs(() => ({
  btnPadding: '0.8rem',
}))`
  ${flexCenter({horizontally: false})};
  padding: calc(15px - ${({btnPadding}) => btnPadding})
    calc(15px - ${({btnPadding}) => btnPadding}) 0;

  ${PostActionButton} {
    padding: ${({btnPadding}) => btnPadding};
  }
`;
