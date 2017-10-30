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
    const ticks = this.props.xScale.domain()
      .filter((d, i) => !(i % 10));
    const axis = axisBottom()
      .scale(this.props.xScale)
      .tickValues(ticks);
    select(this.ax)
      .attr('class', 'xAxis')
      .call(axis);
  }

  render() {
    return (<g
      className="axis"
      ref={(ax) => { this.ax = ax; }}
      transform={`translate(${this.props.paddingLeft}, ${(this.props.chartHeight - this.props.paddingBottom) + 1})`}
    ></g>);
  }
}

BottomAxis.propTypes = {

};

export default BottomAxis;
