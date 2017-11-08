/**
*
* Background
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Rect from './Rect';

function Background(props) {
  return (
    <Rect
      width={props.svgWidth - (props.paddingLeft + props.paddingRight)}
      height={(props.svgHeight - (props.paddingTop + props.paddingBottom)) + 20}
      transform={`translate(${props.paddingLeft}, ${props.paddingTop - 20})`}
    />
  );
}

Background.propTypes = {
  svgWidth: PropTypes.number,
  svgHeight: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingTop: PropTypes.number,
};

export default Background;
