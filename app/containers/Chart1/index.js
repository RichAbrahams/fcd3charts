/**
 *
 * Chart1
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Canvas1 from 'components/Chart1/Canvas1';
import Canvas2 from 'components/Chart1/Canvas2';
import Svg from 'components/Chart1/Svg';
import ChartWrapper from 'components/ChartWrapper';
import MainWrapper from 'components/MainWrapper';
import Reset from 'components/Chart1/Reset';
import Loading from 'components/Loading';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import * as selectors from './selectors';

export class Chart1 extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        <Helmet>
          <title>Chart1</title>
          <meta name="description" content="Description of Chart1" />
        </Helmet>
        <MainWrapper>
          <ChartWrapper {...this.props}>
            <Reset {...this.props} />
            <Svg {...this.props} />
            <Canvas1 {...this.props} />
            <Canvas2 {...this.props} />
          </ChartWrapper>
        </MainWrapper>
      </div>
    );
  }
}
Chart1.propTypes = {
  resetChart: PropTypes.func,
  stopDrawing: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  canvasWidth: selectors.selectCanvasWidth(),
  canvasHeight: selectors.selectCanvasHeight(),
  dragging: selectors.selectDragging(),
  fullDataSet: selectors.selectFullDataSet(),
  ctx1: selectors.selectCtx1(),
});

function mapDispatchToProps(dispatch) {
  return {
    setCtx1: (c) => dispatch(actions.setContext1(c)),
    setCtx2: (c) => dispatch(actions.setContext2(c)),
    initialize: () => dispatch(actions.initialize()),
    setSvg: (s) => dispatch(actions.setSvg(s)),
    drawChart: () => dispatch(actions.drawChart()),
    mouseDown: (payload) => dispatch(actions.mouseDown(payload)),
    mouseUp: (payload) => dispatch(actions.mouseUp(payload)),
    mouseDrag: (payload) => dispatch(actions.mouseDrag(payload)),
    mouseMove: (payload) => dispatch(actions.mouseMove(payload)),
    resetChart: () => dispatch(actions.resetChart()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'chart1', reducer });
const withSaga = injectSaga({ key: 'chart1', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Chart1);
{/* <MainWrapper>
<ChartWrapper {...this.props}>
  <Reset {...this.props} />
  <Svg {...this.props} />
  <Canvas1 {...this.props} />
  <Canvas2 {...this.props} />
</ChartWrapper>
</MainWrapper> */}