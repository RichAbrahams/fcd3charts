/**
*
* Title
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import StyledText from './StyledText';


function Title(props) {
  const { chartWidth, paddingTop } = props;
  const top = paddingTop - 70;
  const left = chartWidth / 2;
  return (
    <StyledText transform={`translate(${left}, ${top})`}>
    Monthly Global Land-Surface Temperature 1753-2015
    </StyledText>
  );
}

Title.propTypes = {
  chartWidth: PropTypes.number,
  paddingTop: PropTypes.number,
};

export default Title;
