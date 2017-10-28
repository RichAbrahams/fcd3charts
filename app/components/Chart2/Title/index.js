/**
*
* Title
*
*/

import React from 'react';
import StyledText from './StyledText';


function Title(props) {
  const { svgHeight, svgWidth, paddingLeft, paddingRight, paddingBottom, paddingTop } = props;
  const top = paddingTop - 70;
  const left = svgWidth / 2;
  return (
    <StyledText transform={`translate(${left}, ${top})`}>
    Alleged Drug Use In Professional Cycling
    </StyledText>
  );
}

Title.propTypes = {

};

export default Title;
