import styled from 'styled-components';
import {textStyle, hideScrollBarScrolling} from './Mixins';

export const StyledSearchHistory = styled.div.attrs(() => ({
  heightArrowUp: '14px',
}))`
  /* display: flex; */
  flex-direction: column;
  ${({isLoading}) =>
    isLoading &&
    ` justify-content: center;
    	align-items: center;
    `}
  position: absolute;
  top: calc(100% + ${({heightArrowUp}) => heightArrowUp});
  height: 362px;
  background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  z-index: 1;
  border-radius: 6px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  overflow-y: auto;
  ${hideScrollBarScrolling}
	display: none;

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
    top: calc(-1 *${({heightArrowUp}) => heightArrowUp});
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left:${({heightArrowUp}) => heightArrowUp} solid transparent;
    border-right:${({heightArrowUp}) => heightArrowUp} solid transparent;
    border-bottom:${({heightArrowUp}) => heightArrowUp} solid
      ${({theme}) => theme.colors.bgComponentLightTheme};
  } */
`;

export const SearchHistoryHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 8px;

  h3 {
    display: inline-block;
    ${textStyle({
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
  display: flex;
  flex-direction: column;
`;
