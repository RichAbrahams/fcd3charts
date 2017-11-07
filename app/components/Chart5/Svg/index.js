/**
*
* Svg
*
*/

import React from 'react';
// import styled from 'styled-components';
import Wrapper from './Wrapper';
import StyledSvg from './Svg';
import Paths from '../Paths';
import Strikes from '../Strikes';
class Svg extends React.Component { // eslint-disable-line react/prefer-stateless-function

  handleWheel(e) {
    e.preventDefault();
    console.log(e.nativeEvent.deltaY);
    console.log(e.nativeEvent.offsetX);
  }
  render() {
    return (
      <Wrapper>
        <StyledSvg
          width={this.props.width}
          height={this.props.height}
          viewBox={`0 0 ${this.props.width} ${this.props.height}`}
          fill="#4169E1"
          onWheel={(e) => this.handleWheel(e)}
        >
          <Paths {...this.props} />
          <Strikes {...this.props} />
        </StyledSvg>
      </Wrapper>
    );
  }
}

Svg.propTypes = {

};

export default Svg;
