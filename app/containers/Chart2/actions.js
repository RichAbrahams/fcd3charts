/*
 *
 * Chart2 actions
 *
 */

import {
  TOGGLE_TOOLTIP,
} from './constants';

export function toggleTooltip(payload) {
  return {
    type: TOGGLE_TOOLTIP,
    payload,
  };
}

