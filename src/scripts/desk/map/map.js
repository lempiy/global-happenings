import {
    geoPath,
    select,
    geoEqualEarth,
    geoGraticule,
    scaleSqrt
  } from "d3";
  import {
    feature as topojsonFeature
  } from 'topojson';

const MAP_SCREEN_FACTOR = 0.375;
const MAP_HEIGHT_RATIO = 0.52;
const EXPANDED_SCALE = 1.5;
const TRANSLATE_PROJECTION_RATIO = 0.5;
const SCALE_PROJECTION_RATIO = 0.1822917;
const COLLAPSED_STATE = 'collapsed';
const TRANSITION_STATE = 'transition';
const EXPANDED_STATE = 'expanded';

const getMapWidth = () => window.innerWidth * MAP_SCREEN_FACTOR;
const getMapHeight = () => getMapWidth() * MAP_HEIGHT_RATIO;

const getProjection = () => geoEqualEarth()
    .translate([getMapWidth()*TRANSLATE_PROJECTION_RATIO, getMapHeight()*TRANSLATE_PROJECTION_RATIO])
    .scale(getMapWidth()*SCALE_PROJECTION_RATIO);

function getRadius(n) {
    return scaleSqrt().domain([0, 3000]).range([0, 15])(n)
  }

const LONDON = [-0.127758, 51.507351]
function mapPoint(topology, point) {
  const p = transformPoint(topology, point);
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

export class Map {
    constructor(topology, geojson) {
        this.state = COLLAPSED_STATE;
        this.topology = topology;
        this.geojson = geojson;
        this.svg = null;
    }

    getTranslateX() {
        return this.state === 'collapsed' ? '0px' : `-${window.innerWidth*0.5 + getMapWidth()*0.5*EXPANDED_SCALE}px`
    }

    getTranslateY() {
        return this.state === 'collapsed' ? '0px' : `${window.innerHeight*0.5 - getMapHeight()*0.5*EXPANDED_SCALE}px`
    }

    clear() {
        if (this.svg) {
            this.svg.remove();
            this.svg = null;
        }
    }

    build() {
        this.clear()
        const svg = select("body").append("svg")
        svg.attr("width", getMapWidth())
            .attr("height", getMapHeight())
            .attr("class", "world");
        const path = geoPath().projection(getProjection());

        const graticule = geoGraticule();
        
        svg.append("path")
            .datum(graticule)
            .attr("class", "graticule")
            .attr("d", path);
        
        svg.append("path")
            .datum(graticule.outline)
            .attr("class", "graticule outline")
            .attr("d", path);
        svg.selectAll(".country")
            .data(this.geojson.features)
            .enter()
            .insert("path", ".graticule")
            .attr("class", "country")
            .attr("d", path);
        this.svg = svg;
    }

    applySvgStats(points) {
        const path = geoPath().projection(getProjection());
        const svg = this.svg;
        svg.selectAll(".stats").remove();
        svg.append("g")
            .attr("class", "stats")
            .attr("fill", "green")
            .attr("fill-opacity", 0.5)
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5)
        .selectAll("circle")
            .data(points.map(p => mapPoint(this.topology, p)))
            .join("circle")
            .attr("transform", d => `translate(${path.centroid(d)})`)
            .attr("r", d => getRadius(2000));
    }
};
  
