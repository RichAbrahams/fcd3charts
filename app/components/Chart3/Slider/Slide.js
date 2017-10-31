import styled from 'styled-components';

const Slide = styled.input`
-webkit-appearance: none;
width: 200px;
height: 15px;
border-radius: 5px;
background: #333;
outline: none;
opacity: 0.7;
-webkit-transition: .2s;
transition: opacity .2s;
&::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
}
&::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
}
`;

export default Slide;
