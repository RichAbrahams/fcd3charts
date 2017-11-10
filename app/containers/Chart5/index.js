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
import Canvas1 from 'components/Chart5/Canvas1';
import ChartWrapper from 'components/ChartWrapper';
import MainWrapper from 'components/MainWrapper';
import Wrapper from 'components/Chart5/Wrapper';
import Tooltip from 'components/Chart5/Tooltip';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import * as selectors from './selectors';

export class Chart5 extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Chart5</title>
          <meta name="description" content="Description of Chart5" />
        </Helmet>
        <MainWrapper>
          <ChartWrapper {...this.props}>
            <Wrapper {...this.props} />
            {this.props.selected && <Tooltip {...this.props} />}
          </ChartWrapper>
        </MainWrapper>

      </div>
    );
  }
}

Chart5.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  canvasWidth: selectors.selectCanvasWidth(),
  canvasHeight: selectors.selectCanvasHeight(),
  dragging: selectors.dragging(),
  meteors: selectors.meteors(),
  selected: selectors.selected(),
});

function mapDispatchToProps(dispatch) {
  return {
    initialize: (c) => dispatch(actions.initialize(c)),
    drawChart: () => dispatch(actions.drawChart()),
    adjustScale: (payload) => dispatch(actions.adjustScale(payload)),
    toggleDragging: (payload) => dispatch(actions.toggleDragging(payload)),
    drag: (payload) => dispatch(actions.drag(payload)),
    updateSelected: (payload) => dispatch(actions.updateSelected(payload)),
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
