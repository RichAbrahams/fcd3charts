import { createSelector } from 'reselect';

const selectChart3Domain = (state) => state.get('chart3');

const selectData = () => createSelector(
  selectChart3Domain,
  (substate) => substate.get('data').toJS()
);

const selectChartWidth = () => createSelector(
  selectChart3Domain,
  (substate) => substate.get('chartWidth')
);

const selectChartHeight = () => createSelector(
  selectChart3Domain,
  (substate) => substate.get('chartHeight')
);

const selectCtx1 = () => createSelector(
  selectChart3Domain,
  (substate) => substate.get('ctx1')
);

const selectPaddingTop = () => createSelector(
  selectChart3Domain,
  (substate) => substate.get('paddingTop')
);

const selectPaddingBottom = () => createSelector(
  selectChart3Domain,
  (substate) => substate.get('paddingBottom')
);

const selectPaddingLeft = () => createSelector(
  selectChart3Domain,
  (substate) => substate.get('paddingLeft')
);

const selectPaddingRight = () => createSelector(
  selectChart3Domain,
  (substate) => substate.get('paddingRight')
);


const selectXScale = () => createSelector(
  selectChart3Domain,
  (substate) => substate.get('xScale')
);

const selectYScale = () => createSelector(
  selectChart3Domain,
  (substate) => substate.get('yScale')
);

const selectSliderValue = () => createSelector(
  selectChart3Domain,
  (substate) => substate.get('sliderValue')
);

export {
  selectData,
  selectChartWidth,
  selectChartHeight,
  selectCtx1,
  selectPaddingRight,
  selectPaddingLeft,
  selectPaddingBottom,
  selectPaddingTop,
  selectXScale,
  selectYScale,
  selectSliderValue,
};
