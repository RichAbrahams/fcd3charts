/**
*
* BottomAxisText
*
*/

import React from 'react';
import StyledText from './StyledText';


function BottomAxisText(props) {
  const { svgHeight, svgWidth, paddingLeft, paddingRight, paddingBottom } = props;
  const top = svgHeight - (paddingBottom - 30);
  const left = paddingLeft + ((svgWidth - (paddingLeft + paddingRight)) / 2);
  return (
    <StyledText transform={`translate(${top}, ${left})`}>
    Seconds behind fastest time
    </StyledText>
  );
}

BottomAxisText.propTypes = {

};

export default BottomAxisText;
