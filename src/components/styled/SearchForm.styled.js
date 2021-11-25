import styled, {css} from 'styled-components';
import {textStyle, wh} from './Mixins';
import {StyledSearchHistory} from './SearchHistory.styled';

const searchFormIcon = css`
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 1;
  color: ${({theme}) => theme.colors.blueAlphaAction};
  font-size: 2.5rem;
`;

export const StyledSearchForm = styled.form.attrs(() => ({
  widthForm: '300px',
  widthSearchHistoryDiff: '75px',
  distanceAction: '15px',
}))`
  position: relative;
	${({widthForm}) => wh({w: widthForm, h: '48px'})};

  & > svg,
  & > button {
    ${searchFormIcon}
  }

  & > svg {
    left: ${({distanceAction}) => distanceAction};
  }

  & > button {
    right: ${({distanceAction}) => distanceAction};
  }

  ${StyledSearchHistory} {
    width: calc(
      ${({widthForm}) => widthForm} +
        ${({widthSearchHistoryDiff}) => widthSearchHistoryDiff}
    );
    left: calc(
      -1 * ${({widthSearchHistoryDiff}) => widthSearchHistoryDiff} / 2
    );
  }
`;

export const SearchInput = styled.input.attrs((props) => ({
  type: 'text',
  color: props.theme.colors.blueAlphaAction,
  fontSize: '1.8rem',
  fontWeight: 400,
}))`
  ${wh}
  position: absolute;
  left: 0;
  padding: 0px 50px;
  background: #f8fbff;
  box-shadow: inset 0px 4px 40px rgba(175, 193, 217, 0.12);
  border-radius: 8px;
  ${({color, fontSize, fontWeight}) => textStyle({color, fontSize, fontWeight})}

  &::placeholder {
    transform: translateY(2px);
  }

  &:focus {
    outline: 1px solid ${({theme}) => theme.colors.blueAlphaAction};
  }
`;
