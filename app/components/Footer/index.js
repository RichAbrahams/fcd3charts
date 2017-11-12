/**
*
* Footer
*
*/

import React from 'react';
import FA from 'react-fontawesome';
import Wrapper from './Wrapper';

function Footer() {
  return (
    <Wrapper>
      <a href="https://github.com/RichAbrahams/fcd3charts">
        <span>Created by Rich Abrahams</span>
        <FA
          className="fa-github"
          name="fa-github"
          size="2x"
        />
      </a>
    </Wrapper>
  );
}

Footer.propTypes = {

};

export default Footer;
