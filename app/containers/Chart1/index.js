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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import * as selectors from './selectors';

export class Chart1 extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillUnmount() {
    this.props.resetChart();
    this.props.stopDrawing();
  }

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

};

const mapStateToProps = createStructuredSelector({
  canvasWidth: selectors.selectCanvasWidth(),
  canvasHeight: selectors.selectCanvasHeight(),
  dragging: selectors.selectDragging(),
  fullDataSet: selectors.selectFullDataSet(),
});

function mapDispatchToProps(dispatch) {
  return {
    setCtx1: (c) => dispatch(actions.setContext1(c)),
    setCtx2: (c) => dispatch(actions.setContext2(c)),
    setSvg: (s) => dispatch(actions.setSvg(s)),
    drawChart: () => dispatch(actions.drawChart()),
    mouseDown: (payload) => dispatch(actions.mouseDown(payload)),
    mouseUp: (payload) => dispatch(actions.mouseUp(payload)),
    mouseDrag: (payload) => dispatch(actions.mouseDrag(payload)),
    mouseMove: (payload) => dispatch(actions.mouseMove(payload)),
    resetChart: () => dispatch(actions.resetChart()),
    stopDrawing: () => dispatch(actions.stopDrawing()),
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
