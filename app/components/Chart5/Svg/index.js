/**
*
* Svg
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import StyledSvg from './Svg';

class Svg extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { scale, translateX, translateY, width, height, children } = this.props;
    const styling = {
      transform: `matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`,
    };
    return (
      <StyledSvg
        width={width}
        height={height}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        fill="#4169E1"
        style={styling}
      >
        {children}
      </StyledSvg>
    );
  }
}

Svg.propTypes = {
  scale: PropTypes.number,
  translateX: PropTypes.number,
  translateY: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.array,
};

export default Svg;
