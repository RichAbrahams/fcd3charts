/**
*
* Xgridlines
*
*/

import React from 'react';
import PropTypes from 'prop-types';
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
  yScale: PropTypes.func,
  svgWidth: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingTop: PropTypes.number,
};

export default Ygridlines;
