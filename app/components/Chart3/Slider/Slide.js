import styled from 'styled-components';

const Slide = styled.input`
-webkit-appearance: none;
width: 200px;
height: 10px;
border-radius: 5px;
background: #333;
outline: none;
border: 0;
-webkit-transition: .2s;
transition: opacity .2s;
margin: 0.25em 0em 0.25em 0em;
&::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
}
&::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
}
&::-moz-focus-outer {
  border: 0;
  }
&::-moz-range-track {
    background-color: #333;
  }
`;

export default Slide;
