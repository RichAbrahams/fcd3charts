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
  const text = '35 Fastest times up Alpe d\u0027Huez';
  return (
    <StyledText transform={`translate(${left}, ${top})`}>
      Temperature reported as anomalies relative to the Jan 1951 - Dec 1980 average
    </StyledText>
  );
}

Subtitle.propTypes = {

};

export default Subtitle;
