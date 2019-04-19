import {
  PerspectiveCamera,
  Quaternion,
  Vector3,
  Euler
} from 'three';
import {
  TweenLite,
} from 'gsap/TweenLite';
import {
  Sine,
} from 'gsap';
export const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 30, 3000);
let cameraPos0; // initial camera position
let cameraUp0; // initial camera up
let cameraZoom; // camera zoom
let iniQ; // initial quaternion
let endQ; // target quaternion
let curQ; // temp quaternion during slerp
let vec3; // generic vector object
let tweenValue; // tweenable value 
camera.position.copy(new Vector3(0, 0, 700));
cameraPos0 = camera.position.clone();
cameraUp0 = camera.up.clone();
cameraZoom = camera.position.z;
const centerQ = new Quaternion().copy(camera.quaternion);
const centerEuler = new Euler(0.0, 0.0, 0.0);
const centerZoom = cameraZoom;
const leftQ = () => new Quaternion().setFromEuler(leftEuler());
const cameraYRotationNoRatioConstant = 0.6
const leftEuler = () => new Euler(0.0, Math.atan(cameraYRotationNoRatioConstant*(window.innerWidth / window.innerHeight)), 0.0);
console.log(camera.aspect)
const leftZoom = 800;
console.log(leftEuler());

// set a new target for the camera
export function moveCamera(euler, zoom) {
  // reset everything
  endQ = new Quaternion();
  iniQ = new Quaternion().copy(camera.quaternion);
  curQ = new Quaternion();
  vec3 = new Vector3();
  tweenValue = 0;
  endQ.setFromEuler(euler);
  return new Promise(resolve => {
    TweenLite.to({
      value: 0,
      cameraZoom: cameraZoom,
    }, 1.3, {
      value: 1,
      ease: Sine.easeOut,
      cameraZoom: zoom,
      onUpdate: onSlerpUpdate,
      onComplete: resolve
    });
  });
}

export function moveCameraFromCenterToLeft() {
  // reset everything
  endQ = new Quaternion();
  iniQ = new Quaternion().copy(centerQ);
  curQ = new Quaternion();
  vec3 = new Vector3();
  tweenValue = 0;
  endQ.setFromEuler(leftEuler());
  return new Promise(resolve => {
    TweenLite.to({
      value: 0,
      cameraZoom: centerZoom,
    }, 1.3, {
      value: 1,
      ease: Sine.easeOut,
      cameraZoom: leftZoom,
      onUpdate: onSlerpUpdate,
      onComplete: resolve
    });
  });
}

export function moveCameraFromLeftToCenter() {
  // reset everything
  endQ = new Quaternion();
  iniQ = new Quaternion().copy(leftQ());
  curQ = new Quaternion();
  vec3 = new Vector3();
  tweenValue = 0;
  endQ.setFromEuler(centerEuler);
  return new Promise(resolve => {
    TweenLite.to({
      value: 0,
      cameraZoom: leftZoom,
    }, 1.3, {
      value: 1,
      ease: Sine.easeOut,
      cameraZoom: centerZoom,
      onUpdate: onSlerpUpdate,
      onComplete: resolve
    });
  });
}

// on every update of the tween
function onSlerpUpdate() {
  // interpolate quaternions with the current tween value
  Quaternion.slerp(iniQ, endQ, curQ, this.target.value);

  // apply new quaternion to camera position
  vec3.x = cameraPos0.x;
  vec3.y = cameraPos0.y;
  vec3.z = this.target.cameraZoom;
  vec3.applyQuaternion(curQ);
  camera.position.copy(vec3);

  // apply new quaternion to camera up
  vec3 = cameraUp0.clone();
  vec3.applyQuaternion(curQ);
  camera.up.copy(vec3);
}
