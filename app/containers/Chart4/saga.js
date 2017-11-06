import { takeLatest, eventChannel } from 'redux-saga';
import { fork, call, put, select, take } from 'redux-saga/effects';
import * as d3 from 'd3';
import {
  NODES_RECEIVED,
 } from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import { store } from '../../app';
let draw;
let flagPositions;
let flags;

function* initSimulation() {
  const nodes = yield select(selectors.nodes());
  const links = yield select(selectors.links());
  const width = yield select(selectors.width());
  const height = yield select(selectors.height());
  flagPositions = yield select(selectors.flagPositions());
  flags = yield select(selectors.flagImage());
  return eventChannel((emitter) => {

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d) => d.index).distance(1))
      .force('collide', d3.forceCollide(50))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('y', d3.forceY())
      .force('x', d3.forceX());

    simulation.nodes(nodes)
              .on('tick', ticked);

    simulation.force('link')
              .links(links);

    function ticked() {
      emitter({ type: NODES_RECEIVED, data: simulation.nodes() });
    }

    return () => console.log('channel off');
  });
}

function* d3update(channel) {
  while (true) {
    const action = yield take(channel);
    if (action.type === NODES_RECEIVED) {
      yield put(actions.updateNodes(action.data));
      yield drawGraph();
    }
  }
}

function* drawGraph() {
  yield cancelAnimationFrame(draw);
  const nodes = yield select(selectors.nodes());
  const links = yield select(selectors.links());
  const ctx = yield select(selectors.ctx());
  const radius = yield select(selectors.radius());
  yield animateDraw(nodes, links, radius, ctx);
}

function animateDraw(nodes, links, radius, ctx) {
  let next = 0;
  const step = 1000 / 60;
  draw = (timestamp = 0) => {
    if (timestamp >= next) {
      clearCanvas(ctx);
      links.forEach((link) => renderLink(link, nodes, ctx));
      nodes.forEach((node) => renderNode(node, radius, ctx));
      renderTitle(ctx);
      next = timestamp + step;
    }
    requestAnimationFrame(draw);
  };
  draw();
}

function renderTitle(ctx) {
  ctx.fillStyle = '#5e7690';
  ctx.fillRect(0, 0, ctx.canvas.width, 60);
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.font = '24px sans-serif';
  ctx.fillText('European Land Borders Graph', ctx.canvas.width / 2, 40);
}

function renderNode(node, radius, ctx) {
  const selected = store.getState().get('chart4').get('selected');
  ctx.beginPath();
  ctx.fillStyle = node.index === selected ? 'red' : '#5e7690';
  ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
  ctx.fill();
  const flagX = flagPositions[node.code].x;
  const flagY = flagPositions[node.code].y;
  ctx.drawImage(flags, flagX, flagY, 24, 24, node.x - 15, node.y - 11, 30, 22);
}


function renderLink(link, nodes, ctx) {
  const selected = store.getState().get('chart4').get('selected');
  const startX = nodes[link.source].x;
  const startY = nodes[link.source].y;
  const endX = nodes[link.target].x;
  const endY = nodes[link.target].y;
  ctx.strokeStyle = link.source === selected || link.target === selected ? 'red' : '#5e7690';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

function clearCanvas(ctx) {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export default function* watchSaga() {
  const channel = yield call(initSimulation);
  yield fork(d3update, channel);
}
