import { takeLatest } from 'redux-saga';
import { fork, put, select } from 'redux-saga/effects';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { scaleLinear } from 'd3';
import { INITIALIZE, ADJUST_SCALE, DRAG } from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
import topoMap from '../../data/data5/world-countries-sans-antarctica.json';
import { drawChart } from './actions';


let ctx;
let width;
let height;
let initialScale;
let scaleModifier;
let translateX;
let translateY;

function clearCanvas() {
  ctx.fillStyle = '#1E90FF';
  ctx.fillRect(0, 0, width, height);
}

function* draw() {
  clearCanvas();
  const projection = geoMercator()
    .scale(initialScale * scaleModifier)
    .translate([(width / 2) + translateX, (height / 2) + translateY]);
  const path = geoPath()
    .projection(projection).context(ctx);
  const countries = feature(topoMap, topoMap.objects.countries1).features;
  ctx.fillStyle = '#228B22';
  countries.forEach((country) => {
    ctx.beginPath();
    path(country);
    ctx.stroke();
    ctx.fill();
  });
}

function* adjustScale() {
  scaleModifier = yield select(selectors.selectScaleModifier());
  translateX = yield select(selectors.translateX());
  translateY = yield select(selectors.translateY());
  yield draw();
}

function* initialize() {
  ctx = yield select(selectors.selectCtx1());
  width = yield select(selectors.selectCanvasWidth());
  height = yield select(selectors.selectCanvasHeight());
  initialScale = yield select(selectors.selectInitialScale());
  scaleModifier = yield select(selectors.selectScaleModifier());
  translateX = yield select(selectors.translateX());
  translateY = yield select(selectors.translateY());
  yield draw();
}

function* drag() {
  translateX = yield select(selectors.translateX());
  translateY = yield select(selectors.translateY());
  yield draw();
}

export default function* watcher() {
  yield fork(takeLatest, INITIALIZE, initialize);
  yield fork(takeLatest, ADJUST_SCALE, adjustScale);
  yield fork(takeLatest, DRAG, drag);
}
