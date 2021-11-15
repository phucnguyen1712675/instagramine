import styled, {css} from 'styled-components';

const HasStoryBackground = css`
  background: linear-gradient(45deg, gold, fuchsia);
`;

const hasStoryBeenSeenBackground = css`
  background: ${({theme}) => theme.colors.greyAction};
`;

export const StyledAvatar = styled.div.attrs((props) => ({
  size: `${props.size ?? '40'}px`,
}))`
  border-radius: 100%;
  padding: 2px;
  width: ${({size}) => size};
  height: ${({size}) => size};
  ${({hasStory, hasStoryBeenSeen}) =>
    hasStory &&
    (hasStoryBeenSeen ? HasStoryBackground : hasStoryBeenSeenBackground)};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
    padding: 2px;
    background-color: ${({theme}) => theme.colors.bgComponentLightTheme};
  }
`;
