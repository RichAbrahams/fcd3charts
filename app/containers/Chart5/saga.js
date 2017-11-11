import { takeLatest } from 'redux-saga';
import { fork, put, select } from 'redux-saga/effects';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { INITIALIZE, ADJUST_SCALE, DRAG } from './constants';
import * as selectors from './selectors';
import topoMap from '../../data/data5/world-countries-sans-antarctica.json';
import data from '../../data/data5/meteorite-strike-data.json';
import { replaceMeteors } from './actions';


let ctx;
let width;
let height;
let initialScale;
let scaleModifier;
let translateX;
let translateY;

const extractedData = data.features.map((item) => item)
  .filter((item) => item.geometry !== null && item.properties.mass !== null)
  .sort((a, b) => a.properties.mass - b.properties.mass);

const calcRadius = (input) => {
  if (input < 100) {
    return [3, 'rgba(251, 247, 28, 0.6)'];
  } else if (input < 100) {
    return [5, 'rgba(117, 251, 28, 0.6)'];
  } else if (input < 10000) {
    return [8, 'rgba(28, 247, 251, 0.6)'];
  } else if (input < 100000) {
    return [10, 'rgba(28, 99, 251, 0.6)'];
  } else if (input < 1000000) {
    return [15, 'rgba(106, 28, 251, 0.6)'];
  }
  return [20, 'rgba(251, 28, 32, 0.6)'];
};

function clearCanvas() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);
}

function* draw() {
  clearCanvas();
  const projection = () => geoMercator()
    .scale(initialScale * scaleModifier)
    .translate([(width / 2) + translateX, (width / 2) + translateY]);
  const path = geoPath()
    .projection(projection()).context(ctx);
  const countries = feature(topoMap, topoMap.objects.countries1).features;
  ctx.fillStyle = '#888';
  countries.forEach((country) => {
    ctx.beginPath();
    path(country);
    ctx.stroke();
    ctx.fill();
  });

  const meteors = extractedData.map((meteor) => {
    const [x, y] = projection(width, height)(meteor.geometry.coordinates);
    const size = calcRadius(meteor.properties.mass);
    return Object.assign({}, meteor, { x, y, radius: size[0], color: size[1] });
  });
  meteors.forEach((meteor) => {
    ctx.fillStyle = meteor.color;
    ctx.beginPath();
    ctx.arc(meteor.x, meteor.y, meteor.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  });
  yield put(replaceMeteors(meteors));
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
