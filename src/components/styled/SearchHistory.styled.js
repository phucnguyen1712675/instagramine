import styled from 'styled-components';
import {
  textStyle,
  flexCenter,
  flexColumn,
  hideScrollBarScrolling,
} from './Mixins';

export const StyledSearchHistory = styled.div`
  --height-arrow-up: 14px;
  ${flexColumn}
  ${({isLoading}) =>
    isLoading && 'justify-content: center;	align-items: center;	'}
  position: absolute;
  top: calc(100% + var(--height-arrow-up));
  height: 362px;
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  z-index: 1;
  border-radius: 6px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  ${hideScrollBarScrolling}

  & > p {
    text-align: center;
    ${({theme}) =>
    textStyle({
      color: theme.colors.secondary,
      fontWeight: 400,
    })};
  }

  /* &:before {
    content: '';
    position: absolute;
    top: calc(-1 * var(--height-arrow-up));
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: var(--height-arrow-up) solid transparent;
    border-right: var(--height-arrow-up) solid transparent;
    border-bottom: var(--height-arrow-up) solid
      ${({theme}) => theme.colors.bgComponentLightTheme};
  } */
`;

export const SearchHistoryHeader = styled.header`
  ${flexCenter({horizontally: false})};
  justify-content: space-between;
  padding: 16px 16px 8px;

  h3 {
    display: inline-block;
    ${({theme}) =>
    textStyle({
      color: theme.colors.primary,
      fontSize: '1.6rem',
      fontWeight: 600,
    })};
  }

  & > button {
    display: inline-flex;
    ${({theme}) =>
    textStyle({
      color: theme.colors.link,
      fontWeight: 600,
    })};
  }
`;

export const SearchHistoryList = styled.ul`
  ${flexColumn}
`;
