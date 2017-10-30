/**
*
* Canvas1
*
*/

import React from 'react';


class Canvas1 extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const ctx = this.canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    this.props.setCtx1(ctx);
    this.props.drawChart();
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
      />
    );
  }
}

Canvas1.propTypes = {

};

export default Canvas1;
