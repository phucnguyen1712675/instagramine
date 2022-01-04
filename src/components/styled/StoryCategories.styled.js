import styled, {css} from 'styled-components';
import {CircleImgWrapper} from './Lib';
import {buttonColorHover} from './Mixins';
import Button from '../Button';
import Spinner from '../Spinner';

const StoryCategoriesStyle = css`
  padding: 15px 0;
  flex-grow: 1;
`;

export const StyledStoryCategories = styled.div`
  ${StoryCategoriesStyle}
`;

export const StyledStoryCategoriesWhileLoading = styled.div`
  ${StoryCategoriesStyle}
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StoryCategoriesSpinner = styled(Spinner)`
  padding: 2.4rem;
`;

export const StoriesContentStoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 2.4rem;
  column-gap: 2rem;
  margin-top: 2.4rem;
`;

export const StoriesContentStoryItem = styled.li`
  cursor: pointer;
  text-align: center;

  &:last-child {
    align-self: flex-start;
  }
`;

export const StoriesContentAddButton = styled(StoriesContentStoryItem)`
  margin-top: 2.4rem;
`;

export const StoriesContentStoryItemInner = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StoriesContentStoryItemName = styled.p`
  font-size: 1.2rem;
  margin-top: 8px;
  max-width: 6rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

export const StoriesContentCircleImgWrapper = styled(CircleImgWrapper)`
  --size: 6rem;
  overflow: hidden;
`;

export const StoriesContentCircleImg = styled.img`
  transition: transform 0.2s ease-out;

  ${StoriesContentCircleImgWrapper}:hover & {
    transform: scale(1.2);
  }
`;

export const StoriesContentButton = styled(Button)`
  --size: 6rem;
  width: var(--size);
  height: var(--size);
  padding: 0;
  font-size: 2.4rem;
  border: 2px solid ${({theme}) => theme.colors.primary};
  ${buttonColorHover}
`;
