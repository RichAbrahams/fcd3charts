
import { fromJS } from 'immutable';
import chart1Reducer from '../reducer';

describe('chart1Reducer', () => {
  it('returns the initial state', () => {
    expect(chart1Reducer(undefined, {})).toEqual(fromJS({}));
  });
});
