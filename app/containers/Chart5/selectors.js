import { createSelector } from 'reselect';

/**
 * Direct selector to the chart5 state domain
 */
const selectChart5Domain = (state) => state.get('chart5');

const selectCanvasWidth = () => createSelector(
  selectChart5Domain,
  (substate) => substate.get('canvasWidth')
);

const selectCanvasHeight = () => createSelector(
  selectChart5Domain,
  (substate) => substate.get('canvasHeight')
);

const selectInitialScale = () => createSelector(
  selectChart5Domain,
  (substate) => substate.get('initialScale')
);

const selectScaleModifier = () => createSelector(
  selectChart5Domain,
  (substate) => substate.get('scaleModifier')
);

const selectCtx1 = () => createSelector(
  selectChart5Domain,
  (substate) => substate.get('ctx1')
);


const dragging = () => createSelector(
  selectChart5Domain,
  (substate) => substate.get('dragging')
);

const translateX = () => createSelector(
  selectChart5Domain,
  (substate) => substate.get('translateX')
);

const translateY = () => createSelector(
  selectChart5Domain,
  (substate) => substate.get('translateY')
);

const meteors = () => createSelector(
  selectChart5Domain,
  (substate) => substate.get('meteors')
);

const selected = () => createSelector(
  selectChart5Domain,
  (substate) => substate.get('selected')
);

export {
  selectCanvasWidth,
  selectCanvasHeight,
  selectCtx1,
  selectInitialScale,
  selectScaleModifier,
  dragging,
  translateX,
  translateY,
  meteors,
  selected,
};
