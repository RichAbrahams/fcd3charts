/**
*
* Wrapper
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import StyledWrapper from './StyledWrapper';
import Svg from '../Svg';
import Paths from '../Paths';
import Strikes from '../Strikes';

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
    if (this.props.dragging) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      this.props.drag([x, y]);
    }
  }

  handleMouseOut(e) {
    e.preventDefault();
    if (this.props.dragging) {
      this.props.toggleDragging();
    }
  }

  handleDrag(e) {
    e.preventDefault();
    console.log('dragging');
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
        onDrag={(e) => this.handleDrag(e)}
        dragging={this.props.dragging}
        draggable="true"
      >
        <Svg {...this.props}>
          <Paths {...this.props} />
          <Strikes {...this.props} />
        </Svg>
      </StyledWrapper>
    );
  }
}

Wrapper.propTypes = {
  dragging: PropTypes.bool,
  drag: PropTypes.func,
  toggleDragging: PropTypes.func,
  adjustScale: PropTypes.func,
};

export default Wrapper;
