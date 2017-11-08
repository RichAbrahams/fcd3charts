/**
*
* Svg
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

class Svg extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.setSvg(this.svg);
  }

  render() {
    return (
      <Wrapper>
        <svg
          width={this.props.canvasWidth}
          height={this.props.canvasHeight}
          ref={(s) => {
            this.svg = s;
          }}
          style={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }}
        />
      </Wrapper>
    );
  }
}

Svg.propTypes = {
  canvasWidth: PropTypes.number,
  canvasHeight: PropTypes.number,
  setSvg: PropTypes.func,
};

export default Svg;
