/**
*
* Key
*
*/

import React from 'react';
import Circle from './Circle';

function Key(props) {
  return (
    <g>
      <Circle
        r={5}
        cx={170}
        cy={150}
        fill="rgb(191, 42, 35)"
      />;
      <text x={180} y={156}>Doping Allegation</text>
      <Circle
        r={5}
        cx={170}
        cy={170}
        fill="rgb(166, 173, 60)"
      />;
      <text x={180} y={176}>No Doping Allegation</text>
    </g>
  );
}

Key.propTypes = {

};

export default Key;
