import { takeLatest } from 'redux-saga';
import { fork, put, select } from 'redux-saga/effects';
import { scaleBand, scaleLinear, axisLeft, path, axisBottom, select as d3Select } from 'd3';
import {
  DRAW_CHART,
  MOUSE_DRAG,
  MOUSE_UP,
  RESET_CHART,
  INITIALIZE,
} from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
import { store } from '../../app';

let draw;
let paddingTop;
let paddingLeft;
let paddingBottom;
let paddingRight;
let fullData;
let startDate;
let endDate;
let ctx1;
let ctx2;
let canvasWidth;
let canvasHeight;
let svg;

function spline(t, a, b, c, d) {
  return 0.5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);  // eslint-disable-line no-mixed-operators
}

function clearCanvas() {
  ctx1.fillStyle = 'white';
  ctx1.fillRect(0, 0, canvasWidth, canvasHeight);
}

function drawBar(x, width, height) {
  ctx1.fillRect(x, canvasHeight - height, width, height);
}

function getQuarterText(date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  let quarter;
  switch (month) {
    case 9:
      quarter = 1;
      break;
    case 0:
      quarter = 2;
      break;
    case 3:
      quarter = 3;
      break;
    case 6:
      quarter = 4;
      break;
    default:
      quarter = 'unknown';
  }
  return `Q${quarter} ${year}`;
}

function drawToolTip(selected) {
  ctx1.fillStyle = 'rgba(107, 107, 107, 1)';
  ctx1.textAlign = 'center';
  ctx1.font = '12px sans-serif';
  const quarter = getQuarterText(selected.date);
  ctx1.fillText(quarter, selected.x + (selected.width / 2), canvasHeight - (selected.height + 30));
  ctx1.fillText(`$${selected.gdp} billion`, selected.x + (selected.width / 2), canvasHeight - (selected.height + 15));
}

function checkMousePosition(item) {
  const mouseX = store.getState().get('chart1').get('mouseX');
  const mouseY = store.getState().get('chart1').get('mouseY');
  return mouseX && mouseY
    && item.x < mouseX
    && item.x + item.width > mouseX
    && paddingBottom < mouseY
    && canvasHeight - paddingBottom > mouseY;
}

function drawSpline(frame, totalFrames, drawData, item) {
  const normalizedFrame = frame / totalFrames;
  const curve = spline(normalizedFrame, 0, 0, 1, -2.5);
  const currentHeight = (item.height * curve) + (0 * (1 - curve));
  drawBar(item.x, item.width, currentHeight);
}

function renderChart(frame, totalFrames, drawData) {
  let selected = null;
  drawData.forEach((item) => {
    ctx1.fillStyle = 'rgba(138, 166, 199, 0.72)';
    if (checkMousePosition(item)) {
      selected = item;
      ctx1.fillStyle = 'rgb(231, 76, 60)';
    }
    if (frame <= totalFrames) {
      drawSpline(frame, totalFrames, drawData, item);
    } else {
      drawBar(item.x, item.width, item.height);
    }
  });
  if (selected) {
    drawToolTip(selected);
  }
}

function* animateDraw(drawData) {
  let next = 0;
  const step = 1000 / 60;
  let frame = 0;
  const totalFrames = 30;
  draw = (timestamp = 0) => {
    if (timestamp >= next) {
      clearCanvas();
      ctx1.save();
      ctx1.translate(0, -paddingBottom);
      renderChart(frame, totalFrames, drawData);
      ctx1.restore();
      drawText();
      frame += 1;
      next = timestamp + step;
    }
    requestAnimationFrame(draw);
  };
  draw();
}

function betterYAxisLine() {
  const context = path();
  context.moveTo(paddingLeft, canvasHeight - paddingBottom);
  context.lineTo(paddingLeft, paddingTop);
  return context;
}

function generateYAxis(selectedSvg, yScale) {
  const yAxis = axisLeft()
  .scale(yScale)
  .tickSize(-(canvasWidth - ((paddingLeft + paddingRight) - 3)))
  .tickPadding(6);
  selectedSvg.selectAll('.yAxis')
  .remove();
  selectedSvg.append('g')
  .attr('class', 'yAxis')
  .attr('transform', `translate(${paddingLeft}, ${paddingTop})`)
  .call(yAxis);
  selectedSvg.append('path')
  .attr('class', 'yAxisPath')
  .attr('d', betterYAxisLine().toString());
}

function generateXAxis(selectedSvg, xScale) {
  const xAxis = axisBottom()
  .scale(xScale)
  .tickValues(xScale.domain()
  .filter((d, i) => !(i % (Math.floor(xScale.domain().length / 10)))))
  .tickFormat((i) => getQuarterText(i))
  .tickPadding(6);
  selectedSvg.selectAll('.xAxis')
  .remove();
  selectedSvg.append('g')
  .attr('class', 'xAxis')
  .attr('transform', `translate(${paddingLeft}, ${canvasHeight - paddingBottom})`)
  .call(xAxis)
  .selectAll('text')
  .style('text-anchor', 'end')
  .attr('dx', '-0.7em')
  .attr('dy', '0em')
  .attr('transform', () => 'rotate(-45)');
}

