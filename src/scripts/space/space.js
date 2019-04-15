import {
  SceneBuilder,
  camera,
  renderer,
  moveCamera,
  moveCameraFromCenterToLeft,
  moveCameraFromLeftToCenter
} from '~/scripts/space/globe';
import {
  loadMapTexture
} from '~/scripts/space/map/map';
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
    this.mapCanvas = null;
    this.tokio = [35.6890248, 139.7284301];
    this.isLeft = false;
    this.isRunning = false;
  }
  run() {
    this.renderer.domElement.classList.add('canvas-3d');
    document.body.appendChild(this.renderer.domElement);
    this.watchResize();
    loadMapTexture().then(mapCanvas => {
      this.mapCanvas = mapCanvas;
      this.build = new SceneBuilder(mapCanvas);
      listenMouseEvents(this.camera, [this.build.baseLayer], 'click');
      // debug clicks
      this.build.baseLayer.addEventListener('click', e => {
        let latlon = getEventCenter.call(this.build.baseLayer, e);
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
      } = convertToXYZ.call(this.build.baseLayer, latlon); //getPoint.call(this.build.baseLayer, e);
      console.log(x,
        y,
        z);
      let [latRads, lonRads] = getEventRotationFromLatLng.call(this.build.baseLayer, latlon[0], latlon[1]);
      this.build.turnGlobe(latRads, -lonRads).then(() => {
        this.isRunning = false;
      });
      this.build.addPoint(x, y, z);
    }
  }
  render() {
    _render(this.renderer, this.build.scene, this.camera);
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
