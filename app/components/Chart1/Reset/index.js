/**
*
* Button
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Wrapper from './Wrapper';


function Reset(props) {
  return (
    <Wrapper>
      <Button onClick={() => props.resetChart()}>
      Reset Chart
      </Button>
    </Wrapper>
  );
}

Reset.propTypes = {
  resetChart: PropTypes.func,
};

export default Reset;
