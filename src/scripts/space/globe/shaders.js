import {
  ShaderMaterial,
  Color,
  BackSide,
  AdditiveBlending,
  NormalBlending
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


const particleVertexShader = 
[
"varying vec4  vColor;",
"varying float vAngle;",
"void main()",
"{",
	"vColor = vec4( 1.0, 1.0, 1.0, 1.0 );", //     set color associated to vertex; use later in fragment shader.
		
	"vAngle = 1.2;",

	"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
	"gl_PointSize = 18.0 * ( 350.0 / length( mvPosition.xyz ) );",     // scale particles as objects in 3D space
	"gl_Position = projectionMatrix * mvPosition;",
"}"
].join("\n");

const particleFragmentShader =
[
"uniform sampler2D texture;",
"varying vec4 vColor;", 	
"varying float vAngle;",   
"void main()", 
"{",
	"gl_FragColor = vColor;",
	
	"float c = cos(vAngle);",
	"float s = sin(vAngle);",
	"vec2 rotatedUV = vec2(c * (gl_PointCoord.x - 0.5) + s * (gl_PointCoord.y - 0.5) + 0.5,", 
	                      "c * (gl_PointCoord.y - 0.5) - s * (gl_PointCoord.x - 0.5) + 0.5);",  // rotate UV coordinates to rotate texture
    	"vec4 rotatedTexture = texture2D( texture,  rotatedUV );",
	"gl_FragColor = gl_FragColor * rotatedTexture;",    // sets an otherwise white particle texture to desired color
"}"
].join("\n");

export function particleMaterial(particleTexture) {
  return new ShaderMaterial( 
    {
      uniforms: 
      {
        texture:   { type: "t", value: particleTexture },
      },
      vertexShader:   particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,  alphaTest: 0.5, // if having transparency issues, try including: alphaTest: 0.5, 
      blending: NormalBlending, depthTest: true
    });
}

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
