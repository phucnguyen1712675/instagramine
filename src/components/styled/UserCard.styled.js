import styled from 'styled-components';

export const StyledUserCard = styled.div`
  display: flex;
  padding: 15px;
`;

export const TextContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

export const TextContent = styled.div`
  --margin-left-info-content: 10px;
  display: flex;
  flex-direction: column;
  line-height: 1.4;
  margin-left: var(--margin-left-info-content);
`;

export const TopText = styled.a`
  font-weight: 600;
`;

export const BottomText = styled.div`
  display: flex;
  align-items: center;
  color: ${({theme}) => theme.colors.secondary};
  font-size: 1rem;
  font-weight: 400;
`;

export const OptionWrapper = styled.div`
  align-self: center;
`;
