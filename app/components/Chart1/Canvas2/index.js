/**
*
* Canvas2
*
*/

import React from 'react';

class Canvas2 extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const ctx = this.canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    this.props.setCtx2(ctx);
  }

  handleMouseMove(e) {
    e.preventDefault();
    if (this.props.dragging) {
      this.props.mouseDrag(e.nativeEvent.offsetX);
    } else {
      this.props.mouseMove({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }
  }

  handleMouseDown() {
    this.props.mouseDown();
  }

  handleMouseUp() {
    this.props.mouseUp();
  }

  handleMouseLeave(e) {
    e.preventDefault();
    if (this.props.dragging) {
      let leavePosition;
      if (e.nativeEvent.offsetX >= this.canvas.width / 2) {
        leavePosition = this.canvas.width;
      } else if (e.nativeEvent.offsetX < this.canvas / 2) {
        leavePosition = 0;
      } else {
        leavePosition = e.nativeEvent.offsetX;
      }
      this.props.mouseDrag(leavePosition);
    }
  }

  handleMouseEnter(e) {
    e.preventDefault();
    if (this.props.dragging) {
      let enterPosition;
      if (e.nativeEvent.offsetX > this.canvas.width - 100) {
        enterPosition = this.canvas.width;
      } else if (e.nativeEvent.offsetX < 100) {
        enterPosition = e.nativeEvent.offsetX;
      }
      this.props.mouseDrag(enterPosition);
    }
  }

  render() {
    return (
      <canvas
        width={this.props.canvasWidth}
        height={this.props.canvasHeight}
        ref={(c) => {
          this.canvas = c;
        }}
        onMouseMove={(e) => this.handleMouseMove(e)}
        onMouseLeave={(e) => this.handleMouseLeave(e)}
        onMouseEnter={(e) => this.handleMouseEnter(e)}
        onMouseUp={(e) => this.handleMouseUp(e)}
        onMouseDown={(e) => this.handleMouseDown(e)}
        style={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }}
      />
    );
  }
}

Canvas2.propTypes = {

};

export default Canvas2;
