import { takeLatest } from 'redux-saga';
import { fork, call, put, select } from 'redux-saga/effects';

import {
  DRAW_CHART,
  UPDATE_SLIDER,
} from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
import { store } from '../../app';

let draw;

function clearCanvas(paddingTop, paddingLeft, width, height, ctx) {
  ctx.fillStyle = '#e0e0e0';
  ctx.fillRect(paddingTop, paddingLeft, width, height);
}

function renderChart(data, chartWidth, chartHeight, paddingTop, paddingBottom, ctx, frame, totalFrames) {
  for (let i = 0; i < data.length; i += 1) {
    ctx.fillStyle = data[i].fill;
    ctx.fillRect(data[i].x, data[i].y, data[i].width, data[i].height);
  }
}

function animateDraw(data, chartWidth, chartHeight, paddingTop, paddingBottom, paddingLeft, paddingRight, ctx) {
  const width = chartWidth - (paddingLeft + paddingRight);
  const height = chartHeight - (paddingBottom + paddingTop);
  let next = 0;
  const step = 1000 / 60;
  let frame = 0;
  const totalFrames = 30;
  draw = (timestamp = 0) => {
    if (timestamp >= next) {
      clearCanvas(paddingTop, paddingLeft, width, height, ctx);
      renderChart(data, chartWidth, chartHeight, paddingTop, paddingBottom, ctx, frame, totalFrames);
      frame += 1;
      next = timestamp + step;
    }
    requestAnimationFrame(draw);
  };
  draw();
}

function filterData(data, sliderValue) {
  const filteredData = data.filter((item) => item.temp > sliderValue);
  return filteredData;
}

function* drawChart() {
  cancelAnimationFrame(draw);
  const paddingTop = yield select(selectors.selectPaddingTop());
  const paddingLeft = yield select(selectors.selectPaddingLeft());
  const paddingBottom = yield select(selectors.selectPaddingBottom());
  const paddingRight = yield select(selectors.selectPaddingRight());
  const ctx = yield select(selectors.selectCtx1());
  const data = yield select(selectors.selectData());
  const sliderValue = yield select(selectors.selectSliderValue());
  const chartWidth = ctx.canvas.width;
  const chartHeight = ctx.canvas.height;
  const filteredData = filterData(data, sliderValue);
  yield animateDraw(filteredData, chartWidth, chartHeight, paddingTop, paddingBottom, paddingLeft, paddingRight, ctx);
}

export default function* watcher() {
  yield fork(takeLatest, DRAW_CHART, drawChart);
  yield fork(takeLatest, UPDATE_SLIDER, drawChart);
}
