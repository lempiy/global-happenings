export class GeoDecoder {
  constructor(features) {
    this.features = features;
    this.store = features.reduce((acc, feature) => {
      acc[feature.id] = feature;
      return acc;
    }, {});
  }

  find(id) {
    return this.store[id];
  }

  search(lat, lng) {
    const feature = this.features.find(country => {
      switch (country.geometry.type) {
        case 'Polygon':
          return pointInPolygon(country.geometry.coordinates[0], [lng, lat])
        case 'MultiPolygon':
          return country.geometry.coordinates.some(coord => pointInPolygon(coord[0], [lng, lat]))
      }
    })

    return feature ? {
      code: feature.id,
      name: feature.properties.name
    } : null
  }
}

// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
function pointInPolygon(poly, point) {

  let x = point[0];
  let y = point[1];

  let inside = false, xi, xj, yi, yj, xk;

  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    xi = poly[i][0];
    yi = poly[i][1];
    xj = poly[j][0];
    yj = poly[j][1];

    xk = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (xk) {
       inside = !inside;
    }
  }

  return inside;
};