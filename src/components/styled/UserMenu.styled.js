import styled, {css} from 'styled-components';
import {
  HoverScaleButton,
  Button,
  HoverBrighterButton,
  Dot,
  CircleImg,
} from './Lib';
import {flexColumn, flexCenter, textStyle, sizeCircle} from './Mixins';
import {StyledAvatar} from './Avatar.styled';

const gradientBackground = css`
  background: linear-gradient(
    99.27deg,
    #ff1cf6 -35.3%,
    rgba(253, 96, 28, 0.74) 66.33%,
    #de2442 138.45%
  );
`;

export const CreatePostButton = styled(HoverBrighterButton).attrs(() => ({
  heightBlur: '40px',
}))`
  width: 100%;
  margin-top: 45px;
  padding: 15px 0;
  border-radius: 5px;
  ${textStyle({
    color: '#fff',
    fontWeight: 800,
  })}
  line-height: 1.3;
  ${gradientBackground}
  position: relative;
  z-index: 1;

  &:after {
    content: '';
    position: absolute;
    top: 23px;
    height: ${({heightBlur}) => heightBlur};
    ${gradientBackground}
    filter: blur(${({heightBlur}) => heightBlur});
    z-index: -1;
  }
`;

export const StyledUserMenu = styled.div.attrs(() => ({
  widthBorder: '1px',
  paddingVertical: '36px',
}))`
  grid-area: userMenu;
  display: flex;

  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  border-left: ${({widthBorder}) => widthBorder} solid
    ${({theme}) => theme.colors.primaryBorderDark};
  position: relative;
  padding: ${({paddingVertical}) => paddingVertical} 30px
    ${({paddingVertical}) => paddingVertical}
    calc(30px - ${({widthBorder}) => widthBorder});

  ${CreatePostButton}:after {
    width: calc(
      ${({theme}) => theme.userMenuWidth} -
        (${({paddingVertical}) => paddingVertical} + 28px) * 2
    );
  }
`;

export const UserMenuInner = styled.div`
  ${flexColumn}
  justify-content: flex-end;
`;

export const NotificationButton = styled(HoverScaleButton).attrs(() => ({
  distance: '24px',
}))`
  position: absolute;
  top: ${({distance}) => distance};
  right: ${({distance}) => distance};
	font-size: 2.4rem;
  padding: 8px;
`;

export const ThumbnailContent = styled.div`
  ${flexCenter({direction: 'column'})}
  line-height: 1.4;

  ${StyledAvatar} {
    cursor: pointer;
  }

  h2 {
    margin-top: 16px;
    ${({theme}) =>
    textStyle({
      fontSize: '2rem',
      color: theme.colors.primary,
      fontWeight: 600,
    })}
  }

  h5 {
    ${({theme}) =>
    textStyle({
      color: theme.colors.secondary,
    })}
  }
`;

export const EditButton = styled(HoverBrighterButton)`
 	margin-top: 12px;
  background-color: ${({theme}) => theme.colors.primary};
  color: #fff;
  padding: 0.7rem 2.7rem;
  border-radius: 5px;
`;

export const StatisticalContent = styled.div`
  ${flexCenter}
  margin-top: 32px;
`;

export const StatisticalContentInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${Dot} {
    color: #6d6c76;
  }
`;

export const StatisticItem = styled.div`
  ${flexCenter({direction: 'column'})}
  row-gap: 2px;
  line-height: 1.4;
  width: 60px;
`;

export const StatisticNumber = styled.div`
  ${({theme}) =>
    textStyle({
      fontSize: '1.6rem',
      color: theme.colors.primary,
      fontWeight: 600,
    })}
`;

export const StatisticName = styled.div`
  ${({theme}) =>
    textStyle({
      fontSize: '1.2rem',
      color: theme.colors.secondary,
    })}
`;

export const BioContent = styled.div`
  /* margin-top: 50px; */
  ${flexCenter({vertically: false, direction: 'column'})}
  height: 25vh;
`;

export const BioContentUsername = styled.div`
  ${({theme}) =>
    textStyle({
      fontSize: '1.6rem',
      color: theme.colors.primary,
      fontWeight: 600,
    })}
  line-height: 2.2rem;
`;

export const BioContentBio = styled.div`
  ${({theme}) =>
    textStyle({
      color: theme.colors.secondary,
    })}
  margin-top: 12px;
  line-height: 1.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const BioContentSocialLinks = styled.div`
  margin-top: 8px;
`;

export const BioContentSocialLink = styled.a`
  ${({theme}) =>
    textStyle({
      color: theme.colors.link,
    })}
`;

export const StoriesContent = styled.div`
  /* margin-top: 48px; */
`;

export const StoriesContentTitle = styled.h3`
  ${({theme}) =>
    textStyle({
      fontSize: '1.6rem',
      color: theme.colors.primary,
      fontWeight: 600,
    })}
`;

export const StoriesContentStoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 2.4rem;
  column-gap: 2rem;
  margin-top: 2.4rem;
`;

export const StoriesContentStoryItem = styled.li`
  cursor: pointer;
  text-align: center;

  div {
    ${flexColumn}
  }

  p {
    ${({theme}) =>
    textStyle({
      fontSize: '1.2rem',
      color: theme.colors.primary,
    })}
    margin-top: 8px;
    max-width: ${({theme}) => theme.storyThumbnailSize};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:last-child {
    align-self: flex-start;
  }
`;

export const StoriesContentCircleImg = styled(CircleImg)`
  overflow: hidden;

  img {
    ${({size}) => sizeCircle({size})}
    transition: transform 0.2s ease-out;
  }

  &:hover img {
    transform: scale(1.2);
  }
`;

export const PlayButton = styled(Button)`
  ${sizeCircle({size: '6rem'})}
  border: 2px solid ${({theme}) => theme.colors.primary};
  font-size: 2.4rem;
  ${flexCenter}
`;
