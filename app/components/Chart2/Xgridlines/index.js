/**
*
* Xgridlines
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { axisBottom, select } from 'd3';


class Xgridlines extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    const grid = axisBottom(this.props.xScale)
      .ticks(5)
      .tickFormat('')
      .tickSizeInner(-this.props.svgHeight + (this.props.paddingTop + this.props.paddingBottom));
    select(this.ax)
      .attr('class', 'xGrid')
      .call(grid);
  }

  render() {
    return (<g
      className="axis"
      ref={(ax) => { this.ax = ax; }}
      transform={`translate(${this.props.paddingLeft}, ${this.props.svgHeight - this.props.paddingBottom})`}
    ></g>);
  }
}

Xgridlines.propTypes = {
  xScale: PropTypes.func,
  svgHeight: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
};

export default Xgridlines;
