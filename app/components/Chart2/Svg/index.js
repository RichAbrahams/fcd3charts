/**
*
* Svg
*
*/

import React from 'react';
// import styled from 'styled-components';
import Wrapper from './Wrapper';
import LeftAxis from '../LeftAxis';
import BottomAxis from '../BottomAxis';
import StyledSvg from './Svg';
import Plots from '../Plots';
import BottomAxisText from '../BottomAxisText';
import LeftAxisText from '../LeftAxisText';
import Title from '../Title';
import Subtitle from '../Subtitle';
import Ygridlines from '../Ygridlines';
import Xgridlines from '../Xgridlines';
import Key from '../Key';
import Background from '../Background';

class Svg extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <StyledSvg
          width={this.props.svgWidth}
          height={this.props.svgHeight}
          ref={(s) => {
            this.svg = s;
          }}
        >
          <Background {...this.props} />
          <LeftAxis {...this.props} />
          <BottomAxis {...this.props} />
          <Ygridlines {...this.props} />
          <Xgridlines {...this.props} />
          <BottomAxisText {...this.props} />
          <LeftAxisText {...this.props} />
          <Title {...this.props} />
          <Subtitle {...this.props} />
          <Plots {...this.props} />
          <Key />
        </StyledSvg>
      </Wrapper>
    );
  }
}

Svg.propTypes = {

};

export default Svg;
