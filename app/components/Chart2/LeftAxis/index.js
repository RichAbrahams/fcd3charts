/**
*
* LeftAxis
*
*/

import React from 'react';
import { axisLeft, select } from 'd3';


class LeftAxis extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    const axis = axisLeft(this.props.yScale)
      .ticks(5);
    select(this.ax)
      .attr('class', 'yAxis')
      .call(axis);
  }

  render() {
    return (<g
      className="axis"
      ref={(ax) => { this.ax = ax; }}
      transform={`translate(${this.props.paddingLeft}, ${this.props.paddingTop})`}
    ></g>);
  }
}

LeftAxis.propTypes = {

};

export default LeftAxis;
