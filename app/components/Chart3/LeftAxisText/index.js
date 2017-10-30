/**
*
* LeftAxisText
*
*/

import React from 'react';
import StyledText from './StyledText';


function LeftAxisText(props) {
  const { chartHeight, chartWidth, paddingLeft, paddingRight, paddingTop, paddingBottom } = props;
  const top = paddingTop + ((chartHeight - (paddingTop + paddingBottom)) / 2);
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
