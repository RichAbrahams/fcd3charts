import { createSelector } from 'reselect';

/**
 * Direct selector to the chart4 state domain
 */
const selectChart4Domain = (state) => state.get('chart4');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Chart4
 */

const nodes = () => createSelector(
  selectChart4Domain,
  (substate) => substate.get('nodes').toJS()
);

const links = () => createSelector(
  selectChart4Domain,
  (substate) => substate.get('links').toJS()
);

const width = () => createSelector(
  selectChart4Domain,
  (substate) => substate.get('width')
);

const height = () => createSelector(
  selectChart4Domain,
  (substate) => substate.get('height')
);

const flagImage = () => createSelector(
  selectChart4Domain,
  (substate) => substate.get('flagImage')
);

const flagPositions = () => createSelector(
  selectChart4Domain,
  (substate) => substate.get('flagPositions').toJS()
);

const radius = () => createSelector(
  selectChart4Domain,
  (substate) => substate.get('radius')
);

const selected = () => createSelector(
  selectChart4Domain,
  (substate) => substate.get('selected')
);

const ctx = () => createSelector(
  selectChart4Domain,
  (substate) => substate.get('ctx')
);

export {
  nodes,
  links,
  width,
  height,
  flagImage,
  flagPositions,
  radius,
  selected,
  ctx,
};
