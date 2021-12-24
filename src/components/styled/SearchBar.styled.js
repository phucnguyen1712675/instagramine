import styled, {css} from 'styled-components';
import {hideScrollBarScrolling} from './Mixins';
import {SearchInput, Dot, MenuItem} from './Lib';
import {
  TextContentWrapper,
  TextContent,
  OptionWrapper,
} from './UserCard.styled';
import Button from '../Button';
import Spinner from '../Spinner';
import UserCard from '../UserCard';
import Avatar from '../Avatar';
import {SearchIcon, MultiplyIcon} from '../icons';
import {DEVICES} from '../../constants';

export const StyledSearchBar = styled.form`
  --width-search-bar: 300px;
  flex-grow: 1;
  position: relative;
  width: var(--width-search-bar);
  height: 48px;

  @media ${DEVICES.tablet} {
    flex-grow: unset;
    width: var(--width-search-bar);
  }
`;

export const SearchBarInput = styled(SearchInput)`
  --padding-cancel-button: 25px;
  --size: 100%;
  width: var(--size);
  height: var(--size);
  position: absolute;
  left: 0;
  padding-top: 0;
  padding-right: calc(50px - var(--padding-cancel-button));
  padding-bottom: 0;
  padding-left: 50px;
  font-size: 1.8rem;
  border-radius: 8px;
  z-index: 2;

  &::-webkit-search-cancel-button {
    position: relative;
    left: 9px;
    cursor: pointer;
    padding: 0.2rem;
  }
`;

export const SearchBarInputSearchIcon = styled(SearchIcon)`
  position: absolute;
  top: 0;
  left: 18px;
  height: 100%;
  z-index: 2;
  color: ${({theme}) => theme.colors.blueAlpha};
  font-size: 1.8rem;

  ${SearchInput}:focus ~ & {
    display: none;
  }
`;

const flexCenter = css`
  justify-content: center;
  align-items: center;
`;

export const SearchHistory = styled.div`
  --width-search-history-diff: 75px;
  --space: 14px;
  position: absolute;
  top: calc(100% + 1px);
  right: 0;
  left: 0;
  height: 362px;
  border-radius: 6px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  z-index: 1;
  display: flex;
  flex-direction: column;
  ${({$shouldCenterChild}) => $shouldCenterChild && flexCenter}

  &::before {
    content: '';
    height: var(--space);
    position: absolute;
    right: 0;
    bottom: 100%;
    left: 0;
    z-index: 1;
  }

  @media ${DEVICES.tablet} {
    left: unset;
    top: calc(100% + var(--space));
    width: calc(var(--width-search-bar) + var(--width-search-history-diff));
  }

  @media ${DEVICES.laptopL} {
    right: 50%;
    transform: translateX(50%);
  }
`;

export const SearchHistoryInner = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-radius: inherit;
  ${hideScrollBarScrolling}
`;

export const SearchHistorySpinner = styled(Spinner)`
  padding: 2.7rem;
`;

export const SearchHistoryHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 8px;
`;

export const SearchHistoryHeaderTitle = styled.h3`
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 600;
`;

export const ClearAllButton = styled(Button)`
  padding: 0;
`;

export const SearchItemList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const SearchHistoryItem = styled(MenuItem)``;

export const SearchHistoryItemLink = styled.a`
  display: block;
`;

export const SearchHistoryItemContent = styled(UserCard)`
  padding: 8px 16px;
  cursor: pointer;
  flex-direction: column;
  position: relative;

  @media ${DEVICES.mobileM} {
    flex-direction: row;
  }

  @media ${DEVICES.mobileL} {
    padding: 15px;
  }

  ${TextContentWrapper} {
    flex-grow: 0;

    @media ${DEVICES.mobileM} {
      flex-grow: 1;
    }
  }

  ${TextContent} {
    --margin-left-info-content: 0px;
    width: 100%;

    @media ${DEVICES.mobileM} {
      --margin-left-info-content: 12px;
    }
  }

  ${OptionWrapper} {
    position: absolute;
    top: 50%;
    right: 0.8rem;
    transform: translateY(-50%);
  }
`;

export const SearchHistoryItemAvatar = styled(Avatar)`
  --size: 4.2rem;

  @media ${DEVICES.mobileM} {
    --size: 5.2rem;
  }
`;

export const SearchHistoryUserAdditionalInfo = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2rem;

  @media ${DEVICES.mobileM} {
    flex-direction: row;
    column-gap: 5px;
  }
`;

export const SearchHistoryUserAdditionalInfoDot = styled(Dot)`
  display: none;

  @media ${DEVICES.mobileL} {
    display: inline-block;
  }
`;

export const SearchHistoryUsernameText = styled.span``;

export const SearchHistoryFollowingText = styled.span`
  display: none;

  @media ${DEVICES.mobileL} {
    display: inline-block;
  }
`;

export const RemoveItemButton = styled(Button)`
  padding: 8px;
`;

export const RemoveHistoryItemButtonIcon = styled(MultiplyIcon)`
  color: ${({theme}) => theme.colors.secondary};
`;

export const NoResultsText = styled.p`
  color: ${({theme}) => theme.colors.secondary};
  font-weight: 400;
  text-align: center;
`;
