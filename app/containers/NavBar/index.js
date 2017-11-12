/**
 *
 * NavBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Wrapper from 'components/NavBar/Wrapper';
import UL from 'components/NavBar/UL';
import LI from 'components/NavBar/LI';
import { Link } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import makeSelectNavBar from './selectors';
import reducer from './reducer';

export class NavBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <UL>
          <LI><Link to={'/'}>Chart 1</Link></LI>
          <LI><Link to={'/chart2'}>Chart 2</Link></LI>
          <LI><Link to={'/chart3'}>Chart 3</Link></LI>
          <LI><Link to={'/chart4'}>Chart 4</Link></LI>
          <LI><Link to={'/chart5'}>Chart 5</Link></LI>
        </UL>
      </Wrapper>
    );
  }
}

NavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  navbar: makeSelectNavBar(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'navBar', reducer });

export default compose(
  withReducer,
  withConnect,
)(NavBar);
