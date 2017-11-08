/**
*
* Paths2
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import { geoPath } from 'd3-geo';
import G from './G';
import projection from '../Projection';


class Paths extends React.Component { // eslint-disable-line react/prefer-stateless-function

  shouldComponentUpdate(nextProps) {
    if (this.props.scale !== nextProps.scale || nextProps.dragging) {
      return false;
    }
    return true;
  }

  buildPaths() {
    const { countries, width, height } = this.props;
    const paths = countries.map((d) => (<path
      key={shortId.generate()}
      d={geoPath().projection(projection(width, height))(d)}
      className="country"
      fill="#9ACD32"
      stroke="#222"
      strokeWidth={0.5}
    />
    ));
    return paths;
  }

  render() {
    return (
      <G>
        {this.buildPaths()}
      </G>
    );
  }
}

Paths.propTypes = {
  scale: PropTypes.number,
  countries: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Paths;
