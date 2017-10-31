/**
*
* Slider
*
*/

import React from 'react';
import Slide from './Slide';
import Wrapper from './Wrapper';
import SubWrapper from './SubWrapper';
import Span from './Span';

function Slider(props) {
  return (
    <Wrapper>
      <SubWrapper marginRight={props.paddingRight}>
        <Slide
          type="range"
          min="0"
          max="13"
          step="1"
          value={props.sliderValue}
          onChange={(e) => props.updateSlider(e.target.value)}
        >
        </Slide>
        <Span>{`${props.sliderValue} °C+`}</Span>
      </SubWrapper>
    </Wrapper>
  );
}

Slider.propTypes = {

};

export default Slider;
