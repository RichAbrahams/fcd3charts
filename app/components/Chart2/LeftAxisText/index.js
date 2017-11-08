/**
*
* LeftAxisText
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import StyledText from './StyledText';


function LeftAxisText(props) {
  const { svgHeight, paddingLeft, paddingTop, paddingBottom } = props;
  const top = paddingTop + ((svgHeight - (paddingTop + paddingBottom)) / 2);
  const left = paddingLeft - 50;
  return (
    <StyledText transform={`translate(${left},${top}) rotate(-90)`}>
    Ranking
    </StyledText>
  );
}

LeftAxisText.propTypes = {
  svgHeight: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
};

export default LeftAxisText;
