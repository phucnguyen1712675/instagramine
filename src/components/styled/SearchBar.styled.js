import styled from 'styled-components';
import {textStyle, wh} from './Mixins';
import {StyledSearchHistory} from './SearchHistory.styled';

export const StyledSearchBar = styled.form.attrs(() => ({
  widthSearchBar: '300px',
  widthSearchHistoryDiff: '75px',
  distanceAction: '22.5px',
}))`
  position: relative;
  ${({widthSearchBar}) => wh({w: widthSearchBar, h: '48px'})};

  & > svg {
    position: absolute;
    top: 0;
    height: 100%;
    z-index: 1;
    color: ${({theme}) => theme.colors.blueAlphaAction};
    font-size: 1.8rem;
    left: 18px;
  }

  ${StyledSearchHistory} {
    width: calc(
      ${({widthSearchBar}) => widthSearchBar} +
        ${({widthSearchHistoryDiff}) => widthSearchHistoryDiff}
    );
    left: calc(
      -1 * ${({widthSearchHistoryDiff}) => widthSearchHistoryDiff} / 2
    );
  }
`;

export const SearchInput = styled.input.attrs((props) => ({
  type: 'search',
  color: props.theme.colors.blueAlphaAction,
  fontSize: '1.8rem',
  fontWeight: 400,
  paddingCancelButton: '25px',
}))`
  ${wh}
  position: absolute;
  left: 0;
  padding: 0 calc(50px - ${({paddingCancelButton}) => paddingCancelButton}) 0
    50px;
  background: #f8fbff;
  box-shadow: inset 0px 4px 40px rgba(175, 193, 217, 0.12);
  border-radius: 8px;
  ${({color, fontSize, fontWeight}) => textStyle({color, fontSize, fontWeight})}

  /* &::placeholder {
    transform: translateY(2px);
  } */

  &::-webkit-search-cancel-button {
    position: relative;
    left: 9px;
    cursor: pointer;
    padding: 0.2rem;
  }

  &:focus {
    outline: 1px solid ${({theme}) => theme.colors.blueAlphaAction};
  }

  &:focus ~ svg {
    display: none;
  }

  &:focus ~ ${StyledSearchHistory} {
    display: flex;
  }
`;
