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
import ChartWrapper from 'components/ChartWrapper';
import MainWrapper from 'components/MainWrapper';
import Tooltip from 'components/Chart4/Tooltip';
import Canvas from 'components/Chart4/Canvas';

import * as selectors from './selectors';
import * as actions from './actions';
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
        <MainWrapper>
          <ChartWrapper>
            <Canvas {...this.props} handleMouseMove={this.handleMouseMove} />
            {this.props.selected && <Tooltip {...this.props} />}
          </ChartWrapper>
        </MainWrapper>
      </div>
    );
  }
}

Chart4.propTypes = {

};

const mapStateToProps = createStructuredSelector({
  width: selectors.width(),
  height: selectors.height(),
  nodes: selectors.nodes(),
  radius: selectors.radius(),
  selected: selectors.selected(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadCanvas: (payload) => dispatch(actions.loadCanvas(payload)),
    updateSelected: (payload) => dispatch(actions.updateSelected(payload)),
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
