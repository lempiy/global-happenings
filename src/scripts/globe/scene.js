import {
  Scene,
  HemisphereLight,
  MeshPhongMaterial,
  SphereGeometry,
  Mesh,
  Texture,
  PointLight,
  Object3D,
  Points,
  PointsMaterial,
  BufferGeometry,
  Float32BufferAttribute,
  Math as ThreeMath,
  ImageUtils,
  Sprite,
  SpriteMaterial,
  MeshBasicMaterial,
  UniformsUtils,
  ShaderMaterial,
  BackSide,
  NormalBlending,
  Vector3,
  Vector2
} from "three";
import { glowMaterial } from "~/scripts/globe/shaders";
import { camera } from "~/scripts/globe/camera";
import { TweenLite } from "gsap/TweenLite";
import { Sine, Back } from "gsap";

let root;

export class SceneBuilder {
  constructor(mapCanvas) {
    this.scene = new Scene();
    this.light = new HemisphereLight("#ffffff", "#666666", 1);
    this.light.position.set(0, 500, 0);
    this.scene.add(this.light);
    this.waterMaterial = new MeshPhongMaterial({
      color: "#202020",
      emissive: 0x0,
      transparent: true,
      shininess: 30,
      fog: true
    });
    this.lights = [];
    this.lights[0] = new PointLight(0xffffff, 1.7, 0);
    // this.lights[1] = new PointLight(0xffffff, 1, 0);
    // lights[2] = new PointLight(0xffffff, 1, 0);

    this.lights[0].position.set(5000, 0, 5000);
    // this.lights[1].position.set(200, 1000, 200);
    // this.lights[2].position.set(-600, -3000, -1500);

    this.scene.add(...this.lights);

    this.spotTexture = ImageUtils.loadTexture("/public/texture/mark.png");

    this.sphere = new SphereGeometry(200, 75, 75);
    this.baseLayer = new Mesh(this.sphere, this.waterMaterial);
    this.baseLayer.addEventListener("click", e => console.log("click", e));
    this.root = new Object3D();
    this.root.add(this.baseLayer);
    root = this.root;

    this.mapTexture = new Texture(mapCanvas);
    this.mapTexture.needsUpdate = true;

    this.mapMaterial = new MeshPhongMaterial({
      color: "#909090",
      map: this.mapTexture,
      transparent: true,
      emissive: 0x0,
      transparent: true,
      shininess: 30,
      fog: true
    });

    this.atmospheraMaterial = glowMaterial(0.7, 7.0, "#ff5607", camera);
    //this.atmospheraMaterial.opacity = 0.7;
    this.atmosphera = new SphereGeometry(230, 75, 75);
    this.atmesh = new Mesh(this.atmosphera, this.atmospheraMaterial);

    this.mapLayer = new Mesh(this.sphere, this.mapMaterial);
    console.log(this.mapLayer);
    this.root.add(this.mapLayer);
    this.scene.add(this.atmesh);

    var geometry = new BufferGeometry();
    var vertices = [];
    for (var i = 0; i < 10000; i++) {
      vertices.push(ThreeMath.randFloatSpread(8000)); // x
      vertices.push(ThreeMath.randFloatSpread(5000)); // y
      vertices.push(Math.random() * -500); // z
    }
    geometry.addAttribute("position", new Float32BufferAttribute(vertices, 3));
    var particles = new Points(
      geometry,
      new PointsMaterial({
        color: 0xffffff
      })
    );
    this.scene.add(particles);
    this.scene.add(this.root);
  }

  addPoint(x, y, z) {
    const spriteMaterial = new SpriteMaterial({
      map: this.spotTexture,
      color: 0xffffff
    });
    const sprite = new Sprite(spriteMaterial);
    sprite.scale.set(10, 10, 1.0);
    sprite.material.color.setRGB(1.0, 0, 0.5);
    //sprite.material.blending = NormalBlending;
    sprite.position.copy(new Vector3(x, y, z));
    //sprite.center.copy(new Vector2(0.5, 0));

    this.root.add(sprite);
    console.log("added", sprite, this.root);
  }

  turnGlobe(x, y) {
    return new Promise(resolve => {
      TweenLite.to(
        {
          turnY: this.root.rotation.y,
          turnX: this.root.rotation.x
        },
        1.3,
        {
          turnY: y,
          turnX: x,
          ease: Back.easeInOut,
          onUpdate: this.onTurnUpdate,
          onComplete: resolve
        }
      );
    });
  }

  onTurnUpdate() {
    root.rotation.y = this.target.turnY;
    root.rotation.x = this.target.turnX;
  }
}
