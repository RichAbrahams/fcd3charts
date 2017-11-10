import { takeLatest } from 'redux-saga';
import { fork, put, select } from 'redux-saga/effects';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { scaleLinear } from 'd3';
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

const extractedData = data.features.map((item) => item).filter((item) => item.geometry !== null);

const mass = extractedData.map((item) => parseInt(item.properties.mass, 10))
.filter((item) => !isNaN(item));

const max = Math.max(...mass);
const min = Math.min(...mass);
const radialScale = scaleLinear()
  .domain([min, max])
  .range([3, 30]);

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
  ctx.fillStyle = 'rgba(247, 43, 43, 0.54)';
  const meteors = extractedData.map((meteor) => {
    const [x, y] = projection(width, height)(meteor.geometry.coordinates);
    const radius = radialScale(meteor.properties.mass);
    return Object.assign({}, meteor, { x, y, radius });
  });
  meteors.forEach((meteor) => {
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
