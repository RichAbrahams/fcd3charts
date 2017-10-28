/**
*
* Subtitle
*
*/

import React from 'react';
import StyledText from './StyledText';


function Subtitle(props) {
  const { svgHeight, svgWidth, paddingLeft, paddingRight, paddingBottom, paddingTop } = props;
  const top = paddingTop - 50;
  const left = svgWidth / 2;
  const text = '35 Fastest times up Alpe d\u0027Huez';
  return (
    <StyledText transform={`translate(${left}, ${top})`}>
      {text}
    </StyledText>
  );
}

Subtitle.propTypes = {

};

export default Subtitle;
