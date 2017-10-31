/**
*
* BottomAxisText
*
*/

import React from 'react';
import StyledText from './StyledText';


function BottomAxisText(props) {
  const { chartHeight, chartWidth, paddingLeft, paddingRight, paddingBottom } = props;
  const top = chartHeight - (paddingBottom - 50);
  const left = paddingLeft + ((chartWidth - (paddingLeft + paddingRight)) / 2);
  return (
    <StyledText transform={`translate(${left}, ${top})`}>
    Year
    </StyledText>
  );
}

BottomAxisText.propTypes = {

};

export default BottomAxisText;
