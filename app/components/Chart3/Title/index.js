/**
*
* Title
*
*/

import React from 'react';
import StyledText from './StyledText';


function Title(props) {
  const { chartHeight, chartWidth, paddingLeft, paddingRight, paddingBottom, paddingTop } = props;
  const top = paddingTop - 70;
  const left = chartWidth / 2;
  return (
    <StyledText transform={`translate(${left}, ${top})`}>
    Monthly Global Land-Surface Temperature 1753-2015
    </StyledText>
  );
}

Title.propTypes = {

};

export default Title;
