export function getPoint(event) {

  // Get the vertices
  let a = this.geometry.vertices[event.face.a];
  let b = this.geometry.vertices[event.face.b];
  let c = this.geometry.vertices[event.face.c];

  // Averge them together
  let point = {
    x: (a.x + b.x + c.x) / 3,
    y: (a.y + b.y + c.y) / 3,
    z: (a.z + b.z + c.z) / 3
  };

  return point;
}

export function getEventCenter(event, radius) {
  radius = radius || 200;

  var point = getPoint.call(this, event);

  var latRads = Math.acos(point.y / radius);
  var lngRads = Math.atan2(point.z, point.x);
  var lat = (Math.PI / 2 - latRads) * (180 / Math.PI);
  var lng = (Math.PI - lngRads) * (180 / Math.PI);

  return [lat, lng - 180];
}

export function getEventRotation(event, radius) {
  var [lat, lng] = getEventCenter.call(this, event, radius)
  // start point for lng is -90.0
  return [lat * Math.PI / 180, (lng + 90) * Math.PI / 180];
}

export function getEventRotationFromLatLng(lat, lng, radius) {
  // start point for lng is -90.0
  return [lat * Math.PI / 180, (lng + 90) * Math.PI / 180];
}

export function convertToXYZ(point, radius) {
  radius = radius || 200;

  var latRads = (90 - point[0]) * Math.PI / 180;
  var lngRads = (180 - point[1]) * Math.PI / 180;

  var x = radius * Math.sin(latRads) * Math.cos(lngRads);
  var y = radius * Math.cos(latRads);
  var z = radius * Math.sin(latRads) * Math.sin(lngRads);

  return {
    x: -x,
    y: y,
    z: -z
  };
}
