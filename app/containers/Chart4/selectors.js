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

const makeSelectChart4 = () => createSelector(
  selectChart4Domain,
  (substate) => substate.toJS()
);

export default makeSelectChart4;
export {
  selectChart4Domain,
};
