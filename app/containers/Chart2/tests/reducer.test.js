
import { fromJS } from 'immutable';
import chart2Reducer from '../reducer';

describe('chart2Reducer', () => {
  it('returns the initial state', () => {
    expect(chart2Reducer(undefined, {})).toEqual(fromJS({}));
  });
});
