/*
 *
 * Chart3 reducer
 *
 */

import { fromJS } from 'immutable';
import { scaleBand, scaleQuantile } from 'd3';
import {
  SET_CONTEXT1,
  UPDATE_SLIDER,
  MOUSE_MOVE,
} from './constants';
import originalData from '../../data/data3';

const chartWidth = 1000;
const chartHeight = 562;
const paddingTop = 100;
const paddingLeft = 100;
const paddingBottom = 100;
const paddingRight = 50;
const colors = [
  'rgba(94, 79, 162,1)',
  'rgba(50, 136, 189,1)',
  'rgba(102, 194, 165,1)',
  'rgba(171, 221, 164,1)',
  'rgba(230, 245, 152,1)',
  'rgba(255, 255, 191,1)',
  'rgba(254, 224, 139,1)',
  'rgba(253, 174, 97,1)',
  'rgba(244, 109, 67,1)',
  'rgba(213, 62, 79,1)',
  'rgba(158, 1, 66,1)',
];
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const generateXScale = () => {
  const years = originalData.monthlyVariance.map((item) => item.year);
  const plotArea = chartWidth - (paddingLeft + paddingRight);
  const xScale = scaleBand()
    .domain(years)
    .range([0, plotArea]);
  return xScale;
};

const generateYScale = () => {
  const plotArea = chartHeight - (paddingTop + paddingBottom);
  const yScale = scaleBand()
    .domain(monthNames)
    .range([0, plotArea]);
  return yScale;
};

const generateColorScale = () => {
  const variance = originalData.monthlyVariance.map((item) => item.variance);
  const min = Math.max(...variance);
  const max = Math.min(...variance);
  const colorScale = scaleQuantile()
  .domain([min, max])
  .range(colors);
  return colorScale;
};

const xScale = generateXScale();
const yScale = generateYScale();
const colorScale = generateColorScale();

const data = originalData.monthlyVariance.map((item) => Object.assign({}, item, {
  monthName: monthNames[item.month - 1],
  temp: 8.66 + item.variance,
  x: xScale(item.year) + paddingLeft,
  y: yScale(monthNames[item.month - 1]) + paddingTop,
  width: xScale.bandwidth(),
  height: yScale.bandwidth(),
  fill: colorScale(item.variance),
  render: true,
}));

const initialState = fromJS({
  data,
  filteredData: data,
  chartWidth,
  chartHeight,
  paddingTop,
  paddingLeft,
  paddingBottom,
  paddingRight,
  xScale: generateXScale(),
  yScale: generateYScale(),
  ctx1: null,
  sliderValue: 0,
  monthNames,
  toolTip: null,
  mousePosition: null,
});

function chart3Reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONTEXT1:
      return state.set('ctx1', action.payload);
    case UPDATE_SLIDER: {
      const sliderValue = action.payload;
      const currentData = state.get('data');
      const newData = currentData.map((item) => {
        const render = item.get('temp') > sliderValue;
        if (item.get('render') !== render) {
          return item.set('render', render);
        }
        return item;
      });
      return state.merge({ data: newData, sliderValue });
    }
    case MOUSE_MOVE: {
      if (!action.payload) {
        return state.merge({ toolTip: null, mousePosition: null });
      }
      const { x, y } = action.payload;
      const arrayX = Math.floor(action.payload.x / xScale.bandwidth());
      const arrayY = Math.floor(action.payload.y / yScale.bandwidth());
      const selectedIndex = arrayY + (yScale.domain().length * arrayX);
      return state.merge({ toolTip: selectedIndex.toString(), mousePosition: { x, y } });
    }
    default:
      return state;
  }
}

export default chart3Reducer;
