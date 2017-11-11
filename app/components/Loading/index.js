/**
*
* Loading
*
*/

import React from 'react';
import FA from 'react-fontawesome';
import Wrapper from './Wrapper';

function Loading() {
  return (
    <Wrapper>
      <FA
        className="fa fa-spinner"
        name="spinner"
        size="5x"
        spin
      />
    </Wrapper>
  );
}

Loading.propTypes = {

};

export default Loading;
