import styled, {keyframes} from 'styled-components';

const rotate = keyframes`
 from {
    opacity: 1;
  }
  to {
    opacity: 0.25;
  }
`;

export const StyledSpinner = styled.div`
  position: relative;
  width: 54px;
  height: 54px;
  display: inline-block;
  background: transparent;
  padding: 10px;
  border-radius: 10px;

  div {
    width: 6%;
    height: 16%;
    background: ${({theme}) => theme.colors.secondary};
    position: absolute;
    left: 49%;
    top: 43%;
    opacity: 0;
    -webkit-border-radius: 50px;
    -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    -webkit-animation: ${rotate} 1s linear infinite;
  }

  div.bar1 {
    -webkit-transform: rotate(0deg) translate(0, -130%);
    -webkit-animation-delay: 0s;
  }

  div.bar2 {
    -webkit-transform: rotate(30deg) translate(0, -130%);
    -webkit-animation-delay: -0.9167s;
  }

  div.bar3 {
    -webkit-transform: rotate(60deg) translate(0, -130%);
    -webkit-animation-delay: -0.833s;
  }
  div.bar4 {
    -webkit-transform: rotate(90deg) translate(0, -130%);
    -webkit-animation-delay: -0.7497s;
  }
  div.bar5 {
    -webkit-transform: rotate(120deg) translate(0, -130%);
    -webkit-animation-delay: -0.667s;
  }
  div.bar6 {
    -webkit-transform: rotate(150deg) translate(0, -130%);
    -webkit-animation-delay: -0.5837s;
  }
  div.bar7 {
    -webkit-transform: rotate(180deg) translate(0, -130%);
    -webkit-animation-delay: -0.5s;
  }
  div.bar8 {
    -webkit-transform: rotate(210deg) translate(0, -130%);
    -webkit-animation-delay: -0.4167s;
  }
  div.bar9 {
    -webkit-transform: rotate(240deg) translate(0, -130%);
    -webkit-animation-delay: -0.333s;
  }
  div.bar10 {
    -webkit-transform: rotate(270deg) translate(0, -130%);
    -webkit-animation-delay: -0.2497s;
  }
  div.bar11 {
    -webkit-transform: rotate(300deg) translate(0, -130%);
    -webkit-animation-delay: -0.167s;
  }
  div.bar12 {
    -webkit-transform: rotate(330deg) translate(0, -130%);
    -webkit-animation-delay: -0.0833s;
  }
`;
