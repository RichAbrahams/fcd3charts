/**
*
* Strikes
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import shortID from 'shortid';
import Circle from './styledCircle';
import G from './G';
import projection from '../Projection';


class Strikes extends React.Component { // eslint-disable-line react/prefer-stateless-function

  shouldComponentUpdate(nextProps) {
    if (this.props.scale !== nextProps.scale || nextProps.dragging) {
      return false;
    }
    return true;
  }

  buildStrikes() {
    const { meteorites, width, height, radialScale } = this.props;
    const location = (strike) => projection(width, height)(strike.geometry.coordinates);
    const strikes = meteorites.map((item) => {
      if (item.geometry === null) {
        return null;
      }
      return (<Circle
        cx={location(item)[0]}
        cy={location(item)[1]}
        r={radialScale(item.properties.mass)}
        fill="rgba(233, 30, 99, 0.5)"
        stroke="rgba(68,68,68, 0.5)"
        stroke-width="1"
        key={shortID.generate()}
      />);
    });
    return strikes;
  }

  render() {
    return (
      <G>
        {this.buildStrikes()}
      </G>
    );
  }
}

Strikes.propTypes = {
  meteorites: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  scale: PropTypes.number,
};

export default Strikes;
