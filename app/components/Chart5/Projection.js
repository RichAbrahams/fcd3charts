import { geoMercator } from 'd3-geo';

const projection = (width, height) => geoMercator()
    .scale(159)
    .translate([width / 2, height / 2]);

export default projection;
