import styled, { keyframes } from 'styled-components';

const plotAnimation = keyframes`
    0%   {transform: scale(1);}
    40%  {transform: scale(1);}
    60%  {transform: scale(2);}
    80%  {transform: scale(1);}
    100% {transform: scale(1);}
`;

export default styled.g`
& > g > .animation-appear {
  animation-name: ${plotAnimation};
  animation-duration: 4s;
}
`;
