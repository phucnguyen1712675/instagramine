import styled from 'styled-components';
import {textStyle, hoverUnderline} from './Mixins';
import {HoverBrighterButton} from './Lib';
import {InfoContentUsername} from './UserCard.styled';
import UserCard from '../UserCard';
import Avatar from '../Avatar';
import QuotationMarkIcon from '../icons/QuotationMarkIcon';
import ThreeDotsIcon from '../icons/ThreeDotsIcon';

export const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  outline: 1px solid ${({theme}) => theme.colors.primaryBorder};
  border-radius: 30px;
  box-shadow: 0px 10px 40px rgba(222, 230, 237, 0.4);
  overflow: hidden;
`;

export const PostHeader = styled(UserCard)`
  ${InfoContentUsername} {
    ${hoverUnderline}
  }
  flex-shrink: 0;
`;

export const PostHeaderLocation = styled.a``;

export const MoreOptionButton = styled(HoverBrighterButton)`
  font-size: 1.8rem;
`;

export const MoreOptionButtonIcon = styled(ThreeDotsIcon)`
  color: ${({theme}) => theme.colors.blueAlphaAction};
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

export const PostActions = styled.div`
  --padding-btn: 0.8rem;
  display: flex;
  align-items: center;
  padding-left: calc(15px - var(--padding-btn));
  padding-right: calc(15px - var(--padding-btn));
`;

export const PostActionButton = styled(HoverBrighterButton)`
  --amount: 0.8;
  font-size: 1.6rem;
  padding: var(--padding-btn);
  color: ${({theme}) => theme.colors.postAction};

  &:last-child {
    margin-left: auto;
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

export const PostLikedUsersAvatar = styled(Avatar)`
  --size: 1.5rem;
  padding: 0;

  &:not(:first-child) {
    margin-right: -4.5px;
  }

  img {
    padding: 0;
    border: 1.5px solid #fff;
  }
`;

export const PostCaptionContainer = styled.div`
  --paddingRight: 28px;
  --paddingLeft: 15px;
  padding-top: 5px;
  padding-left: var(--paddingLeft);
  padding-right: var(--paddingRight);
`;

export const PostDate = styled.time`
  display: inline-block;
  margin-top: 2px;
  padding-left: calc(var(--paddingRight) - var(--paddingLeft));
  ${({theme}) =>
    textStyle({
      color: theme.colors.secondary,
      fontSize: '1rem',
    })};
`;

export const PostCaptionWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;
`;

export const PostCaptionWrapperIcon = styled(QuotationMarkIcon)`
  font-size: 0.7rem;
`;

export const PostCaption = styled.p`
  ${textStyle({fontSize: '1.2rem'})};
`;
