/*
 *
 * Chart4 reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_CANVAS,
  UPDATE_NODES,
  UPDATE_SELECTED,
} from './constants';
import links from '../../data/data4/links.json';
import nodes from '../../data/data4/nodes.json';
import flagPositions from '../../data/data4/flagPositions';
import flags from '../../data/data4/flags.png';


const flagImage = new Image();
flagImage.src = flags;

const initialState = fromJS({
  nodes,
  links,
  flagPositions,
  flagImage,
  width: 900,
  height: 900,
  radius: 25,
  selected: null,
});

function chart4Reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CANVAS:
      return state.set('ctx', action.payload);
    case UPDATE_NODES:
      return state.set('nodes', fromJS(action.payload));
    case UPDATE_SELECTED:
      return state.merge({ selected: action.payload.selected, mousePosition: { x: action.payload.mouseX, y: action.payload.mouseY } });
    default:
      return state;
  }
}

export default chart4Reducer;
