import styled from 'styled-components';
import {flexColumn} from './Mixins';

export const StyledPost = styled.div`
  ${flexColumn};
  width: 300px;
  height: 480px;
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  outline: 1px solid ${({theme}) => theme.colors.primaryBorder};
  border-radius: 30px;
  box-shadow: 0px 10px 40px rgba(222, 230, 237, 0.4);
  overflow: hidden;
`;

export const PostBody = styled.div``;

export const PostFooter = styled.footer``;
