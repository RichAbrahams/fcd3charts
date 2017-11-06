/**
*
* Canvas
*
*/

import React from 'react';

class Canvas extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const ctx = this.canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    this.props.loadCanvas(ctx);
  }

  handleMouseMove(e) {
    const nodes = this.props.nodes;
    const radius = this.props.radius;
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    let selected = null;
    nodes.forEach((node) => {
      const vx = mouseX - node.x;
      const vy = mouseY - node.y;
      const m = Math.sqrt((vx * vx) + (vy * vy));
      if (m < radius) {
        selected = node.index;
      }
    });
    if (this.props.selected !== selected) {
      this.props.updateSelected({ selected, mouseX, mouseY });
    }
  }

  render() {
    return (
        <canvas
          width={this.props.width}
          height={this.props.height}
          ref={(c) => {
            this.canvas = c;
          }
          }
          onMouseMove={(e) => this.handleMouseMove(e)}
        />
    );
  }
}

Canvas.propTypes = {

};

export default Canvas;
