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

  handleUpdateTooltip(e, strike, show) {
    const x = show ? e.nativeEvent.offsetX : null;
    const y = show ? e.nativeEvent.offsetY : null;
    const index = show ? strike : null;
    this.props.updateTooltip({
      x,
      y,
      index,
    });
  }

  buildStrikes() {
    const { meteorites, scale, updateTooltip } = this.props;
    const strikes = meteorites.map((item, index) => (<Circle
      cx={item.cx}
      cy={item.cy}
      r={item.radius}
      fill="rgba(233, 30, 99, 0.5)"
      stroke="rgba(68,68,68, 0.5)"
      stroke-width="1"
      key={shortID.generate()}
      onMouseEnter={(e) => this.handleUpdateTooltip(e, index, true)}
      onMouseLeave={(e) => this.handleUpdateTooltip(e, index, false)}
    />));
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
