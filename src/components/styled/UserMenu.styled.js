import styled from 'styled-components';
import {Button, HoverBrighterButton, Dot, CircleImg} from './Lib';
import {textStyle, circle, hoverUnderline} from './Mixins';
import Avatar from '../Avatar';
import ReadMore from '../ReadMore';
import Tooltip from '../Tooltip';

const gradientBackground = `
	background: linear-gradient(
	99.27deg,
	#ff1cf6 -35.3%,
	rgba(253, 96, 28, 0.74) 66.33%,
	#de2442 138.45%);
`;

export const StyledUserMenu = styled.div`
  --width-border: 1px;
  --padding-horizontal: 30px;
  --padding-vertical: 36px;
  grid-area: userMenu;
  position: relative;
  display: flex;
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  border-left: var(--width-border) solid
    ${({theme}) => theme.colors.primaryBorderDark};
  padding: var(--padding-vertical) var(--padding-horizontal)
    var(--padding-vertical)
    calc(var(--padding-horizontal) - var(--width-border));
`;

export const UserMenuInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const NotificationButtonWrapper = styled(Tooltip)`
  --distance: 24px;
  position: absolute;
  top: var(--padding-vertical);
  right: var(--padding-vertical);
`;

export const NotificationButton = styled(Button)`
  font-size: 2.4rem;
  padding: 8px;
`;

export const ThumbnailContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  line-height: 1.4;
`;

export const ThumbnailContentAvatar = styled(Avatar)`
  --size: 8rem;
  cursor: pointer;
`;

export const ThumbnailContentUserName = styled.h2`
  margin-top: 16px;
  ${textStyle({
    fontSize: '2rem',
    fontWeight: 600,
  })}
`;

export const ThumbnailContentJobDescription = styled.h5`
  ${({theme}) => textStyle({color: theme.colors.secondary})}
`;

export const EditButtonWrapper = styled(Tooltip)`
  margin-top: 12px;
`;

export const EditButton = styled(HoverBrighterButton)`
  background-color: ${({theme}) => theme.colors.primary};
  color: #fff;
  padding: 0.7rem 2.7rem;
  border-radius: 5px;
`;

export const StatisticalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
`;

export const StatisticalContentInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StatisticalContentInnerDot = styled(Dot)`
  color: #6d6c76;
`;

export const StatisticItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 2px;
  line-height: 1.4;
  width: 60px;
`;

export const StatisticNumber = styled.div`
  ${textStyle({
    fontSize: '1.6rem',
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

export const BioContentContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 25vh;
`;

export const BioContentUsername = styled.div`
  ${textStyle({
    fontSize: '1.6rem',
    fontWeight: 600,
  })}
  line-height: 2.2rem;
`;

export const BioContent = styled(ReadMore)`
  ${({theme}) => textStyle({color: theme.colors.secondary})}
  margin-top: 12px;
  line-height: 1.9rem;
`;

// export const StyledBioContent = styled.p`
//   display: inline;
//   ${styledBioContent}

//   ${({shouldTruncate}) =>
//     shouldTruncate &&
//     `display: -webkit-box;
//   -webkit-line-clamp: 1;
//   -webkit-box-orient: vertical;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   word-break: break-word;`}
// `;

export const BioContentSocialLinks = styled.div`
  margin-top: 8px;
`;

export const BioContentSocialLink = styled.a`
  ${({theme}) =>
    textStyle({
      color: theme.colors.link,
    })}
  ${hoverUnderline}
`;

export const StoriesContent = styled.div``;

export const StoriesContentTitle = styled.h3`
  ${textStyle({
    fontSize: '1.6rem',
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

  &:last-child {
    align-self: flex-start;
  }
`;

export const StoriesContentStoryItemInner = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StoriesContentStoryItemName = styled.p`
  ${textStyle({fontSize: '1.2rem'})}
  margin-top: 8px;
  max-width: 6rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

export const StoriesContentCircleImgWrapper = styled(CircleImg)`
  --size: 6rem;
  overflow: hidden;
`;

export const StoriesContentCircleImg = styled.img`
  transition: transform 0.2s ease-out;

  ${StoriesContentCircleImgWrapper}:hover & {
    transform: scale(1.2);
  }
`;

export const PlayButton = styled(Button)`
  ${circle({w: '6rem'})}
  border: 2px solid ${({theme}) => theme.colors.primary};
  font-size: 2.4rem;
`;

export const CreatePostButton = styled(HoverBrighterButton)`
  width: 100%;
  margin-top: 45px;
  padding: 15px 0;
  border-radius: 5px;
  line-height: 1.3;
  position: relative;
  z-index: 1;
  ${textStyle({
    color: '#fff',
    fontWeight: 800,
  })}
  ${gradientBackground}

  &:after {
    --height-blur: 40px;
    content: '';
    position: absolute;
    top: 23px;
    width: calc(var(--width-user-menu) - (var(--padding-vertical) + 28px) * 2);
    height: var(--height-blur);
    filter: blur(var(--height-blur));
    ${gradientBackground}
    z-index: -1;
  }
`;
