/**
*
* Slider
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Slide from './Slide';
import Wrapper from './Wrapper';
import SubWrapper from './SubWrapper';
import Span from './Span';

function Slider(props) {
  return (
    <Wrapper>
      <SubWrapper marginRight={props.paddingRight}>
        <Span>Filter Average Temp</Span>
        <Slide
          type="range"
          min="0"
          max="13"
          step="1"
          list="tickmarks"
          value={props.sliderValue}
          onChange={(e) => props.updateSlider(e.target.value)}
        >
        </Slide>
        <Span>{`> ${props.sliderValue} °C`}</Span>
      </SubWrapper>
    </Wrapper>
  );
}

Slider.propTypes = {
  paddingRight: PropTypes.number,
  sliderValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  updateSlider: PropTypes.func,
};

export default Slider;
