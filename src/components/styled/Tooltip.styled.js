import styled, {css} from 'styled-components';

export const StyledTooltip = styled.div`
  position: relative;
`;

const TopPosition = css`
  bottom: 100%;
  left: 50%;
  margin-bottom: 10px;

  &::before {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid ${({theme}) => theme.colors.primary};
  }
`;

const RightPosition = css`
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 10px;

  &::before {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid ${({theme}) => theme.colors.primary};
  }
`;

const BottomPosition = css`
  top: 100%;
  left: 50%;
  margin-bottom: 0;
  margin-top: 10px;

  &::before {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid ${({theme}) => theme.colors.primary};
  }
`;

const LeftPosition = css`
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 10px;

  &::before {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid ${({theme}) => theme.colors.primary};
  }
`;

export const TooltipContent = styled.div`
  position: absolute;
  color: #fff;
  background-color: ${({theme}) => theme.colors.primary};
  text-align: center;
  transform: translateX(-50%);
  white-space: nowrap;
  border-radius: 4px;
  padding: 7px 15px;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
  }

  ${({$position}) => {
    switch ($position) {
      case 'top':
        return TopPosition;
      case 'right':
        return RightPosition;
      case 'bottom':
        return BottomPosition;
      default:
        return LeftPosition;
    }
  }}
`;
