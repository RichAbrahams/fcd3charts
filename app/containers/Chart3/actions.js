/*
 *
 * Chart3 actions
 *
 */

import {
  SET_CONTEXT1,
  DRAW_CHART,
  UPDATE_SLIDER,

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
