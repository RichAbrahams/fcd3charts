/*
 *
 * Chart3 actions
 *
 */

import {
  SET_CONTEXT1,
  DRAW_CHART,
  UPDATE_SLIDER,
  MOUSE_MOVE,
  FILTERED_DATA,
  STOP_DRAWING,
} from './constants';

export function setContext1(payload) {
  return {
    type: SET_CONTEXT1,
    payload,
  };
}

export function drawChart() {
  return {
    type: DRAW_CHART,
  };
}

export function updateSlider(payload) {
  return {
    type: UPDATE_SLIDER,
    payload,
  };
}

export function mouseMove(payload) {
  return {
    type: MOUSE_MOVE,
    payload,
  };
}

export function filteredData(payload) {
  return {
    type: FILTERED_DATA,
    payload,
  };
}

export function stopDrawing() {
  return {
    type: STOP_DRAWING,
  };
}
