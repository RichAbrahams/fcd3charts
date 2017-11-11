/**
*
* Wrapper
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import StyledWrapper from './StyledWrapper';
import Title from './Title';
import Canvas1 from '../Canvas1';

class Wrapper extends React.Component { // eslint-disable-line react/prefer-stateless-function

  handleWheel(e) {
    e.preventDefault();
    if (this.props.dragging) {
      this.props.toggleDragging();
    }
    this.props.adjustScale(e.nativeEvent.deltaY);
  }

  handleMouseDown(e) {
    e.preventDefault();
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    this.props.toggleDragging([x, y]);
  }

  handleMouseUp(e) {
    e.preventDefault();
    this.props.toggleDragging();
  }

  handleMouseMove(e) {
    e.preventDefault();
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    if (this.props.dragging) {
      return this.props.drag([x, y]);
    }
    const selected = this.props.meteors.find((item) => {
      const vx = x - item.x;
      const vy = y - item.y;
      const mag = Math.sqrt((vx * vx) + (vy * vy));
      return mag < item.radius;
    });
    if (selected) {
      return this.props.updateSelected(selected);
    }
    return this.props.updateSelected(null);
  }

  handleMouseOut(e) {
    e.preventDefault();
    if (this.props.dragging) {
      this.props.toggleDragging();
    }
  }

  render() {
    return (
      <StyledWrapper
        className="wrapper"
        onWheel={(e) => this.handleWheel(e)}
        onMouseDown={(e) => this.handleMouseDown(e)}
        onMouseUp={(e) => this.handleMouseUp(e)}
        onMouseMove={(e) => this.handleMouseMove(e)}
        onMouseLeave={(e) => this.handleMouseOut(e)}
        dragging={this.props.dragging}
      >
        <Title>Recorded meteoroid impacts 861 - 2013 CE</Title>
        <Canvas1 {...this.props} />
      </StyledWrapper>
    );
  }
}

Wrapper.propTypes = {
  dragging: PropTypes.bool,
  drag: PropTypes.func,
  toggleDragging: PropTypes.func,
  adjustScale: PropTypes.func,
  meteors: PropTypes.array,
  updateSelected: PropTypes.func,
};

export default Wrapper;
