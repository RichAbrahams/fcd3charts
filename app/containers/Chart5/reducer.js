/*
 *
 * Chart5 reducer
 *
 */

import { fromJS } from 'immutable';
import { geoMercator } from 'd3-geo';
import { feature } from 'topojson-client';
import topoMap from '../../data/data5/world-countries-sans-antarctica.json';
import meteorites from '../../data/data5/meteorite-strike-data.json';
import {
  ADJUST_SCALE,
  TOGGLE_DRAGGING,
  DRAG,
} from './constants';

const countries = feature(topoMap, topoMap.objects.countries1).features;
const width = 1000;
const height = 500;
const projection = () => geoMercator()
    .scale(159)
    .translate([width / 2, height / 2]);

const initialState = fromJS({
  countries,
  meteorites,
  projection,
  width,
  height,
  scale: 1,
  dragging: false,
  dragStartX: null,
  dragStartY: null,
  translateX: 0,
  translateY: 0,
  xLast: 0,
  yLast: 0,
  xImage: 0,
  yImage: 0,
});

function chart5Reducer(state = initialState, action) {
  switch (action.type) {
    case ADJUST_SCALE: {
      const oldScale = state.get('scale');
      const translateX = state.get('translateX');
      const translateY = state.get('translateY');
      const scalechange = action.payload <= 0 ? 1.25 : 0.8;
      let newScale = oldScale * scalechange;
      newScale = newScale < 1 ? 1 : newScale;
      newScale = newScale > 10 ? 10 : newScale;
      const newTranslateX = translateX * scalechange;
      const newTranslateY = translateY * scalechange;
      return state.merge({ scale: newScale, translateX: newTranslateX, translateY: newTranslateY });
    }
    case TOGGLE_DRAGGING: {
      if (action.payload) {
        const [dragStartX, dragStartY] = action.payload;
        return state.merge({ dragging: true, dragStartX, dragStartY });
      }
      return state.merge({ dragging: false, dragStartX: null, dragStartY: null });
    }
    case DRAG: {
      const [dragX, dragY] = action.payload;
      const dragStartX = state.get('dragStartX');
      const dragStartY = state.get('dragStartY');
      const currentTranslateX = state.get('translateX');
      const currentTranslateY = state.get('translateY');
      const scale = state.get('scale');
      const movementX = (dragX - dragStartX);
      const movementY = (dragY - dragStartY);
      let translateX = currentTranslateX + movementX;
      let translateY = currentTranslateY + movementY;
      translateX = translateX / scale > 520 ? 520 * scale : translateX;
      translateX = translateX / scale < -480 ? -480 * scale : translateX;
      translateY = translateY / scale > 240 ? 240 * scale : translateY;
      translateY = translateY / scale < -180 ? -180 * scale : translateY;
      return state.merge({ translateX, translateY });
    }
    default:
      return state;
  }
}

export default chart5Reducer;
