/**
 *
 * Chart4
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
import makeSelectChart4 from './selectors';
import reducer from './reducer';
import saga from './saga';

export class Chart4 extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Chart4</title>
          <meta name="description" content="Description of Chart4" />
        </Helmet>
      </div>
    );
  }
}

Chart4.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  chart4: makeSelectChart4(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'chart4', reducer });
const withSaga = injectSaga({ key: 'chart4', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Chart4);
