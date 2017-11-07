/**
*
* Plots
*
*/

import React from 'react';
import shortId from 'shortid';
import { geoPath } from 'd3-geo';
import G from './G';
import projection from '../Projection';

function Plots(props) {
  const { countries, width, height} = props;
  const plot = countries.map((d, i) => (
    <path
      key={shortId.generate()}
      d={geoPath().projection(projection(width, height))(d)}
      className="country"
      fill="#9ACD32"
      stroke="#222"
      strokeWidth={0.5}
    />
  ));
  return (
    <G>
      {plot}
    </G>
  );
}

Plots.propTypes = {

};

export default Plots;
