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
  countryOverlay
} from '~/scripts/space/map/map';
import {
  GeoDecoder
} from '~/scripts/space/map/decoder';
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
  run() {
    this.renderer.domElement.classList.add('canvas-3d');
    document.body.appendChild(this.renderer.domElement);
    this.watchResize();
    loadMap().then(data => {
      const {worldTexture, countries} = data;
      this.countries = countries;
      this.worldTexture = worldTexture;
      this.world = new World(worldTexture);
      this.decoder = new GeoDecoder(countries.features);
      listenMouseEvents(this.camera, [this.world.baseLayer], 'click');
      // debug clicks
      this.world.baseLayer.addEventListener('click', e => {
        let latlon = getEventCenter.call(this.world.baseLayer, e);
        const countryID = this.decoder.search(latlon[0], latlon[1]);
        const country = this.decoder.find(countryID.code);
        const overlay = countryOverlay(country, '#ffffff', this.world.getOverlayMap());
        console.log('this.world.getOverlayMap()', this.world.getOverlayMap());
        this.world.drawOverlay(overlay);
        this.turnGlobeToLatLon(latlon);
      });
      this.render();
    });
  }
  turnGlobeToLatLon(latlon) {
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
  render() {
    _render(this.renderer, this.world.scene, this.camera);
  }
  changeGlobeState() {
    if (!this.isRunning) {
      this.isRunning = true;
      const f = this.isLeft ? moveCameraFromLeftToCenter : moveCameraFromCenterToLeft;
      f().then(() => {
        this.isRunning = false;
        this.isLeft = !this.isLeft;
      });
    }
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
