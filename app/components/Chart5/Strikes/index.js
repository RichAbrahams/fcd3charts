/**
*
* Plots
*
*/

import React from 'react';
import shortID from 'shortid';
import Circle from './styledCircle';
import G from './G';
import projection from '../Projection';

function Strikes(props) {
  const { meteorites, width, height } = props;

  const location = (strike) => projection(width, height)(strike.geometry.coordinates);
  const plot = meteorites.map((item) => {
    if (item.geometry === null) {
      return null;
    }
    return (<Circle
      cx={location(item)[0]}
      cy={location(item)[1]}
      r={1}
      fill="#E91E63"
      key={shortID.generate()}
    />);
  }
  );
  return (
    <G>
      {plot}
    </G>
  );
}

Strikes.propTypes = {

};

export default Strikes;
