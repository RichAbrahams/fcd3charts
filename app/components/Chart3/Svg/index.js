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
import BottomAxisText from '../BottomAxisText';
import LeftAxisText from '../LeftAxisText';
import Title from '../Title';
import Subtitle from '../Subtitle';

class Svg extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <StyledSvg
          width={this.props.chartWidth}
          height={this.props.chartHeight}
          ref={(s) => {
            this.svg = s;
          }}
        >
          <LeftAxis {...this.props} />
          <BottomAxis {...this.props} />
          <BottomAxisText {...this.props} />
          <LeftAxisText {...this.props} />
          <Title {...this.props} />
          <Subtitle {...this.props} />
        </StyledSvg>
      </Wrapper>
    );
  }
}

Svg.propTypes = {

};

export default Svg;
