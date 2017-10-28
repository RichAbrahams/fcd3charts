/**
*
* Xgridlines
*
*/

import React from 'react';
import { axisLeft, select } from 'd3';


class Ygridlines extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    const grid = axisLeft(this.props.yScale)
      .ticks(5)
      .tickFormat('')
      .tickSizeInner(-this.props.svgWidth + (this.props.paddingLeft + this.props.paddingRight));
    select(this.ax)
      .attr('class', 'yGrid')
      .call(grid);
  }

  render() {
    return (<g
      className="axis"
      ref={(ax) => { this.ax = ax; }}
      transform={`translate(${this.props.paddingLeft}, ${this.props.paddingTop})`}
    ></g>);
  }
}

Ygridlines.propTypes = {

};

export default Ygridlines;
