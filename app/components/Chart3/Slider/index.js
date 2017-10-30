/**
*
* Slider
*
*/

import React from 'react';
import Slide from './Slide';
import Wrapper from './Wrapper';


function Slider(props) {
  return (
    <Wrapper>
      <Slide
        type="range"
        min="0"
        max="14"
        step="1"
        value={props.sliderValue}
        onChange={(e) => props.updateSlider(e.target.value)}
      >
      </Slide>
    </Wrapper>
  );
}

Slider.propTypes = {

};

export default Slider;
