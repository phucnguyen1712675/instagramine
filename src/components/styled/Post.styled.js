import styled from 'styled-components';
import {
  flexColumn,
  flexCenter,
  hoverUnderline,
  textStyle,
  // hideScrollBarScrolling,
} from './Mixins';

export const StyledPost = styled.div`
  ${flexColumn};
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  outline: 1px solid ${({theme}) => theme.colors.primaryBorder};
  border-radius: 30px;
  box-shadow: 0px 10px 40px rgba(222, 230, 237, 0.4);
  overflow: hidden;
`;

export const PostBody = styled.div`
  ${flexColumn};
`;

export const PostMedia = styled.div`
  padding: 15px 5px 0;
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

export const PostCarousel = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 100%;
  overflow-x: auto;
`;

export const PostLikedUsersInfo = styled.div`
  ${flexCenter({horizontally: false})};
  justify-content: space-between;
  padding: 7px 15px;
`;

export const PostLikedUsersStatement = styled.p`
  ${({theme}) =>
    textStyle({
      color: theme.colors.primary,
      fontSize: '1.2rem',
      fontWeight: 400,
    })};
`;

export const PostLikedUsersHighlight = styled.a`
  font-weight: 800;
  color: inherit;
  ${hoverUnderline}
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

export const PostDate = styled.time`
  ${({theme}) =>
    textStyle({
      color: theme.colors.secondary,
      fontSize: '1rem',
    })};
  margin-top: 2px;
`;

// export const PostCaptionSection = styled.div.attrs(() => ({
//   paddingRight: '28px',
//   paddingLeft: '15px',
// }))`
//   padding: 5px 28px 15px 15px;

//   ${PostDate} {
//     padding-left: calc(
//       ${({paddingRight}) => paddingRight} - ${({paddingLeft}) => paddingLeft}
//     );
//   }
// `;

export const PostCaptionWrapper = styled.div`
  ${flexCenter({horizontally: false})};
  column-gap: 6px;

  svg {
    font-size: 0.7rem;
  }
`;

export const PostCaption = styled.p`
  ${({theme}) =>
    textStyle({
      color: theme.colors.primary,
      fontSize: '1.2rem',
    })};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PostFooter = styled.footer.attrs(() => ({
  paddingRight: '28px',
  paddingLeft: '15px',
}))`
  padding: 5px 28px 15px 15px;

  ${PostDate} {
    padding-left: calc(
      ${({paddingRight}) => paddingRight} - ${({paddingLeft}) => paddingLeft}
    );
  }
`;
