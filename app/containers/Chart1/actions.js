/*
 *
 * Chart1 actions
 *
 */

import {
  SET_CONTEXT1,
  SET_CONTEXT2,
  INITIALIZE,
  DRAW_CHART,
  MOUSE_DOWN,
  MOUSE_UP,
  MOUSE_DRAG,
  MOUSE_MOVE,
  SET_FILTERED_DATA,
  SET_DATES,
  RESET_DRAG,
  RESET_CHART,
  SET_SVG,
  STOP_DRAWING,
} from './constants';

export function setContext1(payload) {
  return {
    type: SET_CONTEXT1,
    payload,
  };
}

export function setContext2(payload) {
  return {
    type: SET_CONTEXT2,
    payload,
  };
}

export function setSvg(payload) {
  return {
    type: SET_SVG,
    payload,
  };
}

export function initialize() {
  return {
    type: INITIALIZE,
  };
}

export function drawChart() {
  return {
    type: DRAW_CHART,
  };
}

export function mouseDown(payload) {
  return {
    type: MOUSE_DOWN,
    payload,
  };
}

export function mouseUp(payload) {
  return {
    type: MOUSE_UP,
    payload,
  };
}

export function mouseDrag(payload) {
  return {
    type: MOUSE_DRAG,
    payload,
  };
}

export function mouseMove(payload) {
  return {
    type: MOUSE_MOVE,
    payload,
  };
}

export function setFilteredData(payload) {
  return {
    type: SET_FILTERED_DATA,
    payload,
  };
}

export function setDates(payload) {
  return {
    type: SET_DATES,
    payload,
  };
}

export function resetDrag() {
  return {
    type: RESET_DRAG,
  };
}

export function resetChart() {
  return {
    type: RESET_CHART,
  };
}

