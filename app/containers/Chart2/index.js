/**
 *
 * Chart2
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import MainWrapper from 'components/MainWrapper';
import ChartWrapper from 'components/ChartWrapper';
import Svg from 'components/Chart2/Svg';
import Tooltip from 'components/Chart2/Tooltip';
import injectReducer from 'utils/injectReducer';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';

export class Chart2 extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Chart2</title>
          <meta name="description" content="Description of Chart2" />
        </Helmet>
        <MainWrapper>
          <ChartWrapper>
            { this.props.toolTip && <Tooltip {...this.props} />}
            <Svg {...this.props} />
          </ChartWrapper>
        </MainWrapper>
      </div>
    );
  }
}

Chart2.propTypes = {
  toolTip: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  data: selectors.selectData(),
  svgWidth: selectors.selectSvgWidth(),
  svgHeight: selectors.selectSvgHeight(),
  xScale: selectors.selectXScale(),
  yScale: selectors.selectYScale(),
  paddingTop: selectors.selectPaddingTop(),
  paddingBottom: selectors.selectPaddingBottom(),
  paddingLeft: selectors.selectPaddingLeft(),
  paddingRight: selectors.selectPaddingRight(),
  toolTip: selectors.selectTooltip(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleTooltip: (payload) => dispatch(actions.toggleTooltip(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'chart2', reducer });

export default compose(
  withReducer,
  withConnect,
)(Chart2);
