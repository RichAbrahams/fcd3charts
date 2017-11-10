/*
 *
 * Chart5 actions
 *
 */

import {
  ADJUST_SCALE,
  TOGGLE_DRAGGING,
  DRAG,
  DEBOUNCED_DRAG,
  UPDATE_TOOLTIP,
} from './constants';

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

export function debouncedDrag(payload) {
  return {
    type: DEBOUNCED_DRAG,
    payload,
  };
}

export function drag(payload) {
  return {
    type: DRAG,
    payload,
  };
}

export function updateTooltip(payload) {
  return {
    type: UPDATE_TOOLTIP,
    payload,
  };
}
