import { createSelector } from 'reselect';

/**
 * Direct selector to the chart3 state domain
 */
const selectChart3Domain = (state) => state.get('chart3');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Chart3
 */

const makeSelectChart3 = () => createSelector(
  selectChart3Domain,
  (substate) => substate.toJS()
);

export default makeSelectChart3;
export {
  selectChart3Domain,
};
