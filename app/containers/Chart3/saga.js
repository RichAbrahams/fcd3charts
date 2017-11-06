import { takeLatest } from 'redux-saga';
import { fork, call, put, select } from 'redux-saga/effects';

import {
  DRAW_CHART,
  UPDATE_SLIDER,
  STOP_DRAWING,
} from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
import { store } from '../../app';

let draw;

function clearCanvas(paddingTop, paddingLeft, width, height, ctx) {
  ctx.fillStyle = '#e0e0e0';
  ctx.fillRect(paddingTop, paddingLeft, width, height);
}

function renderChart(data, chartWidth, chartHeight, paddingTop, paddingBottom, ctx, frame) {
  for (let i = 0; i < data.size; i += 1) {
    const item = data.get(i);
    if (item.get('render')) {
      ctx.fillStyle = item.get('fill');
      ctx.fillRect(Math.floor(item.get('x')), item.get('y'), Math.ceil(item.get('width')), item.get('height'));
    }
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

function* drawChart() {
  cancelAnimationFrame(draw);
  const paddingTop = yield select(selectors.selectPaddingTop());
  const paddingLeft = yield select(selectors.selectPaddingLeft());
  const paddingBottom = yield select(selectors.selectPaddingBottom());
  const paddingRight = yield select(selectors.selectPaddingRight());
  const ctx = yield select(selectors.selectCtx1());
  const data = yield select(selectors.selectData());
  const chartWidth = ctx.canvas.width;
  const chartHeight = ctx.canvas.height;
  yield animateDraw(data, chartWidth, chartHeight, paddingTop, paddingBottom, paddingLeft, paddingRight, ctx);
}

function* stopDrawing() {
  yield cancelAnimationFrame(draw);
}

export default function* watcher() {
  yield fork(takeLatest, DRAW_CHART, drawChart);
  yield fork(takeLatest, UPDATE_SLIDER, drawChart);
  yield fork(takeLatest, STOP_DRAWING, stopDrawing);
}
