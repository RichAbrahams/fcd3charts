/**
 *
 * Chart3
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectChart3 from './selectors';
import reducer from './reducer';
import saga from './saga';

export class Chart3 extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Chart3</title>
          <meta name="description" content="Description of Chart3" />
        </Helmet>
      </div>
    );
  }
}

Chart3.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  chart3: makeSelectChart3(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'chart3', reducer });
const withSaga = injectSaga({ key: 'chart3', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Chart3);
