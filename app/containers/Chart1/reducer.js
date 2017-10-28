/*
 *
 * Chart1 reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_CONTEXT1,
  SET_CONTEXT2,
  SET_SVG,
  MOUSE_DOWN,
  MOUSE_UP,
  MOUSE_DRAG,
  MOUSE_MOVE,
  SET_FILTERED_DATA,
  SET_DATES,
  RESET_DRAG,
  RESET_CHART,
} from './constants';
import data1 from '../../data/data1';

const fullDataSet = data1.data
  .map((item) => [new Date(item[0]), item[1]]);

const startDate = fullDataSet[0][0];
const endDate = fullDataSet[fullDataSet.length - 1][0];

const initialState = fromJS({
  ctx1: null,
  ctx2: null,
  svg: null,
  startDate,
  endDate,
  fullDataSet,
  filteredDataSet: null,
  canvasWidth: window.innerWidth * 0.7,
  canvasHeight: ((window.innerWidth * 0.7) / 16) * 9,
  dragging: false,
  dragStart: null,
  dragStop: null,
  mouseX: null,
  mouseY: null,
  paddingTop: 100,
  paddingLeft: 100,
  paddingBottom: 100,
  paddingRight: 50,
});

function chart1Reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONTEXT1:
      return state.set('ctx1', action.payload);
    case SET_CONTEXT2:
      return state.set('ctx2', action.payload);
    case SET_SVG:
      return state.set('svg', action.payload);
    case MOUSE_DOWN: {
      return state.merge({ dragging: true });
    }
    case MOUSE_UP: {
      return state.merge({ dragging: false });
    }
    case RESET_DRAG: {
      return state.merge({ dragging: false, dragStart: null, dragStop: null });
    }
    case MOUSE_DRAG: {
      const currentDragStart = state.get('dragStart');
      const currentDragStop = state.get('dragStop');
      if (!currentDragStart) {
        return state.merge({ dragStart: action.payload, dragStop: action.payload, mouseX: null, mouseY: null });
      }
      let dragStart;
      let dragStop;
      if (action.payload > currentDragStart) {
        dragStart = currentDragStart;
        dragStop = action.payload;
      } else {
        dragStop = currentDragStop;
        dragStart = action.payload;
      }
      return state.merge({ dragStart, dragStop });
    }
    case MOUSE_MOVE: {
      return state.merge({ mouseX: action.payload.x, mouseY: action.payload.y });
    }
    case SET_FILTERED_DATA: {
      return state.set('filteredDataSet', action.payload);
    }
    case SET_DATES: {
      return state.merge(action.payload);
    }
    case RESET_CHART: {
      const data = state.get('fullDataSet').toJS();
      const start = data[0][0];
      const end = data[data.length - 1][0];
      return state.merge({ filteredDataSet: data, startDate: start, endDate: end });
    }
    default:
      return state;
  }
}

export default chart1Reducer;
