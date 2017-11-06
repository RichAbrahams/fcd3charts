/*
 *
 * Chart4 actions
 *
 */

import {
  UPDATE_NODES,
  LOAD_CANVAS,
  UPDATE_SELECTED,
} from './constants';

export function updateNodes(payload) {
  return {
    type: UPDATE_NODES,
    payload,
  };
}

export function loadCanvas(payload) {
  return {
    type: LOAD_CANVAS,
    payload,
  };
}

export function updateSelected(payload) {
  return {
    type: UPDATE_SELECTED,
    payload,
  };
}
