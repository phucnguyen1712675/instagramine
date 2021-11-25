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

export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
  flex: 1;
`;

export const PostTopContent = styled.div`
  /* flex: 1; */
`;

export const PostBottomContent = styled.div`
  margin-top: auto;
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

export const PostLikedUsersAvatar = styled.div`
  padding: 0;

  &:not(:first-child) {
    margin-right: -4.5px;
  }

  img {
    padding: 0;
		border: 1.5px solid #fff;
  }
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
`;

