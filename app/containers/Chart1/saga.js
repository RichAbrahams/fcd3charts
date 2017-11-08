import { takeLatest } from 'redux-saga';
import { fork, put, select } from 'redux-saga/effects';
import { scaleBand, scaleLinear, axisLeft, path, axisBottom, select as d3Select } from 'd3';
import {
  DRAW_CHART,
  MOUSE_DRAG,
  MOUSE_UP,
  RESET_CHART,
  STOP_DRAWING,
} from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
import { store } from '../../app';

let draw;

function generateXScale(data, width) {
  const xScale = scaleBand()
    .domain(data.map((item) => item[0]))
    .range([0, width])
    .padding(0.1);
  return xScale;
}

function generateYScale(data, height) {
  const gdp = data.map((item) => item[1]);
  const max = gdp.reduce((a, b) => Math.max(a, b)) * 1.1;
  const min = gdp.reduce((a, b) => Math.min(a, b)) * 0.9;
  const yScale = scaleLinear()
    .domain([min, max])
    .range([height, 0]);
  return yScale;
}

function spline(t, a, b, c, d) {
  return 0.5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);  // eslint-disable-line no-mixed-operators
}

function clearCanvas(canvasWidth, canvasHeight, ctx) {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function drawBar(x, y, width, height, ctx) {
  ctx.fillRect(x, y, width, height);
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

function drawToolTip(item, canvasHeight, ctx) {
  ctx.fillStyle = 'rgba(107, 107, 107, 1)';
  ctx.textAlign = 'center';
  ctx.font = '12px sans-serif';
  const quarter = getQuarterText(item.date);
  ctx.fillText(quarter, item.x + (item.width / 2), canvasHeight - (item.height + 30));
  ctx.fillText(`$${item.gdp} billion`, item.x + (item.width / 2), canvasHeight - (item.height + 15));
}

function checkMousePosition(item, canvasHeight, paddingTop, paddingBottom) {
  const mouseX = store.getState().get('chart1').get('mouseX');
  const mouseY = store.getState().get('chart1').get('mouseY');
  return mouseX && mouseY
    && item.x < mouseX
    && item.x + item.width > mouseX
    && paddingBottom < mouseY
    && canvasHeight - paddingBottom > mouseY;
}

function drawSpline(canvasWidth, canvasHeight, ctx, frame, totalFrames, drawData, item) {
  const normalizedFrame = frame / totalFrames;
  const curve = spline(normalizedFrame, 0, 0, 1, -2.5);
  const currentHeight = (item.height * curve) + (0 * (1 - curve));
  drawBar(item.x, canvasHeight - currentHeight, item.width, currentHeight, ctx);
}

function renderChart(canvasWidth, canvasHeight, paddingTop, paddingBottom, ctx, frame, totalFrames, drawData) {
  let selected = null;
  drawData.forEach((item) => {
    ctx.fillStyle = 'rgba(138, 166, 199, 0.72)';
    if (checkMousePosition(item, canvasHeight, paddingTop, paddingBottom)) {
      selected = item;
      ctx.fillStyle = 'rgb(231, 76, 60)';
    }
    if (frame <= totalFrames) {
      drawSpline(canvasWidth, canvasHeight, ctx, frame, totalFrames, drawData, item);
    } else {
      drawBar(item.x, canvasHeight - item.height, item.width, item.height, ctx);
    }
  });
  if (selected) {
    drawToolTip(selected, canvasHeight, ctx);
  }
}

function* animateDraw(drawData, canvasWidth, canvasHeight, paddingTop, paddingBottom, ctx) {
  let next = 0;
  const step = 1000 / 60;
  let frame = 0;
  const totalFrames = 30;
  draw = (timestamp = 0) => {
    if (timestamp >= next) {
      clearCanvas(canvasWidth, canvasHeight, ctx);
      ctx.save();
      ctx.translate(0, -paddingBottom);
      renderChart(canvasWidth, canvasHeight, paddingTop, paddingBottom, ctx, frame, totalFrames, drawData);
      ctx.restore();
      drawText(ctx, canvasWidth, canvasHeight);
      frame += 1;
      next = timestamp + step;
    }
    requestAnimationFrame(draw);
  };
  draw();
}

function filterData(data, startDate, endDate) {
  return data.filter((item) => item[0] >= startDate && item[0] <= endDate);
}

function calculateDraw(filteredData, canvasWidth, canvasHeight, paddingTop, paddingRight, paddingBottom, paddingLeft, xScale, yScale) {
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

function betterYAxisLine(canvasHeight, paddingBottom, paddingTop, paddingLeft) {
  const context = path();
  context.moveTo(paddingLeft, canvasHeight - paddingBottom);
  context.lineTo(paddingLeft, paddingTop);
  return context;
}

function generateYAxis(svg, yScale, paddingLeft, paddingRight, paddingTop, paddingBottom, canvasWidth, canvasHeight) {
  const yAxis = axisLeft()
  .scale(yScale)
  .tickSize(-(canvasWidth - ((paddingLeft + paddingRight) - 3)))
  .tickPadding(6);
  svg.selectAll('.yAxis')
  .remove();
  svg.append('g')
    .attr('class', 'yAxis')
    .attr('transform', `translate(${paddingLeft}, ${paddingTop})`)
    .call(yAxis);
  svg.append('path')
    .attr('class', 'yAxisPath')
    .attr('d', betterYAxisLine(canvasHeight, paddingBottom, paddingTop, paddingLeft).toString());
}

function generateXAxis(svg, xScale, canvasHeight, paddingLeft, paddingBottom) {
  const xAxis = axisBottom()
  .scale(xScale)
  .tickValues(xScale.domain()
  .filter((d, i) => !(i % (Math.floor(xScale.domain().length / 10)))))
  .tickFormat((i) => getQuarterText(i))
  .tickPadding(6);
  svg.selectAll('.xAxis')
  .remove();
  svg.append('g')
  .attr('class', 'xAxis')
  .attr('transform', `translate(${paddingLeft}, ${canvasHeight - paddingBottom})`)
  .call(xAxis)
  .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-0.7em')
    .attr('dy', '0em')
    .attr('transform', () => 'rotate(-45)');
}

function drawText(ctx, canvasWidth) {
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(107, 107, 107, 1)';
  ctx.fillText('US GDP 1947 - 2015', canvasWidth / 2, 30);
  ctx.font = '10px sans-serif';
  ctx.fillText('Units: Billions of Dollars, Seasonal Adjustment: Seasonally Adjusted Annual Rate', canvasWidth / 2, 45);
  ctx.fillText('Drag Over Area To Filter', canvasWidth / 2, 60);
}

function drawAxis(svg, xScale, yScale, paddingLeft, paddingRight, paddingTop, paddingBottom, canvasWidth, canvasHeight) {
  const selectedSvg = d3Select(svg);
  selectedSvg.selectAll('*').remove();
  generateYAxis(selectedSvg, yScale, paddingLeft, paddingRight, paddingTop, paddingBottom, canvasWidth, canvasHeight);
  generateXAxis(selectedSvg, xScale, canvasHeight, paddingLeft, paddingBottom);
}

function* drawChart() {
  yield cancelAnimationFrame(draw);
  const paddingTop = yield select(selectors.selectPaddingTop());
  const paddingLeft = yield select(selectors.selectPaddingLeft());
  const paddingBottom = yield select(selectors.selectPaddingBottom());
  const paddingRight = yield select(selectors.selectPaddingRight());
  const fullData = yield select(selectors.selectFullDataSet());
  const startDate = yield select(selectors.selectStartDate());
  const endDate = yield select(selectors.selectEndDate());
  const ctx = yield select(selectors.selectCtx1());
  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;
  const svg = yield select(selectors.selectSvg());
  const filteredData = filterData(fullData, startDate, endDate);
  const xScale = generateXScale(filteredData, canvasWidth - (paddingLeft + paddingRight));
  const yScale = generateYScale(filteredData, canvasHeight - (paddingTop + paddingBottom));
  const drawData = calculateDraw(filteredData, canvasWidth, canvasHeight, paddingTop, paddingRight, paddingBottom, paddingLeft, xScale, yScale);
  yield drawAxis(svg, xScale, yScale, paddingLeft, paddingRight, paddingTop, paddingBottom, canvasWidth, canvasHeight);
  yield put(actions.setFilteredData(drawData));
  yield animateDraw(drawData, canvasWidth, canvasHeight, paddingTop, paddingBottom, ctx);
}

function clearBrush(ctx, canvasWidth, canvasHeight) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function* filterDateRange() {
  const canvasWidth = yield select(selectors.selectCanvasWidth());
  const canvasHeight = yield select(selectors.selectCanvasHeight());
  const ctx = yield select(selectors.selectCtx2());
  const filteredData = yield select(selectors.selectFilteredDataSet());
  const dragStart = yield select(selectors.selectDragStart());
  const dragStop = yield select(selectors.selectDragStop());
  if (dragStart && dragStop) {
    const brushedData = filteredData.filter((item) => item.x >= dragStart - item.width && item.x <= dragStop);
    if (brushedData.length) {
      yield put(actions.setDates({ startDate: brushedData[0].date, endDate: brushedData[brushedData.length - 1].date }));
      yield put(actions.drawChart());
    }
  }
  yield put(actions.resetDrag());
  clearBrush(ctx, canvasWidth, canvasHeight);
}

function* drawBrush() {
  const paddingTop = yield select(selectors.selectPaddingTop());
  const paddingBottom = yield select(selectors.selectPaddingBottom());
  const canvasWidth = yield select(selectors.selectCanvasWidth());
  const canvasHeight = yield select(selectors.selectCanvasHeight());
  const ctx = yield select(selectors.selectCtx2());
  const x = yield select(selectors.selectDragStart());
  const dragStop = yield select(selectors.selectDragStop());
  const width = dragStop - x;
  clearBrush(ctx, canvasWidth, canvasHeight);
  ctx.fillStyle = '#ff00004d';
  ctx.fillRect(x, paddingTop, width, canvasHeight - (paddingBottom + paddingTop));
}

function* stopDrawing() {
  yield cancelAnimationFrame(draw);
}

export default function* watcher() {
  yield fork(takeLatest, DRAW_CHART, drawChart);
  yield fork(takeLatest, MOUSE_DRAG, drawBrush);
  yield fork(takeLatest, MOUSE_UP, filterDateRange);
  yield fork(takeLatest, RESET_CHART, drawChart);
  yield fork(takeLatest, STOP_DRAWING, stopDrawing);
}
