import {
  ShaderMaterial,
  Color,
  BackSide,
  AdditiveBlending
} from 'three';

export const atmosphere = {
  uniforms: {},
  vertexShader: [
    'varying vec3 vNormal;',
    'void main() {',
    'vNormal = normalize( normalMatrix * normal );',
    'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
    '}'
  ].join('\n'),
  fragmentShader: [
    'varying vec3 vNormal;',
    'void main() {',
    'float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );',
    'gl_FragColor = vec4( 1.0, 0.3372, 0.0274, 1.0 ) * intensity;',
    '}'
  ].join('\n')
};

export function glowMaterial(intensity, fade, color, camera) {
  // Custom glow shader from https://github.com/stemkoski/stemkoski.github.com/tree/master/Three.js
  return new ShaderMaterial({
    uniforms: {
      'c': {
        type: 'f',
        value: intensity
      },
      'p': {
        type: 'f',
        value: fade
      },
      glowColor: {
        type: 'c',
        value: new Color(color)
      },
      viewVector: {
        type: 'v3',
        value: camera.position
      }
    },
    vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize( normalMatrix * normal );
          vec3 vNormel = normalize( normalMatrix * viewVector );
          intensity = pow( c - dot(vNormal, vNormel), p );
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
    fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() 
        {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4( glow, 1.0 );
        }`,
    side: BackSide,
    blending: AdditiveBlending,
    transparent: true
  });
};
