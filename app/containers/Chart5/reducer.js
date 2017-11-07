/*
 *
 * Chart5 reducer
 *
 */

import { fromJS } from 'immutable';
import * as d3 from 'd3';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import topoMap from '../../data/data5/world-countries-sans-antarctica.json';
import meteorites from '../../data/data5/meteorite-strike-data.json';
import {
  DEFAULT_ACTION,
} from './constants';

const countries = feature(topoMap, topoMap.objects.countries1).features;
const width = 1000;
const height = 1000;
const projection = () => {
  return geoMercator()
    .scale(159)
    .translate([width / 2, height / 2]);
};

const initialState = fromJS({
  countries,
  meteorites,
  projection,
  width,
  height,
});

function chart5Reducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default chart5Reducer;
