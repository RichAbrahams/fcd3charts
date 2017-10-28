/**
*
* LeftAxisText
*
*/

import React from 'react';
import StyledText from './StyledText';


function LeftAxisText(props) {
  const { svgHeight, svgWidth, paddingLeft, paddingRight, paddingTop, paddingBottom } = props;
  const top = paddingTop + ((svgHeight - (paddingTop + paddingBottom)) / 2);
  const left = paddingLeft - 50;
  return (
    <StyledText transform={`translate(${left},${top}) rotate(-90)`}>
    Ranking
    </StyledText>
  );
}

LeftAxisText.propTypes = {

};

export default LeftAxisText;
