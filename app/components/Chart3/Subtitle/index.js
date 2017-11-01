/**
*
* Subtitle
*
*/

import React from 'react';
import StyledText from './StyledText';


function Subtitle(props) {
  const { chartHeight, chartWidth, paddingLeft, paddingRight, paddingBottom, paddingTop } = props;
  const top = paddingTop - 50;
  const left = chartWidth / 2;
  return (
    <StyledText transform={`translate(${left}, ${top})`}>
      Temperature reported as anomalies relative to the Jan 1951 - Dec 1980 average
    </StyledText>
  );
}

Subtitle.propTypes = {

};

export default Subtitle;
