/**
*
* Button
*
*/

import React from 'react';
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

};

export default Reset;
