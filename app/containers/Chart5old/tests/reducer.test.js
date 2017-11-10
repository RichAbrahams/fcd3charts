
import { fromJS } from 'immutable';
import chart5Reducer from '../reducer';

describe('chart5Reducer', () => {
  it('returns the initial state', () => {
    expect(chart5Reducer(undefined, {})).toEqual(fromJS({}));
  });
});
