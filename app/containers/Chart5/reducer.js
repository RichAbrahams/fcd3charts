/*
 *
 * Chart5 reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INITIALIZE,
  ADJUST_SCALE,
  TOGGLE_DRAGGING,
  DRAG,
} from './constants';

const initialState = fromJS({
  ctx1: null,
  canvasWidth: 1000,
  canvasHeight: 1000,
  initialScale: 159,
  scaleModifier: 1,
  translateX: 0,
  translateY: 0,
  dragging: false,
  dragStartX: null,
  dragStartY: null,
  dragStartTranslateX: null,
  dragStartTranslateY: null,
});

function chart5Reducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      return state.set('ctx1', action.payload);
    case ADJUST_SCALE: {
      const oldScaleModifier = state.get('scaleModifier');
      const translateX = state.get('translateX');
      const translateY = state.get('translateY');
      const scalechange = action.payload <= 0 ? 1.25 : 0.8;
      const newScaleModifier = oldScaleModifier * scalechange;
      if (newScaleModifier > 0.8 && newScaleModifier < 10) {
        const newTranslateX = translateX * scalechange;
        const newTranslateY = translateY * scalechange;
        return state.merge({
          scaleModifier: newScaleModifier,
          translateX: newTranslateX,
          translateY: newTranslateY });
      }
      return state;
    }
    case TOGGLE_DRAGGING: {
      if (action.payload) {
        const [dragStartX, dragStartY] = action.payload;
        const dragStartTranslateX = state.get('translateX');
        const dragStartTranslateY = state.get('translateY');
        return state.merge({
          dragging: true,
          dragStartX,
          dragStartY,
          dragStartTranslateX,
          dragStartTranslateY,
        });
      }
      return state.merge({
        dragging: false,
        dragStartX: null,
        dragStartY: null,
        dragStartTransitionX: null,
        dragStartTransitionY: null,
      });
    }
    case DRAG: {
      const [dragX, dragY] = action.payload;
      const dragStartX = state.get('dragStartX');
      const dragStartY = state.get('dragStartY');
      const dragStartTranslateX = state.get('dragStartTranslateX');
      const dragStartTranslateY = state.get('dragStartTranslateY');
      const scaleModifier = state.get('scaleModifier');
      const movementX = (dragX - dragStartX);
      const movementY = (dragY - dragStartY);
      let newTranslateX = dragStartTranslateX + movementX;
      let newTranslateY = dragStartTranslateY + movementY;
      const maxX = 550 * scaleModifier;
      const maxY = 400 * scaleModifier;
      newTranslateX = Math.clamp(newTranslateX, -maxX, maxX);
      newTranslateY = Math.clamp(newTranslateY, -maxY, maxY);
      return state.merge({ translateX: newTranslateX, translateY: newTranslateY });
    }
    default:
      return state;
  }
}

export default chart5Reducer;
