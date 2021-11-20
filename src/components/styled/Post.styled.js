import styled from 'styled-components';
import {Button} from './Lib';
import {flexCenter, flexColumn} from './Mixins';

export const StyledPost = styled.div`
  ${flexColumn};
  height: 480px;
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  outline: 1px solid ${({theme}) => theme.colors.primaryBorder};
  border-radius: 30px;
  box-shadow: 0px 10px 40px rgba(222, 230, 237, 0.4);
  overflow: hidden;
`;

export const PostBody = styled.div`
  ${flexColumn};
`;

export const PostImageWrapper = styled.div`
  padding: 15px 5px 7px;
`;

export const PostImage = styled.div`
  background-image: url(${({src}) => src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 15px;
  overflow: hidden;
  width: 100%;
  padding-top: 100%;
`;

export const PostActionButton = styled(Button)`
  font-size: 1.6rem;
  color: ${({theme}) => theme.colors.postAction};

  &:last-child {
    margin-left: auto;
  }
`;

export const PostActions = styled.div.attrs(() => ({
  btnPadding: '0.8rem',
}))`
  ${flexCenter({horizontally: false})};
  padding: 0 calc(15px - ${({btnPadding}) => btnPadding});

  ${PostActionButton} {
    padding: ${({btnPadding}) => btnPadding};
  }
`;

export const PostFooter = styled.footer``;
