import '~/styles/index.scss';
import {
  default as globe
} from '~/scripts/globe';
import {
  loadMapTexture
} from '~/scripts/map/map';
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
from '~/scripts/utils';
import {
  listenMouseEvents
}
from '~/scripts/utils/events.js';
const {
  SceneBuilder,
  camera,
  renderer,
  moveCamera,
  moveCameraFromCenterToLeft,
  moveCameraFromLeftToCenter
} = globe;
console.log(moveCamera);
let isLeft = false;
let isRunning = false;
document.body.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  if (!isRunning) {
    isRunning = true;
    const f = isLeft ? moveCameraFromLeftToCenter : moveCameraFromCenterToLeft;
    f().then(() => {
      isRunning = false;
      isLeft = !isLeft;
    });
  }
});


function run() {
  document.body.appendChild(renderer.domElement);
  loadMapTexture().then(mapCanvas => {
    const build = new SceneBuilder(mapCanvas);
    listenMouseEvents(camera, [build.baseLayer], 'click');
    build.baseLayer.addEventListener('click', e => {
      let latlon = getEventCenter.call(build.baseLayer, e);
      const tokio = [35.6890248, 139.7284301]
      var {
        x,
        y,
        z
      } = convertToXYZ.call(build.baseLayer, tokio); //getPoint.call(build.baseLayer, e);
      console.log(x,
        y,
        z);
      let [latRads, lonRads] = getEventRotationFromLatLng.call(build.baseLayer, tokio[0], tokio[1]);
      build.turnGlobe(latRads, -lonRads).then(() => console.log('converted:', convertToXYZ.call(build.baseLayer, tokio)))

      build.addPoint(x, y, z);
    });

    function render() {
      requestAnimationFrame(render);
      renderer.render(build.scene, camera);
    }
    render();
  });
}

run();