function drawText() {
  ctx1.font = '14px sans-serif';
  ctx1.textAlign = 'center';
  ctx1.fillStyle = 'rgba(107, 107, 107, 1)';
  ctx1.fillText('US GDP 1947 - 2015', canvasWidth / 2, 30);
  ctx1.font = '10px sans-serif';
  ctx1.fillText('Units: Billions of Dollars, Seasonal Adjustment: Seasonally Adjusted Annual Rate', canvasWidth / 2, 45);
  ctx1.fillText('Drag Over Area To Filter', canvasWidth / 2, 60);
}

function clearBrush() {
  ctx2.clearRect(0, 0, canvasWidth, canvasHeight);
}

function* filterDateRange() {
  const filteredData = yield select(selectors.selectFilteredDataSet());
  const dragStart = yield select(selectors.selectDragStart());
  const dragStop = yield select(selectors.selectDragStop());
  if (dragStart && dragStop) {
    const brushedData = filteredData.filter((item) => item.x >= dragStart - item.width && item.x <= dragStop);
    if (brushedData.length) {
      yield put(actions.setDates({ startDate: brushedData[0].date, endDate: brushedData[brushedData.length - 1].date }));
      yield put(actions.initialize());
    }
  }
  yield put(actions.resetDrag());
  clearBrush();
}

function* drawBrush() {
  const x = yield select(selectors.selectDragStart());
  const dragStop = yield select(selectors.selectDragStop());
  const width = dragStop - x;
  clearBrush();
  ctx2.fillStyle = '#ff00004d';
  ctx2.fillRect(x, paddingTop, width, canvasHeight - (paddingBottom + paddingTop));
}

function filterData() {
  return fullData.filter((item) => item[0] >= startDate && item[0] <= endDate);
}

function generateXScale(filteredData) {
  const xScale = scaleBand()
  .domain(filteredData.map((item) => item[0]))
    .range([0, canvasWidth - (paddingLeft + paddingRight)])
    .padding(0.1);
  return xScale;
}

function generateYScale(filteredData) {
  const gdp = filteredData.map((item) => item[1]);
  const max = gdp.reduce((a, b) => Math.max(a, b)) * 1.1;
  const min = gdp.reduce((a, b) => Math.min(a, b)) * 0.9;
  const yScale = scaleLinear()
  .domain([min, max])
  .range([canvasHeight - (paddingTop + paddingBottom), 0]);
  return yScale;
}

function calculateDraw(filteredData, xScale, yScale) {
  const drawData = filteredData.map((item) => ({
    date: item[0],
    gdp: item[1],
    selected: false,
    x: xScale(item[0]) + paddingLeft,
    width: xScale.bandwidth(),
    height: canvasHeight - (paddingTop + paddingBottom + yScale(item[1])),
  }));
  return drawData;
}

function drawAxis(xScale, yScale) {
  const selectedSvg = d3Select(svg);
  selectedSvg.selectAll('*').remove();
  generateYAxis(selectedSvg, yScale);
  generateXAxis(selectedSvg, xScale);
}

function* drawChart() {
  yield cancelAnimationFrame(draw);
  const filteredData = filterData();
  const xScale = generateXScale(filteredData);
  const yScale = generateYScale(filteredData);
  const drawData = calculateDraw(filteredData, xScale, yScale);
  yield drawAxis(xScale, yScale);
  yield put(actions.setFilteredData(drawData));
  yield animateDraw(drawData);
}

function* initialize() {
  paddingTop = yield select(selectors.selectPaddingTop());
  paddingLeft = yield select(selectors.selectPaddingLeft());
  paddingBottom = yield select(selectors.selectPaddingBottom());
  paddingRight = yield select(selectors.selectPaddingRight());
  fullData = yield select(selectors.selectFullDataSet());
  startDate = yield select(selectors.selectStartDate());
  endDate = yield select(selectors.selectEndDate());
  ctx1 = yield select(selectors.selectCtx1());
  ctx2 = yield select(selectors.selectCtx2());
  canvasWidth = ctx1.canvas.width;
  canvasHeight = ctx1.canvas.height;
  svg = yield select(selectors.selectSvg());
  yield drawChart();
}

export default function* watcher() {
  yield fork(takeLatest, INITIALIZE, initialize);
  yield fork(takeLatest, DRAW_CHART, drawChart);
  yield fork(takeLatest, MOUSE_DRAG, drawBrush);
  yield fork(takeLatest, MOUSE_UP, filterDateRange);
  yield fork(takeLatest, RESET_CHART, initialize);
}
