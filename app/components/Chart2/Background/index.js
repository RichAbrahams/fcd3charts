/**
*
* Background
*
*/

import React from 'react';
import Rect from './Rect';


function Background(props) {
  return (
    <Rect
      width={props.svgWidth - (props.paddingLeft + props.paddingRight)}
      height={props.svgHeight - (props.paddingTop + props.paddingBottom) + 20}
      transform={`translate(${props.paddingLeft}, ${props.paddingTop - 20})`}
    />
  );
}

Background.propTypes = {

};

export default Background;
