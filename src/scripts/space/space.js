import {
  World,
  camera,
  renderer,
  moveCamera,
  moveCameraFromCenterToLeft,
  moveCameraFromLeftToCenter
} from '~/scripts/space/globe';
import {
  loadMap,
  worldOverlay,
  countryOverlay,
  emptyOverlay,
  heatmapOverlay
} from '~/scripts/map/map';
import {
  GeoDecoder
} from '~/scripts/map/decoder';
import {
  Euler
} from 'three';
import {
  getEventCenter,
  getEventRotation,
  getEventRotationFromLatLng,
  getPoint,
  convertToXYZ
}
from '~/scripts/space/utils';
import {
  listenMouseEvents
}
from '~/scripts/space/utils/events.js';
import { throws } from 'assert';

export const GLOBE_STATE_LEFT = 'LEFT';
export const CLOBE_STATE_CENTER = 'CENTER';
export const CLOBE_STATE_RIGHT = 'RIGHT';

const _render = (renderer, scene, camera) => {
  const _loop = () => {
    requestAnimationFrame(_loop);
    renderer.render(scene, camera);
  }
  _loop();
}

class Space {
  constructor() {
    this.renderer = renderer;
    this.camera = camera;
    this.scaneBuilder = null;
    this.worldTexture = null;
    this.tokio = [35.6890248, 139.7284301];
    this.isLeft = false;
    this.isRunning = false;
    this.countries = null;
    this.decoder = null;
  }
  run(data) {
    this.renderer.domElement.classList.add('canvas-3d');
    document.body.appendChild(this.renderer.domElement);
    this.watchResize();
    const {countries} = data;
    this.worldTexture = worldOverlay(countries, '#ff5607');
    this.countries = countries;
    this.world = new World(this.worldTexture);
    this.decoder = new GeoDecoder(countries.features);
    listenMouseEvents(this.camera, [this.world.baseLayer], 'click');
    // debug clicks
    this.world.baseLayer.addEventListener('click', e => {
      let latlon = getEventCenter.call(this.world.baseLayer, e);
    });
    this.render();
  }

  getRotateGlobeTween() {
    return this.world.getRotateGlobeTween()
  }

  worldMain() {
    this.worldTexture = worldOverlay(this.countries, '#ff5607', this.world.getWorldMap());
    this.world.drawWorld();
  }

  worldAlternative() {
    this.worldTexture = worldOverlay(this.countries, '#ffffff', this.world.getWorldMap());
    this.world.drawWorld();
  }

  watchPoint(latlon) {
    const countryID = this.decoder.search(latlon[0], latlon[1]);
    if (!countryID) return;
    const country = this.decoder.find(countryID.code);
    const overlay = countryOverlay(country, '#ffffff', this.world.getOverlayMap());
    this.world.drawOverlay(overlay);
    this.focusGlobeOnLatLon(latlon);
  }

  normalizeGlobe() {
    const overlay = emptyOverlay(this.world.getOverlayMap());
    this.world.cleanOverlay(overlay);
    this.unfocusGlobe();
  }

  heatmapGlobe(cities) {
    const overlay = heatmapOverlay(cities, this.world.getOverlayMap());
    this.world.drawOverlay(overlay);
  }
 
  focusGlobeOnLatLon(latlon) {
    if (!this.isRunning) {
      this.isRunning = true;
      var {
        x,
        y,
        z
      } = convertToXYZ.call(this.world.baseLayer, latlon); //getPoint.call(this.world.baseLayer, e);
      console.log(x,
        y,
        z);
      let [latRads, lonRads] = getEventRotationFromLatLng.call(this.world.baseLayer, latlon[0], latlon[1]);
      this.world.turnGlobe(latRads, -lonRads).then(() => {
        this.isRunning = false;
      });
      this.world.addPoint(x, y, z);
    }
  }

  unfocusGlobe() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.world.turnGlobe(0, 0).then(() => {
        this.isRunning = false;
      });
      this.world.removePoints();
    }
  }

  render() {
    _render(this.renderer, this.world.scene, this.camera);
  }
  getGlobeTween(state) {
    const f = state === GLOBE_STATE_LEFT ? moveCameraFromCenterToLeft : moveCameraFromLeftToCenter;
    return f();
  }
  watchResize() {
    (function (camera, renderer) {
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
      window.addEventListener('resize', onWindowResize, false);
    })(this.camera, this.renderer)
  }
}

export const space = new Space();
