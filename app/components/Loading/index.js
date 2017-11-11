/**
*
* Loading
*
*/

import React from 'react';
import FA from 'react-fontawesome';


function Loading() {
  return (
    <div>
      <FA
        className="fa fa-spinner"
        name="spinner"
        size="2x"
        spin
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />
    </div>
  );
}

Loading.propTypes = {

};

export default Loading;
