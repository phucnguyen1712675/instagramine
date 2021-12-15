import styled, {css} from 'styled-components';

export const StyledPostList = styled.div`
  display: grid;
  grid-gap: 25px;
  ${({$postLength}) =>
    $postLength > 2
      ? css`
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        `
      : css`
          grid-template-columns: repeat(3, minmax(300px, 1fr));
        `}
`;
