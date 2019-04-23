import {
  Texture
} from "three";
import {
  geoEquirectangular,
  geoPath,
  select,
  geoEqualEarth,
  geoGraticule,
} from "d3";
import {
  feature as topojsonFeature
} from 'topojson';

const projection = geoEquirectangular()
  .translate([2048, 1024])
  .scale(650);

const svgProjection = geoEqualEarth()
  .translate([480, 250])
  .scale(175);

const LONDON = [-0.127758, 51.507351]
function getLondon(topology) {
  const p = transformPoint(topology, LONDON);
  console.log('p', p);
  return topojsonFeature(topology, {
    type: "Point",
    coordinates: p,
  })
}

function transformPoint(topology, position) {
  position = position.slice();
  position[0] = (position[0] - topology.transform.translate[0])
  /(topology.transform.scale[0]),
  position[1] = (position[1] - topology.transform.translate[1])
  /(topology.transform.scale[1]) 
  return position;
};

export function mapSvg(topology, geojson) {
  const svg = select("body").append("svg")
    .attr("width", "960px")
    .attr("height", "500px")
    .attr("class", "world");

  const path = geoPath().projection(svgProjection);

  const graticule = geoGraticule();
  
  svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

  svg.append("path")
    .datum(graticule.outline)
    .attr("class", "graticule outline")
    .attr("d", path);

  const london = getLondon(topology);
  svg.append("path")
    .datum(london)
    .attr("d", path)
    .attr("class", "place-online");
    
  svg.selectAll(".country")
    .data(geojson.features)
    .enter()
    .insert("path", ".graticule")
    .attr("class", "country")
    .attr("d", path);
  
  return svg.node();
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
