
import { fromJS } from 'immutable';
import chart4Reducer from '../reducer';

describe('chart4Reducer', () => {
  it('returns the initial state', () => {
    expect(chart4Reducer(undefined, {})).toEqual(fromJS({}));
  });
});
