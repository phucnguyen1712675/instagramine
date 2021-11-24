import styled from 'styled-components';
import {textStyle} from './Mixins';
import {HoverBrighterButton} from './Lib';

export const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  outline: 1px solid ${({theme}) => theme.colors.primaryBorder};
  border-radius: 30px;
  box-shadow: 0px 10px 40px rgba(222, 230, 237, 0.4);
  overflow: hidden;
`;

export const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const PostActionButton = styled(HoverBrighterButton).attrs(() => ({
  amount: 0.8,
}))`
  font-size: 1.6rem;
  color: ${({theme}) => theme.colors.postAction};

  &:last-child {
    margin-left: auto;
  }
`;

export const PostActions = styled.div.attrs(() => ({
  btnPadding: '0.8rem',
}))`
  display: flex;
  align-items: center;
  padding-left: calc(15px - ${({btnPadding}) => btnPadding});
  padding-right: calc(15px - ${({btnPadding}) => btnPadding});

  ${PostActionButton} {
    padding: ${({btnPadding}) => btnPadding};
  }
`;

export const PostLikedUsersInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 15px;
`;

export const PostLikedUsersAvatars = styled.a`
  display: inline-flex;
  flex-direction: row-reverse;
`;

export const PostLikedUsersAvatar = styled.div.attrs(() => ({
  shadowSpread: '2px',
}))`
  padding: 0;

  &:not(:first-child) {
    margin-right: calc(-1 * ${({shadowSpread}) => shadowSpread});
  }

  img {
    padding: 0;
    box-shadow: 0 0 0 ${({shadowSpread}) => shadowSpread} #fff;
  }
`;

export const PostFooter = styled.footer`
  padding-bottom: 15px;
`;

export const PostDate = styled.time`
  display: inline-block;
  ${({theme}) =>
    textStyle({
      color: theme.colors.secondary,
      fontSize: '1rem',
    })};
  margin-top: 2px;
`;

export const PostCaptionContainer = styled.div.attrs(() => ({
  paddingRight: '28px',
  paddingLeft: '15px',
}))`
  padding-top: 5px;
  padding-left: ${({paddingLeft}) => paddingLeft};
  padding-right: ${({paddingRight}) => paddingRight};

  ${PostDate} {
    padding-left: calc(
      ${({paddingRight}) => paddingRight} - ${({paddingLeft}) => paddingLeft}
    );
  }
`;

export const PostCaptionWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;

  svg {
    font-size: 0.7rem;
  }
`;

export const PostCaption = styled.p`
  ${textStyle({fontSize: '1.2rem'})};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
