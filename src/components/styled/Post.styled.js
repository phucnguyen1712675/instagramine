import styled, {css} from 'styled-components';
import {hoverUnderline} from './Mixins';
import {TopText} from './UserCard.styled';
import UserCard from '../UserCard';
import Avatar from '../Avatar';
import Button from '../Button';
import QuotationMarkIcon from '../icons/QuotationMarkIcon';

export const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  box-shadow: 0px 10px 40px rgba(222, 230, 237, 0.4);
  overflow: hidden;
  ${({theme}) => css`
    background-color: ${theme.colors.bgComponentLightTheme};
    outline: 1px solid ${theme.colors.borderBlue};
  `}
`;

export const PostHeader = styled(UserCard)`
  ${TopText} {
    ${hoverUnderline}
  }
	padding-right: 10px;
  flex-shrink: 0;
`;

const darkerButtonHover = `
	&:hover {
		--amount: 0.8;
	}
`;

export const PostHeaderLocation = styled.a``;

export const MoreOptionButton = styled(Button)`
  font-size: 1.8rem;
  color: ${({theme}) => theme.colors.blueAlphaAction};
  padding: 5px;
	${darkerButtonHover}
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
  padding: 7px calc(15px - var(--padding-btn)) 0;
`;

export const PostActionButton = styled(Button)`
  font-size: 1.6rem;
  padding: var(--padding-btn);
  color: ${({theme}) => theme.colors.postAction};
	${darkerButtonHover}

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

export const PostLikedUsersAvatarGroup = styled.a`
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
  color: ${({theme}) => theme.colors.secondary};
  font-size: 1rem;
  font-weight: 500;
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
  font-size: 1.2rem;
`;
