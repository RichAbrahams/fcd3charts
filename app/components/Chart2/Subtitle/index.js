/**
*
* Subtitle
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import StyledText from './StyledText';


function Subtitle(props) {
  const { svgWidth, paddingTop } = props;
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
  svgWidth: PropTypes.number,
  paddingTop: PropTypes.number,
};

export default Subtitle;
