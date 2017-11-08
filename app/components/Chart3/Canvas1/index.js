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
    this.props.setCtx1(ctx);
    this.props.drawChart();
  }

  handleMouseMove(e) {
    e.preventDefault();
    if (e.nativeEvent.offsetX <= this.props.paddingLeft
      || e.nativeEvent.offsetX >= this.props.chartWidth - this.props.paddingRight
      || e.nativeEvent.offsetY <= this.props.paddingTop
      || e.nativeEvent.offsetY >= this.props.chartHeight - this.props.paddingBottom
    ) {
      this.props.mouseMove(null);
    } else {
      this.props.mouseMove({
        x: e.nativeEvent.offsetX - this.props.paddingLeft,
        y: e.nativeEvent.offsetY - this.props.paddingTop,
      });
    }
  }

  handleMouseLeave(e) {
    e.preventDefault();
    this.props.mouseMove(null);
  }

  render() {
    return (
      <canvas
        className="canvas1"
        width={this.props.chartWidth}
        height={this.props.chartHeight}
        ref={(c) => {
          this.canvas = c;
        }
        }
        style={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }}
        onMouseMove={(e) => this.handleMouseMove(e)}
        onMouseLeave={(e) => this.handleMouseLeave(e)}
      />
    );
  }
}

Canvas1.propTypes = {
  setCtx1: PropTypes.func,
  drawChart: PropTypes.func,
  paddingLeft: PropTypes.number,
  chartWidth: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  chartHeight: PropTypes.number,
  mouseMove: PropTypes.func,
};

export default Canvas1;
