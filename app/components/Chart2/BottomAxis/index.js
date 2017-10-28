/**
*
* BottomAxis
*
*/

import React from 'react';
import { axisBottom, select } from 'd3';


class BottomAxis extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    const axis = axisBottom()
      .scale(this.props.xScale)
      .ticks(5)
      .tickPadding(6);
    select(this.ax)
      .attr('class', 'xAxis')
      .call(axis);
  }

  render() {
    return (<g
      className="axis"
      ref={(ax) => { this.ax = ax; }}
      transform={`translate(${this.props.paddingLeft}, ${this.props.svgHeight - this.props.paddingBottom})`}
    ></g>);
  }
}

BottomAxis.propTypes = {

};

export default BottomAxis;
