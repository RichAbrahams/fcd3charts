/**
*
* BottomAxisText
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import StyledText from './StyledText';


function BottomAxisText(props) {
  const { svgHeight, svgWidth, paddingLeft, paddingRight, paddingBottom } = props;
  const top = svgHeight - (paddingBottom - 60);
  const left = paddingLeft + ((svgWidth - (paddingLeft + paddingRight)) / 2);
  return (
    <StyledText transform={`translate(${left}, ${top})`}>
    Seconds behind fastest time
    </StyledText>
  );
}

BottomAxisText.propTypes = {
  svgHeight: PropTypes.number,
  svgWidth: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingBottom: PropTypes.number,
};

export default BottomAxisText;
