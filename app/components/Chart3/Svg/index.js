/**
*
* Svg
*
*/

import React from 'react';
// import styled from 'styled-components';
import Wrapper from './Wrapper';

import StyledSvg from './Svg';


class Svg extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <StyledSvg
          width={1200}
          height={800}
          ref={(s) => {
            this.svg = s;
          }}
        >
        </StyledSvg>
      </Wrapper>
    );
  }
}

Svg.propTypes = {

};

export default Svg;
