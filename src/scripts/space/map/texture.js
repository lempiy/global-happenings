import {
  Texture
} from "three";
import {
  geoEquirectangular,
  geoPath,
  select
} from "d3";

const projection = geoEquirectangular()
  .translate([2048, 1024])
  .scale(650);

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

  // DEBUGGING - Really expensive, disable when done.
  // console.log(canvas.node().toDataURL());

  canvas.remove();

  return canvas.node();
}
