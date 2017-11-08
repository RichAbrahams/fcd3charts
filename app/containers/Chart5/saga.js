import { throttle, put } from 'redux-saga/effects';
import { DEBOUNCED_DRAG } from './constants';
import * as actions from './actions';

function* handleInput({ payload }) {
  yield put(actions.drag(payload));
}

export default function* watchInput() {
  yield throttle(50, DEBOUNCED_DRAG, handleInput);
}
