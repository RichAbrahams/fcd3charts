/**
 *
 * Chart5
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Svg from 'components/Chart5/Svg';
import ChartWrapper from 'components/ChartWrapper';
import MainWrapper from 'components/MainWrapper';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

export class Chart5 extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Chart5</title>
          <meta name="description" content="Description of Chart5" />
        </Helmet>
        <MainWrapper>
          <ChartWrapper>
            <Svg {...this.props} />
          </ChartWrapper>
        </MainWrapper>
      </div>
    );
  }
}

Chart5.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  countries: selectors.countries(),
  width: selectors.width(),
  height: selectors.height(),
  meteorites: selectors.meteorites(),
  projection: selectors.projection(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'chart5', reducer });
const withSaga = injectSaga({ key: 'chart5', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Chart5);
