import {
  Texture
} from "three";
import {
  geoEquirectangular,
  geoPath,
  select,
  max
} from "d3";
import {
  feature as topojsonFeature
} from 'topojson';
import {
  simpleheat
} from '~/scripts/map/heatmap';

const projection = geoEquirectangular()
  .translate([2048, 1024])
  .scale(650);  

export function emptyTexture(canvas) {
  canvas = canvas ? select(canvas) : select("body")
    .append("canvas")
    .style("display", "none")
    .attr("width", "4096px")
    .attr("height", "2048px");
  
  const context = canvas.node().getContext("2d");
  
  context.clearRect(0, 0, canvas.node().width, canvas.node().height);
  canvas.remove();
  return canvas.node();
}

export function mapTexture(geojson, color, canvas) {
  canvas = canvas ? select(canvas) : select("body")
    .append("canvas")
    .style("display", "none")
    .attr("width", "4096px")
    .attr("height", "2048px");

  const context = canvas.node().getContext("2d");

  context.clearRect(0, 0, canvas.node().width, canvas.node().height);

  var path = geoPath()
    .projection(projection)
    .context(context);

  context.strokeStyle = "#000";
  context.lineWidth = 0.5;
  context.fillStyle = color || "#CDB380";
  context.beginPath();
  path(geojson);

  if (color) {
    context.fill();
  }

  context.stroke();

  canvas.remove();

  return canvas.node();
}

export function heatmapTexture(cities, canvas) {
  canvas = canvas ? select(canvas) : select("body")
    .append("canvas")
    .style("display", "none")
    .attr("width", "4096px")
    .attr("height", "2048px");

  const context = canvas.node().getContext("2d");

  context.clearRect(0, 0, canvas.node().width, canvas.node().height);

  const heat = simpleheat(canvas.node());
  const data = cities.map(c => ({... c, coords: projection([Number(c.lng), Number(c.lat)])}))
  console.log('PRJ DATA', data);
  heat.data(data.map(c => [c.coords[0], c.coords[1], c.count]));

  heat.radius(10, 30);

  heat.max(max(cities, c => +c.count));

  heat.draw(0.1);
  console.log('HEAAAAAATTTTT', canvas.node(), data.map(c => [c.coords[0], c.coords[1], c.count]), max(cities, c => +c.count), heat);
  canvas.remove();
  document.body.appendChild(canvas.style('display', 'block').node());
  return canvas.node();
}
