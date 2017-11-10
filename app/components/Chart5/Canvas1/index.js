/**
*
* Canvas1
*
*/

import React from 'react';
import PropTypes from 'prop-types';

class Canvas1 extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const ctx = this.canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    this.props.initialize(ctx);
    this.props.drawChart();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.dragging !== this.props.dragging) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <canvas
        className="canvas1"
        width={this.props.canvasWidth}
        height={this.props.canvasHeight}
        ref={(c) => {
          this.canvas = c;
        }}
      />
    );
  }
}

Canvas1.propTypes = {
  initialize: PropTypes.func,
  drawChart: PropTypes.func,
  dragging: PropTypes.bool,
  canvasWidth: PropTypes.number,
  canvasHeight: PropTypes.number,
};

export default Canvas1;
