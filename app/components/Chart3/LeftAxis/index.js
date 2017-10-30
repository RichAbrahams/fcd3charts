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
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const ticks = this.props.yScale.domain()
    .map((d, i) => monthNames[i]);
    const axis = axisLeft()
      .scale(this.props.yScale)
      .tickValues(ticks);
    select(this.ax)
      .attr('class', 'yAxis')
      .call(axis);
  }

  render() {
    return (<g
      className="axis"
      ref={(ax) => { this.ax = ax; }}
      transform={`translate(${this.props.paddingLeft - 1}, ${this.props.paddingTop})`}
    ></g>);
  }
}

LeftAxis.propTypes = {

};

export default LeftAxis;
