/**
 *
 * Chart5
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Wrapper from 'components/Chart5/Wrapper';
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
            <Wrapper {...this.props} />
          </ChartWrapper>
        </MainWrapper>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  countries: selectors.countries(),
  width: selectors.width(),
  height: selectors.height(),
  meteorites: selectors.meteorites(),
  projection: selectors.projection(),
  scale: selectors.scale(),
  dragging: selectors.dragging(),
  translateX: selectors.translateX(),
  translateY: selectors.translateY(),
  radialScale: selectors.radialScale(),
});

function mapDispatchToProps(dispatch) {
  return {
    adjustScale: (payload) => dispatch(actions.adjustScale(payload)),
    toggleDragging: (payload) => dispatch(actions.toggleDragging(payload)),
    drag: (payload) => dispatch(actions.debouncedDrag(payload)),
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
