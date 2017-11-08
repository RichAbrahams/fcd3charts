/**
*
* Subtitle
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import StyledText from './StyledText';


function Subtitle(props) {
  const { chartWidth, paddingTop } = props;
  const top = paddingTop - 50;
  const left = chartWidth / 2;
  return (
    <StyledText transform={`translate(${left}, ${top})`}>
      Temperature reported as anomalies relative to the Jan 1951 - Dec 1980 average
    </StyledText>
  );
}

Subtitle.propTypes = {
  chartWidth: PropTypes.number,
  paddingTop: PropTypes.number,
};

export default Subtitle;
