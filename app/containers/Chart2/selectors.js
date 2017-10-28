import { createSelector } from 'reselect';

const selectChart2Domain = (state) => state.get('chart2');

const selectSvg = () => createSelector(
  selectChart2Domain,
  (substate) => substate.get('svg')
);

const selectData = () => createSelector(
  selectChart2Domain,
  (substate) => substate.get('data').toJS()
);

const selectSvgWidth = () => createSelector(
  selectChart2Domain,
  (substate) => substate.get('svgWidth')
);


const selectSvgHeight = () => createSelector(
  selectChart2Domain,
  (substate) => substate.get('svgHeight')
);


const selectPaddingTop = () => createSelector(
  selectChart2Domain,
  (substate) => substate.get('paddingTop')
);

const selectPaddingBottom = () => createSelector(
  selectChart2Domain,
  (substate) => substate.get('paddingBottom')
);

const selectPaddingLeft = () => createSelector(
  selectChart2Domain,
  (substate) => substate.get('paddingLeft')
);

const selectPaddingRight = () => createSelector(
  selectChart2Domain,
  (substate) => substate.get('paddingRight')
);

const selectXScale = () => createSelector(
  selectChart2Domain,
  (substate) => substate.get('xScale')
);

const selectYScale = () => createSelector(
  selectChart2Domain,
  (substate) => substate.get('yScale')
);

const selectTooltip = () => createSelector(
  selectChart2Domain,
  (substate) => substate.get('toolTip')
);

export {
  selectData,
  selectSvgWidth,
  selectSvgHeight,
  selectSvg,
  selectPaddingRight,
  selectPaddingLeft,
  selectPaddingBottom,
  selectPaddingTop,
  selectXScale,
  selectYScale,
  selectTooltip,
};
