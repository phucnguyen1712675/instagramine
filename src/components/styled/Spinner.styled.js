import styled, {keyframes} from 'styled-components';
import {wh} from './Mixins';

const rotate = keyframes`
 from {
    opacity: 1;
  }
  to {
    opacity: 0.25;
  }
`;

export const Bar = styled.div`
  width: 6%;
  height: 16%;
  position: absolute;
  left: 49%;
  top: 43%;
  opacity: 0;
  -webkit-border-radius: 50px;
  -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  -webkit-animation: ${rotate} 1s linear infinite;
`;

export const StyledSpinner = styled.div`
  --color-spinner: ${({theme}) => theme.colors.secondary};
  ${wh({w: '5.4rem'})}
  position: relative;
  display: inline-block;
  background: transparent;
  padding: 10px;
  border-radius: 10px;

  ${Bar} {
    background-color: var(--color-spinner);
  }
`;

export const Bar1 = styled(Bar)`
  -webkit-transform: rotate(0deg) translate(0, -130%);
  -webkit-animation-delay: 0s;
`;

export const Bar2 = styled(Bar)`
  -webkit-transform: rotate(30deg) translate(0, -130%);
  -webkit-animation-delay: -0.9167s;
`;

export const Bar3 = styled(Bar)`
  -webkit-transform: rotate(60deg) translate(0, -130%);
  -webkit-animation-delay: -0.833s;
`;

export const Bar4 = styled(Bar)`
  -webkit-transform: rotate(90deg) translate(0, -130%);
  -webkit-animation-delay: -0.7497s;
`;

export const Bar5 = styled(Bar)`
  -webkit-transform: rotate(120deg) translate(0, -130%);
  -webkit-animation-delay: -0.667s;
`;

export const Bar6 = styled(Bar)`
  -webkit-transform: rotate(150deg) translate(0, -130%);
  -webkit-animation-delay: -0.5837s;
`;

export const Bar7 = styled(Bar)`
  -webkit-transform: rotate(180deg) translate(0, -130%);
  -webkit-animation-delay: -0.5s;
`;

export const Bar8 = styled(Bar)`
  -webkit-transform: rotate(210deg) translate(0, -130%);
  -webkit-animation-delay: -0.4167s;
`;

export const Bar9 = styled(Bar)`
  -webkit-transform: rotate(240deg) translate(0, -130%);
  -webkit-animation-delay: -0.333s;
`;

export const Bar10 = styled(Bar)`
  -webkit-transform: rotate(270deg) translate(0, -130%);
  -webkit-animation-delay: -0.2497s;
`;

export const Bar11 = styled(Bar)`
  -webkit-transform: rotate(300deg) translate(0, -130%);
  -webkit-animation-delay: -0.167s;
`;

export const Bar12 = styled(Bar)`
  -webkit-transform: rotate(330deg) translate(0, -130%);
  -webkit-animation-delay: -0.0833s;
`;
