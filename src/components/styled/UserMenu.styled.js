import styled, {css} from 'styled-components';
import {Dot, CircleImgWrapper} from './Lib';
import {hoverUnderline, buttonColorHover} from './Mixins';
import Avatar from '../Avatar';
import ReadMore from '../ReadMore';
import Tooltip from '../Tooltip';
import Button from '../Button';
import {DEVICES} from '../../constants';

export const StyledUserMenu = styled.div`
  --width-border: 1px;
  --padding-horizontal: 30px;
  --padding-vertical: 36px;
  grid-area: userMenu;
  position: relative;
  padding-top: var(--padding-vertical);
  padding-right: var(--padding-horizontal);
  padding-bottom: var(--padding-vertical);
  padding-left: calc(var(--padding-horizontal) - var(--width-border));
  ${({theme}) => css`
    background-color: ${theme.colors.bgComponentLightTheme};
    border-left: var(--width-border) solid ${theme.colors.borderDarkBlue};
  `}
  display: none;
  flex-direction: column;

  @media ${DEVICES.laptopL} {
    display: flex;
  }
`;

export const UserMenuTopContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

export const UserMenuMiddleContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const UserMenuBottomContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 240px;
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
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.4;
`;

export const ThumbnailContentJobDescription = styled.h5`
  color: ${({theme}) => theme.colors.secondary};
  font-size: 1.4rem;
  font-weight: 500;
`;

export const EditButtonWrapper = styled(Tooltip)`
  margin-top: 12px;
`;

export const EditButton = styled(Button)`
  padding: 7px 27px;
  ${({theme}) => `
			background-color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
		`}
`;

export const SectionTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.2rem;
`;

export const StatisticalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  padding: 32px 0 16px;
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
  font-size: 1.6rem;
  font-weight: 600;
`;

export const StatisticName = styled.div`
  color: ${({theme}) => theme.colors.secondary};
  font-size: 1.2rem;
`;

export const BioContentContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
  padding: 15px 0;
`;

export const BioContent = styled(ReadMore)`
  color: ${({theme}) => theme.colors.secondary};
  margin-top: 12px;
  line-height: 1.9rem;
`;

export const BioContentSocialLinks = styled.div`
  margin-top: 8px;
`;

export const BioContentSocialLink = styled.a`
  color: ${({theme}) => theme.colors.link};
  ${hoverUnderline}
`;

export const StoriesContent = styled.div`
  padding: 15px 0;
  flex-grow: 1;
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
  font-size: 1.2rem;
  margin-top: 8px;
  max-width: 6rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

export const StoriesContentCircleImgWrapper = styled(CircleImgWrapper)`
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
	--size: 6rem;
	width: var(--size);
	height: var(--size);
  padding: 0;
  font-size: 2.4rem;
  border: 2px solid ${({theme}) => theme.colors.primary};
  ${buttonColorHover}
`;

const gradientBackground = css`
  background: linear-gradient(
    99.27deg,
    #ff1cf6 -35.3%,
    rgba(253, 96, 28, 0.74) 66.33%,
    #de2442 138.45%
  );
`;

export const CreatePostButton = styled(Button)`
  padding: 15px 0;
  line-height: 1.3;
  position: relative;
  z-index: 1;
  font-weight: 800;
  border: unset;
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
