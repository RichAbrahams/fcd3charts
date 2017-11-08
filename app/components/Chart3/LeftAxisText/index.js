/**
*
* LeftAxisText
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import StyledText from './StyledText';


function LeftAxisText(props) {
  const { chartHeight, paddingLeft, paddingTop, paddingBottom } = props;
  const top = paddingTop + ((chartHeight - (paddingTop + paddingBottom)) / 2);
  const left = paddingLeft - 50;
  return (
    <StyledText transform={`translate(${left},${top}) rotate(-90)`}>
    Month
    </StyledText>
  );
}

LeftAxisText.propTypes = {
  chartHeight: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
};

export default LeftAxisText;
