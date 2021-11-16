import styled, {css} from 'styled-components';
import {textStyle} from './Mixins';
import {StyledSearchHistory} from './SearchHistory.styled';

const searchFormIcon = css`
  font-size: 2.5rem;
  z-index: 1;
  position: absolute;
  top: 0;
  height: 100%;
  color: ${({theme}) => theme.colors.blueAlphaAction};
`;

export const StyledSearchForm = styled.form`
  --width-form: 300px;
  --width-search-history-diff: 75px;
  --distance-action: 15px;
  position: relative;
  width: var(--width-form);
  height: 48px;

  & > svg,
  & > button {
    ${searchFormIcon}
  }

  & > svg {
    left: var(--distance-action);
  }

  & > button {
    right: var(--distance-action);
  }

  ${StyledSearchHistory} {
    width: calc(var(--width-form) + var(--width-search-history-diff));
    left: calc(-1 * var(--width-search-history-diff) / 2);
  }
`;

export const SearchInput = styled.input.attrs(() => ({
  type: 'text',
  fontSize: '1.8rem',
}))`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  padding: 0px 50px;
  background: #f8fbff;
  box-shadow: inset 0px 4px 40px rgba(175, 193, 217, 0.12);
  border-radius: 8px;
  border: none;
  ${textStyle}

  &::placeholder {
    ${({fontSize}) => textStyle({fontSize: fontSize})}
    user-select: none;
  }

  &:focus {
    outline: 1px solid ${({theme}) => theme.colors.blueAlphaAction};
  }
`;
