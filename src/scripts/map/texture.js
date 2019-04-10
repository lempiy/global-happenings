import {
  Texture
} from "three";
import {
  geoEquirectangular,
  geoPath,
  select
} from "d3";

const projection = geoEquirectangular()
  .translate([1024, 512])
  .scale(325);

export function mapTexture(geojson, color) {
  const canvas = select("body")
    .append("canvas")
    .style("display", "none")
    .attr("width", "2048px")
    .attr("height", "1024px");

  const context = canvas.node().getContext("2d");

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
