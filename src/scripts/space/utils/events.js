import {
  Raycaster,
  Vector3
} from 'three';

let raycaster = new Raycaster();

export function listenMouseEvents(camera, items, type) {
  let listener = function (event) {

    let mouse = {
      x: ((event.clientX - 1) / window.innerWidth) * 2 - 1,
      y: -((event.clientY - 1) / window.innerHeight) * 2 + 1
    };

    let vector = new Vector3();
    vector.set(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);

    raycaster.ray.set(camera.position, vector.sub(camera.position).normalize());

    let target = raycaster.intersectObjects(items);

    if (target.length) {
      target[0].type = type;
      target[0].object.dispatchEvent(target[0]);
    }

  };
  document.addEventListener(type, listener, false);
}
