import { geoMercator, geoPath } from 'd3-geo';

const projection = (width, height) => {
  return geoMercator()
    .scale(159)
    .translate([width / 2, height / 2]);
};

export default projection;
