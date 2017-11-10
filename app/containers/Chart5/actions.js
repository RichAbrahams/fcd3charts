/*
 *
 * Chart5 actions
 *
 */

import {
  DRAW_CHART,
  INITIALIZE,
  ADJUST_SCALE,
  TOGGLE_DRAGGING,
  DRAG,
} from './constants';

export function initialize(payload) {
  return {
    type: INITIALIZE,
    payload,
  };
}

export function drawChart() {
  return {
    type: DRAW_CHART,
  };
}

export function adjustScale(payload) {
  return {
    type: ADJUST_SCALE,
    payload,
  };
}

export function toggleDragging(payload) {
  return {
    type: TOGGLE_DRAGGING,
    payload,
  };
}

export function drag(payload) {
  return {
    type: DRAG,
    payload,
  };
}
