import { takeLatest } from 'redux-saga';
import { fork, call, put, select } from 'redux-saga/effects';
// import { scaleBand, scaleLinear, axisLeft, select } from 'd3';
import * as d3 from 'd3';
import {
  DRAW_CHART,
} from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
import { store } from '../../app';

function generateXScale(data, width, paddingLeft, paddingRight) {
  const fastestTimes = data.map((item) => item.timeBehindFastest);
  const fastest = Math.max(...fastestTimes) + 30;
  const slowest = Math.min(...fastestTimes) - 30;
  const plotArea = width - (paddingLeft + paddingRight);
  const xScale = d3.scaleLinear()
    .domain([fastest, slowest])
    .range([0, plotArea]);
  return xScale;
}

function generateYScale(data, height, paddingTop, paddingBottom) {
  const positions = data.map((item) => item.Place);
  const bottomPlace = Math.max(...positions) + 5;
  const topPlace = Math.min(...positions);
  const plotArea = height - (paddingTop + paddingBottom);
  const yScale = d3.scaleLinear()
    .domain([bottomPlace, topPlace])
    .range([plotArea, 0]);
  return yScale;
}

function drawXAxis(svg, xScale, height, paddingLeft, paddingBottom) {
  const xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(5)
    .tickPadding(6);
  svg.selectAll('.xAxis')
  .remove();
  svg.append('g')
  .attr('class', 'xAxis')
  .attr('transform', `translate(${paddingLeft}, ${height - paddingBottom})`)
  .call(xAxis)
  .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-0.7em')
    .attr('dy', '0em')
    .attr('transform', () => 'rotate(-45)');
}

function drawYAxis(svg, yScale, paddingLeft, paddingRight, paddingTop) {
  const xAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(5)
    .tickPadding(6);
  svg.selectAll('.yAxis')
  .remove();
  svg.append('g')
  .attr('class', 'yAxis')
  .attr('transform', `translate(${paddingLeft}, ${paddingTop})`)
  .call(xAxis);
}

function drawAxis(svg, xScale, yScale, paddingLeft, paddingRight, paddingTop, paddingBottom, width, height) {
  const selectedSvg = d3.select(svg);
  selectedSvg.selectAll('*').remove();
  drawXAxis(selectedSvg, xScale, height, paddingLeft, paddingBottom);
  drawYAxis(selectedSvg, yScale, paddingLeft, paddingRight, paddingTop, paddingBottom, width, height);
}

function* drawChart() {
  const paddingTop = yield select(selectors.selectPaddingTop());
  const paddingLeft = yield select(selectors.selectPaddingLeft());
  const paddingBottom = yield select(selectors.selectPaddingBottom());
  const paddingRight = yield select(selectors.selectPaddingRight());
  const width = yield select(selectors.selectSvgWidth());
  const height = yield select(selectors.selectSvgHeight());
  const data = yield select(selectors.selectData());
  const svg = yield select(selectors.selectSvg());
  const xScale = generateXScale(data, width, paddingLeft, paddingRight);
  const yScale = generateYScale(data, height, paddingTop, paddingBottom);
  drawAxis(svg, xScale, yScale, paddingLeft, paddingRight, paddingTop, paddingBottom, width, height);
  // drawScatters(svg, xScale, yScale);
}

export default function* watcher() {
  yield fork(takeLatest, DRAW_CHART, drawChart);
}
