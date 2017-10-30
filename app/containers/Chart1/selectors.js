import { createSelector } from 'reselect';


const selectChart1Domain = (state) => state.get('chart1');

const selectStartDate = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('startDate')
);

const selectEndDate = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('endDate')
);

const selectCanvasWidth = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('canvasWidth')
);

const selectCanvasHeight = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('canvasHeight')
);

const selectCtx1 = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('ctx1')
);

const selectCtx2 = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('ctx2')
);

const selectSvg = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('svg')
);

const selectDragging = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('dragging')
);

const selectDragStart = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('dragStart')
);

const selectDragStop = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('dragStop')
);

const selectFullDataSet = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('fullDataSet').toJS()
);

const selectFilteredDataSet = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('filteredDataSet')
);

const selectPaddingTop = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('paddingTop')
);

const selectPaddingBottom = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('paddingBottom')
);

const selectPaddingLeft = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('paddingLeft')
);

const selectPaddingRight = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('paddingRight')
);

const selectMouseX = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('mouseX')
);

const selectMouseY = () => createSelector(
  selectChart1Domain,
  (substate) => substate.get('mouseY')
);


export {
  selectChart1Domain,
  selectStartDate,
  selectEndDate,
  selectCanvasWidth,
  selectCanvasHeight,
  selectCtx1,
  selectCtx2,
  selectSvg,
  selectDragging,
  selectDragStart,
  selectDragStop,
  selectFullDataSet,
  selectFilteredDataSet,
  selectPaddingRight,
  selectPaddingLeft,
  selectPaddingBottom,
  selectPaddingTop,
  selectMouseX,
  selectMouseY,
};
