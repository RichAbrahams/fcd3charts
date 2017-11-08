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
import Canvas1 from 'components/Chart3/Canvas1';
import Svg from 'components/Chart3/Svg';
import Slider from 'components/Chart3/Slider';
import Tooltip from 'components/Chart3/Tooltip';

import ChartWrapper from 'components/ChartWrapper';
import MainWrapper from 'components/MainWrapper';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

export class Chart3 extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillUnmount() {
    this.props.stopDrawing();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Chart3</title>
          <meta name="description" content="Description of Chart3" />
        </Helmet>
        <MainWrapper>
          <ChartWrapper {...this.props}>
            <Svg {...this.props} />
            <Canvas1 {...this.props} />
            <Slider {...this.props} />
            {this.props.toolTip && <Tooltip {...this.props} />}
          </ChartWrapper>
        </MainWrapper>
      </div>
    );
  }
}

Chart3.propTypes = {
  stopDrawing: PropTypes.func,
  toolTip: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  chartWidth: selectors.selectChartWidth(),
  chartHeight: selectors.selectChartHeight(),
  ctx1: selectors.selectCtx1(),
  paddingRight: selectors.selectPaddingRight(),
  paddingLeft: selectors.selectPaddingLeft(),
  paddingBottom: selectors.selectPaddingBottom(),
  paddingTop: selectors.selectPaddingTop(),
  xScale: selectors.selectXScale(),
  yScale: selectors.selectYScale(),
  sliderValue: selectors.selectSliderValue(),
  data: selectors.selectData(),
  toolTip: selectors.selectToolTip(),
  mousePosition: selectors.selectMousePosition(),
});

function mapDispatchToProps(dispatch) {
  return {
    setCtx1: (payload) => dispatch(actions.setContext1(payload)),
    drawChart: () => dispatch(actions.drawChart()),
    updateSlider: (payload) => dispatch(actions.updateSlider(payload)),
    mouseMove: (payload) => dispatch(actions.mouseMove(payload)),
    stopDrawing: () => dispatch(actions.stopDrawing()),
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
