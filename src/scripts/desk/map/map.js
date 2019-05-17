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
  import { Widget, POSITION_TOP_RIGHT } from '~/scripts/desk/widget.js';

const WIDGET_SCREEN_FACTOR = 0.375;

const getProjection = () => geoEqualEarth()
    .translate([480, 250])
    .scale(175);

function getRadius(n) {
    return scaleSqrt().domain([0, 3000]).range([0, 15])(n)
  }

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

export class Map extends Widget {
    constructor(topology, geojson) {
        super(select("body").append("svg"), {position: POSITION_TOP_RIGHT, widthFactor: WIDGET_SCREEN_FACTOR});
        this.topology = topology;
        this.geojson = geojson;
        this.svg = this.node;
        this.svg.attr('viewBox', '0 0 960 500');
        this.points = [];
    }

    clear() {
        if (this.svg) {
            this.svg.node().innerHTML = "";
        }
    }

    build() {
        this.clear()
        const svg = this.svg;
        svg.attr("width", this.getWidgetWidth())
            .attr("height", this.getWidgetHeight());
        const path = geoPath().projection(getProjection(this.getWidgetWidth(), this.getWidgetHeight()));

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
    }

    applySvgStats(points) {
        const path = geoPath().projection(getProjection(this.getWidgetWidth(), this.getWidgetHeight()));;
        const svg = this.svg;
        const g = svg.select("g");
        console.log('this.points', this.points);
        this.points = this.points.concat(points.map(p => mapPoint(this.topology, p)))
        console.log(this.points);
        (g.node() ? g : svg.append("g"))
            .attr("class", "stats")
            .attr("fill", "green")
            .attr("fill-opacity", 0.5)
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5)
        .selectAll("circle")
            .data(this.points)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return path.centroid(d)[0]; })
            .attr("cy", function (d) { return path.centroid(d)[1]; })
            .attr("r", d => 50)
            .filter(d => {
                console.log('datum', d);
                return true
            })
            .transition()
            .duration(500)
            .attr("r", 2.5)
    }
};
  
