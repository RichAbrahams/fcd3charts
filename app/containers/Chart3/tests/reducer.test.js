
import { fromJS } from 'immutable';
import chart3Reducer from '../reducer';

describe('chart3Reducer', () => {
  it('returns the initial state', () => {
    expect(chart3Reducer(undefined, {})).toEqual(fromJS({}));
  });
});
