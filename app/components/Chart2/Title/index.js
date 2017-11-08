/**
*
* Title
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import StyledText from './StyledText';


function Title(props) {
  const { svgWidth, paddingTop } = props;
  const top = paddingTop - 70;
  const left = svgWidth / 2;
  return (
    <StyledText transform={`translate(${left}, ${top})`}>
    Alleged Drug Use In Professional Cycling
    </StyledText>
  );
}

Title.propTypes = {
  svgWidth: PropTypes.number,
  paddingTop: PropTypes.number,
};

export default Title;
