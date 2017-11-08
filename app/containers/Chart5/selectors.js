import { createSelector } from 'reselect';

/**
 * Direct selector to the chart5 state domain
 */
const selectChart5Domain = (state) => state.get('chart5');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Chart5
 */

const countries = () => createSelector(
  selectChart5Domain,
  (substate) => substate.get('countries').toJS()
);

const width = () => createSelector(
  selectChart5Domain,
  (substate) => substate.get('width')
);

const height = () => createSelector(
  selectChart5Domain,
  (substate) => substate.get('height')
);

const meteorites = () => createSelector(
  selectChart5Domain,
  (substate) => substate.get('meteorites').get('features').toJS()
);

const projection = () => createSelector(
  selectChart5Domain,
  (substate) => substate.get('projection')
);

const scale = () => createSelector(
  selectChart5Domain,
  (substate) => substate.get('scale')
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

const radialScale = () => createSelector(
  selectChart5Domain,
(substate) => substate.get('radialScale')
);

export {
  countries,
  width,
  height,
  meteorites,
  projection,
  scale,
  dragging,
  translateX,
  translateY,
  radialScale,
};
