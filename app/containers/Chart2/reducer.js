/*
 *
 * Chart2 reducer
 *
 */

import { fromJS } from 'immutable';
import { scaleLinear } from 'd3';
import {
  TOGGLE_TOOLTIP,
} from './constants';
import pristineData from '../../data/data2';

const times = pristineData.map((item) => item.Seconds);
const fastestTime = Math.min(...times);
const amendedData = pristineData.map((item) => {
  const timeBehindFastest = item.Seconds - fastestTime;
  return Object.assign({}, item, { timeBehindFastest });
});

const svgWidth = window.innerWidth * 0.7;
const svgHeight = ((window.innerWidth * 0.7) / 16) * 9;
const paddingTop = 100;
const paddingLeft = 100;
const paddingBottom = 100;
const paddingRight = 50;

const generateXScale = () => {
  const fastestTimes = amendedData.map((item) => item.timeBehindFastest);
  const fastest = Math.max(...fastestTimes) + 30;
  const slowest = Math.min(...fastestTimes) - 30;
  const plotArea = svgWidth - (paddingLeft + paddingRight);
  const xScale = scaleLinear()
    .domain([fastest, slowest])
    .range([0, plotArea]);
  return xScale;
};

const generateYScale = () => {
  const positions = amendedData.map((item) => item.Place);
  const bottomPlace = Math.max(...positions) + 5;
  const topPlace = Math.min(...positions);
  const plotArea = svgHeight - (paddingTop + paddingBottom);
  const yScale = scaleLinear()
    .domain([bottomPlace, topPlace])
    .range([plotArea, 0]);
  return yScale;
};

const initialState = fromJS({
  data: amendedData,
  svg: null,
  svgWidth,
  svgHeight,
  paddingTop,
  paddingLeft,
  paddingBottom,
  paddingRight,
  xScale: generateXScale(),
  yScale: generateYScale(),
  toolTip: null,
});

function chart2Reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_TOOLTIP: {
      if (!action.payload) {
        return state.set('toolTip', null);
      }
      return state.set('toolTip', action.payload);
    }
    default:
      return state;
  }
}

export default chart2Reducer;
