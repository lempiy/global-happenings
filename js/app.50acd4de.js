!function(t){function e(e){for(var r,a,s=e[0],c=e[1],u=e[2],h=0,d=[];h<s.length;h++)a=s[h],i[a]&&d.push(i[a][0]),i[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);for(l&&l(e);d.length;)d.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,s=1;s<n.length;s++){var c=n[s];0!==i[c]&&(r=!1)}r&&(o.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},i={0:0},o=[];function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;o.push([134,1]),n()}({105:function(t,e,n){},134:function(t,e,n){"use strict";n.r(e);n(41),n(68),n(73),n(75),n(19),n(20),n(21),n(34),n(13),n(101),n(56),n(57),n(105),n(82),n(108),n(83),n(40);var r=n(1),i=(["varying vec3 vNormal;","void main() {","vNormal = normalize( normalMatrix * normal );","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),["varying vec3 vNormal;","void main() {","float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );","gl_FragColor = vec4( 1.0, 0.3372, 0.0274, 1.0 ) * intensity;","}"].join("\n"),["varying vec4  vColor;","varying float vAngle;","void main()","{","vColor = vec4( 1.0, 1.0, 1.0, 1.0 );","vAngle = 1.2;","vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );","gl_PointSize = 18.0 * ( 350.0 / length( mvPosition.xyz ) );","gl_Position = projectionMatrix * mvPosition;","}"].join("\n")),o=["uniform sampler2D texture;","varying vec4 vColor;","varying float vAngle;","void main()","{","gl_FragColor = vColor;","float c = cos(vAngle);","float s = sin(vAngle);","vec2 rotatedUV = vec2(c * (gl_PointCoord.x - 0.5) + s * (gl_PointCoord.y - 0.5) + 0.5,","c * (gl_PointCoord.y - 0.5) - s * (gl_PointCoord.x - 0.5) + 0.5);","vec4 rotatedTexture = texture2D( texture,  rotatedUV );","gl_FragColor = gl_FragColor * rotatedTexture;","}"].join("\n");var a,s,c,u,l,h,d,f=n(0),p=n(6),y=new r.n(30,window.innerWidth/window.innerHeight,1,6e3);y.position.copy(new r.w(0,0,1600)),a=y.position.clone(),s=y.up.clone(),c=y.position.z;var v=(new r.q).copy(y.quaternion),m=new r.e(0,0,0),g=c,w=function(){return(new r.q).setFromEuler(b())},b=function(){return new r.e(0,Math.atan(window.innerWidth/window.innerHeight*.16),0)};console.log(y.aspect);var x,T=2300;function O(){return l=new r.q,u=(new r.q).copy(v),h=new r.q,d=new r.w,0,l.setFromEuler(b()),[{value:0,cameraZoom:g},1.3,{value:1,ease:p.c.easeInOut,cameraZoom:T,onUpdate:j}]}function _(){return l=new r.q,u=(new r.q).copy(w()),h=new r.q,d=new r.w,0,l.setFromEuler(m),[{value:0,cameraZoom:T},1.3,{value:1,ease:p.c.easeInOut,cameraZoom:g,onUpdate:j}]}function j(){r.q.slerp(u,l,h,this.target.value),d.x=a.x,d.y=a.y,d.z=this.target.cameraZoom,d.applyQuaternion(h),y.position.copy(d),(d=s.clone()).applyQuaternion(h),y.up.copy(d)}function k(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function P(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function M(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}console.log(b());var S=function(){function t(e){var n,a;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.scene=new r.s,this.light=new r.g("#ffffff","#666666",1),this.light.position.set(0,500,0),this.scene.add(this.light),this.waterMaterial=new r.k({color:"#202020",emissive:0,transparent:!0,shininess:30,fog:!0}),this.lights=[],this.lights[0]=new r.o(16777215,1.7,0),this.lights[0].position.set(5e3,0,5e3),(n=this.scene).add.apply(n,P(this.lights)),this.spotTexture=r.h.loadTexture("/public/texture/mark.png"),this.starTexture=r.h.loadTexture("/public/texture/spikey.png"),this.sphere=new r.u(200,75,75),this.baseLayer=new r.j(this.sphere,this.waterMaterial),this.baseLayer.addEventListener("click",function(t){return console.log("click",t)}),this.root=new r.m,this.root.add(this.baseLayer),this.worldOverlay=e,this.mapTexture=new r.v(e),this.mapTexture.needsUpdate=!0,this.mapMaterial=new r.k((k(a={color:"#909090",map:this.mapTexture,transparent:!0,emissive:0},"transparent",!0),k(a,"shininess",30),k(a,"fog",!0),a)),this.atmospheraMaterial=function(t,e,n,i){return new r.t({uniforms:{c:{type:"f",value:t},p:{type:"f",value:e},glowColor:{type:"c",value:new r.d(n)},viewVector:{type:"v3",value:i.position}},vertexShader:"\n        uniform vec3 viewVector;\n        uniform float c;\n        uniform float p;\n        varying float intensity;\n        void main() {\n          vec3 vNormal = normalize( normalMatrix * normal );\n          vec3 vNormel = normalize( normalMatrix * viewVector );\n          intensity = pow( c - dot(vNormal, vNormel), p );\n          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n        }",fragmentShader:"\n        uniform vec3 glowColor;\n        varying float intensity;\n        void main() \n        {\n          vec3 glow = glowColor * intensity;\n          gl_FragColor = vec4( glow, 1.0 );\n        }",side:r.b,blending:r.a,transparent:!0})}(.7,7,"#ff5607",y),this.atmosphera=new r.u(220,75,75),this.atmesh=new r.j(this.atmosphera,this.atmospheraMaterial),this.mapLayer=new r.j(this.sphere,this.mapMaterial),this.root.add(this.mapLayer),this.scene.add(this.atmesh);for(var s=new r.c,c=[],u=0;u<1e4;u++)c.push(r.i.randFloatSpread(4e3)),c.push(r.i.randFloatSpread(2e3)),c.push(-10*Math.random());s.addAttribute("position",new r.f(c,3));var l=function(t){return new r.t({uniforms:{texture:{type:"t",value:t}},vertexShader:i,fragmentShader:o,transparent:!0,alphaTest:.5,blending:r.l,depthTest:!0})}(this.starTexture),h=new r.p(s,l);x=this.root,this.scene.add(h),this.scene.add(this.root)}return function(t,e,n){e&&M(t.prototype,e),n&&M(t,n)}(t,[{key:"getOverlayMap",value:function(){return this.overlayMap}},{key:"getWorldMap",value:function(){return this.worldOverlay}},{key:"drawWorld",value:function(){this.worldOverlay&&(this.mapTexture.needsUpdate=!0)}},{key:"drawOverlay",value:function(t){if(this.overlayMap)this.overlay.material.map.needsUpdate=!0;else{this.overlayMap=t;var e=new r.v(t);e.needsUpdate=!0;var n=new r.k({map:e,transparent:!0});this.overlay?this.overlay.material=n:(this.overlay=new r.j(new r.u(200,75,75),n),this.root.add(this.overlay))}}},{key:"addPoint",value:function(t,e,n){this.sprite&&this.root.remove(this.sprite);var i=new r.u(2,6,6),o=new r.k({color:"#000000",emissive:0,transparent:!0,shininess:30,fog:!0});this.sprite=new r.j(i,o),this.sprite.position.copy(new r.w(t,e,n)),this.root.add(this.sprite),console.log("added",this.sprite,this.root)}},{key:"removePoints",value:function(){this.sprite&&this.root.remove(this.sprite),this.sprite=null}},{key:"cleanOverlay",value:function(){this.overlayMap&&(this.overlay.material.map.needsUpdate=!0)}},{key:"turnGlobe",value:function(t,e){var n=this;return new Promise(function(r){f.e.to({turnY:n.root.rotation.y,turnX:n.root.rotation.x},1,{turnY:e,turnX:t,ease:p.c.easeOut,onUpdate:n.onTurnUpdate,onComplete:r})})}},{key:"getRotateGlobeTween",value:function(){return[{turnX:this.root.rotation.x,turnY:this.root.rotation.y},5,{ease:p.b.easeNone,turnX:0,turnY:this.root.rotation.y+2*Math.PI,onUpdate:this.onTurnUpdate}]}},{key:"onTurnUpdate",value:function(){this.target.turnY&&(x.rotation.y=this.target.turnY),this.target.turnX&&(x.rotation.x=this.target.turnX)}}]),t}(),C=new r.x({antialias:!0});C.setSize(window.innerWidth,window.innerHeight);var E=n(2),A=n(37);n(62),n(63),n(54),n(87),n(88);function z(t){if(!(this instanceof z))return new z(t);this._canvas=t="string"==typeof t?document.getElementById(t):t,this._ctx=t.getContext("2d"),this._width=t.width,this._height=t.height,this._max=1,this._data=[]}function W(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}z.prototype={defaultRadius:25,defaultGradient:{.4:"blue",.6:"cyan",.7:"lime",.8:"yellow",1:"red"},data:function(t){return this._data=t,this},max:function(t){return this._max=t,this},add:function(t){return this._data.push(t),this},clear:function(){return this._data=[],this},radius:function(t,e){e=void 0===e?15:e;var n=this._circle=this._createCanvas(),r=n.getContext("2d"),i=this._r=t+e;return n.width=n.height=2*i,r.shadowOffsetX=r.shadowOffsetY=2*i,r.shadowBlur=e,r.shadowColor="black",r.beginPath(),r.arc(-i,-i,t,0,2*Math.PI,!0),r.closePath(),r.fill(),this},resize:function(){this._width=this._canvas.width,this._height=this._canvas.height},gradient:function(t){var e=this._createCanvas(),n=e.getContext("2d"),r=n.createLinearGradient(0,0,0,256);for(var i in e.width=1,e.height=256,t)r.addColorStop(+i,t[i]);return n.fillStyle=r,n.fillRect(0,0,1,256),this._grad=n.getImageData(0,0,1,256).data,this},draw:function(t){this._circle||this.radius(this.defaultRadius),this._grad||this.gradient(this.defaultGradient);var e=this._ctx;e.clearRect(0,0,this._width,this._height);for(var n,r=0,i=this._data.length;r<i;r++)n=this._data[r],e.globalAlpha=Math.min(Math.max(n[2]/this._max,void 0===t?.05:t),1),e.drawImage(this._circle,n[0]-this._r,n[1]-this._r);var o=e.getImageData(0,0,this._width,this._height);return this._colorize(o.data,this._grad),e.putImageData(o,0,0),this},_colorize:function(t,e){for(var n,r=0,i=t.length;r<i;r+=4)(n=4*t[r+3])&&(t[r]=e[n],t[r+1]=e[n+1],t[r+2]=e[n+2])},_createCanvas:function(){return"undefined"!=typeof document?document.createElement("canvas"):new this._canvas.constructor}};var I=Object(E.b)().translate([2048,1024]).scale(650);function R(t,e,n){var r=(n=n?Object(E.h)(n):Object(E.h)("body").append("canvas").style("display","none").attr("width","4096px").attr("height","2048px")).node().getContext("2d");r.clearRect(0,0,n.node().width,n.node().height);var i=Object(E.d)().projection(I).context(r);return r.strokeStyle="#000",r.lineWidth=.5,r.fillStyle=e||"#CDB380",r.beginPath(),i(t),e&&r.fill(),r.stroke(),n.remove(),n.node()}function F(t,e){(e=e?Object(E.h)(e):Object(E.h)("body").append("canvas").style("display","none").attr("width","4096px").attr("height","2048px")).node().getContext("2d").clearRect(0,0,e.node().width,e.node().height);var n=z(e.node()),r=t.map(function(t){return function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){W(t,e,n[e])})}return t}({},t,{coords:I([Number(t.lng),Number(t.lat)])})});return console.log("PRJ DATA",r),n.data(r.map(function(t){return[t.coords[0],t.coords[1],t.count]})),n.radius(10,30),n.max(Object(E.f)(t,function(t){return+t.count})),n.draw(.1),console.log("HEAAAAAATTTTT",e.node(),r.map(function(t){return[t.coords[0],t.coords[1],t.count]}),Object(E.f)(t,function(t){return+t.count}),n),e.remove(),document.body.appendChild(e.style("display","block").node()),e.node()}var L=function(t,e,n){return R(t,e,n)},D=function(t){return function(t){return(t=t?Object(E.h)(t):Object(E.h)("body").append("canvas").style("display","none").attr("width","4096px").attr("height","2048px")).node().getContext("2d").clearRect(0,0,t.node().width,t.node().height),t.remove(),t.node()}(t)};n(119),n(120);function G(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var H=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.features=e,this.store=e.reduce(function(t,e){return t[e.id]=e,t},{})}return function(t,e,n){e&&G(t.prototype,e),n&&G(t,n)}(t,[{key:"find",value:function(t){return this.store[t]}},{key:"search",value:function(t,e){var n=this.features.find(function(n){switch(n.geometry.type){case"Polygon":return N(n.geometry.coordinates[0],[e,t]);case"MultiPolygon":return n.geometry.coordinates.some(function(n){return N(n[0],[e,t])})}});return n?{code:n.id,name:n.properties.name}:null}}]),t}();function N(t,e){for(var n,r,i,o,a=e[0],s=e[1],c=!1,u=0,l=t.length-1;u<t.length;l=u++)n=t[u][0],i=t[u][1],r=t[l][0],i>s!=(o=t[l][1])>s&&a<(r-n)*(s-i)/(o-i)+n&&(c=!c);return c}function U(t,e){e=e||200;var n=function(t){var e=this.geometry.vertices[t.face.a],n=this.geometry.vertices[t.face.b],r=this.geometry.vertices[t.face.c];return{x:(e.x+n.x+r.x)/3,y:(e.y+n.y+r.y)/3,z:(e.z+n.z+r.z)/3}}.call(this,t),r=Math.acos(n.y/e),i=Math.atan2(n.z,n.x);return[(Math.PI/2-r)*(180/Math.PI),(Math.PI-i)*(180/Math.PI)-180]}n(122);var Y=new r.r;n(124);function X(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){i=!0,o=t}finally{try{r||null==s.return||s.return()}finally{if(i)throw o}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function q(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var V=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.renderer=C,this.camera=y,this.scaneBuilder=null,this.worldTexture=null,this.tokio=[35.6890248,139.7284301],this.isLeft=!1,this.isRunning=!1,this.countries=null,this.decoder=null}return function(t,e,n){e&&q(t.prototype,e),n&&q(t,n)}(t,[{key:"run",value:function(t){var e=this;this.renderer.domElement.classList.add("canvas-3d"),document.body.appendChild(this.renderer.domElement),this.watchResize();var n=t.countries;this.worldTexture=L(n,"#ff5607"),this.countries=n,this.world=new S(this.worldTexture),this.decoder=new H(n.features),function(t,e,n){document.addEventListener(n,function(i){var o={x:(i.clientX-1)/window.innerWidth*2-1,y:-(i.clientY-1)/window.innerHeight*2+1},a=new r.w;a.set(o.x,o.y,.5),a.unproject(t),Y.ray.set(t.position,a.sub(t.position).normalize());var s=Y.intersectObjects(e);s.length&&(s[0].type=n,s[0].object.dispatchEvent(s[0]))},!1)}(this.camera,[this.world.baseLayer],"click"),this.world.baseLayer.addEventListener("click",function(t){U.call(e.world.baseLayer,t)}),this.render()}},{key:"getRotateGlobeTween",value:function(){return this.world.getRotateGlobeTween()}},{key:"worldMain",value:function(){this.worldTexture=L(this.countries,"#ff5607",this.world.getWorldMap()),this.world.drawWorld()}},{key:"worldAlternative",value:function(){this.worldTexture=L(this.countries,"#ffffff",this.world.getWorldMap()),this.world.drawWorld()}},{key:"watchPoint",value:function(t){var e=this.decoder.search(t[0],t[1]);if(e){var n=function(t,e,n){return R(t.geometry,e,n)}(this.decoder.find(e.code),"#ffffff",this.world.getOverlayMap());this.world.drawOverlay(n),this.focusGlobeOnLatLon(t)}}},{key:"normalizeGlobe",value:function(){var t=D(this.world.getOverlayMap());this.world.cleanOverlay(t),this.unfocusGlobe()}},{key:"heatmapGlobe",value:function(t){var e=function(t,e){return F(t,e)}(t,this.world.getOverlayMap());this.world.drawOverlay(e)}},{key:"focusGlobeOnLatLon",value:function(t){var e=this;if(!this.isRunning){this.isRunning=!0;var n=function(t,e){e=e||200;var n=(90-t[0])*Math.PI/180,r=(180-t[1])*Math.PI/180;return{x:-e*Math.sin(n)*Math.cos(r),y:e*Math.cos(n),z:-e*Math.sin(n)*Math.sin(r)}}.call(this.world.baseLayer,t),r=n.x,i=n.y,o=n.z;console.log(r,i,o);var a=X(function(t,e,n){return[t*Math.PI/180,(e+90)*Math.PI/180]}.call(this.world.baseLayer,t[0],t[1]),2),s=a[0],c=a[1];this.world.turnGlobe(s,-c).then(function(){e.isRunning=!1}),this.world.addPoint(r,i,o)}}},{key:"unfocusGlobe",value:function(){var t=this;this.isRunning||(this.isRunning=!0,this.world.turnGlobe(0,0).then(function(){t.isRunning=!1}),this.world.removePoints())}},{key:"render",value:function(){!function(t,e,n){!function r(){requestAnimationFrame(r),t.render(e,n)}()}(this.renderer,this.world.scene,this.camera)}},{key:"getGlobeTween",value:function(t){return("LEFT"===t?O:_)()}},{key:"watchResize",value:function(){!function(t,e){window.addEventListener("resize",function(){t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight)},!1)}(this.camera,this.renderer)}}]),t}());n(89),n(90);function B(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var Z="collapsed",J="top-right",Q="bottom-left",K=function(t){return window.innerWidth*t},$=function(t){return.52*K(t)},tt=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var r=n.position,i=n.widthFactor;this.state=Z,this.position=r,this.widthFactor=i,this.node=e,this.node.attr("class","widget widget-".concat(r))}return function(t,e,n){e&&B(t.prototype,e),n&&B(t,n)}(t,[{key:"getExpandedTranslateX",value:function(){switch(this.position){case Q:case"top-left":return"".concat(.66*window.innerWidth-.5*K(this.widthFactor),"px");case"bottom-right":case J:return"-".concat(.33*window.innerWidth-.5*K(this.widthFactor),"px")}}},{key:"getExpandedTranslateY",value:function(){switch(this.position){case Q:case"bottom-right":return"-".concat(.7*window.innerHeight-.5*$(this.widthFactor),"px");case"top-left":case J:return"".concat(.3*window.innerHeight-.5*$(this.widthFactor),"px")}}},{key:"getMinimizedTranslateX",value:function(){switch(this.position){case Q:case"top-left":return"".concat(.66*window.innerWidth-.5*K(this.widthFactor),"px");case"bottom-right":case J:return"-".concat(.33*window.innerWidth-.5*K(this.widthFactor),"px")}}},{key:"getMinimizedTranslateY",value:function(){switch(this.position){case Q:case"bottom-right":return"0px";case"top-left":case J:return"0px"}}},{key:"collapseTween",value:function(){return this.getTween(Z)}},{key:"expandTween",value:function(){return this.getTween("expanded")}},{key:"minimizeTween",value:function(){return this.getTween("minimized")}},{key:"getTween",value:function(t){switch(t){case"expanded":return[this.node.node(),1.3,{transform:"translate(".concat(this.getExpandedTranslateX(),",").concat(this.getExpandedTranslateY(),") scale(").concat(1.4,")"),ease:p.c.easeInOut}];case"minimized":return[this.node.node(),1.3,{transform:"translate(".concat(this.getMinimizedTranslateX(),",").concat(this.getMinimizedTranslateY(),") scale(").concat(.8,")"),ease:p.a.easeInOut}];case Z:return[this.node.node(),1.3,{transform:"translate(0px,0px)",ease:p.c.easeInOut}]}}},{key:"getWidgetWidth",value:function(){return K(this.widthFactor)}},{key:"getWidgetHeight",value:function(){return $(this.widthFactor)}}]),t}();function et(t){return(et="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function nt(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function rt(t,e){return!e||"object"!==et(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function it(t){return(it=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function ot(t,e){return(ot=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var at=.375,st=function(){return Object(E.a)().translate([480,250]).scale(175)};var ct=function(t){function e(t,n){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(r=rt(this,it(e).call(this,Object(E.h)("body").append("svg"),{position:J,widthFactor:at}))).topology=t,r.geojson=n,r.svg=r.node,r.svg.attr("viewBox","0 0 960 500"),r.points=[],r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&ot(t,e)}(e,tt),function(t,e,n){e&&nt(t.prototype,e),n&&nt(t,n)}(e,[{key:"clear",value:function(){this.svg&&(this.svg.node().innerHTML="")}},{key:"build",value:function(){this.clear();var t=this.svg;t.attr("width",this.getWidgetWidth()).attr("height",this.getWidgetHeight());var e=Object(E.d)().projection(st(this.getWidgetWidth(),this.getWidgetHeight())),n=Object(E.c)();t.append("path").datum(n).attr("class","graticule").attr("d",e),t.append("path").datum(n.outline).attr("class","graticule outline").attr("d",e),t.selectAll(".country").data(this.geojson.features).enter().insert("path",".graticule").attr("class","country").attr("d",e)}},{key:"applySvgStats",value:function(t){var e=this,n=Object(E.d)().projection(st(this.getWidgetWidth(),this.getWidgetHeight())),r=this.svg,i=r.select("g");console.log("this.points",this.points),this.points=this.points.concat(t.map(function(t){return function(t,e){var n=function(t,e){return(e=e.slice())[0]=(e[0]-t.transform.translate[0])/t.transform.scale[0],e[1]=(e[1]-t.transform.translate[1])/t.transform.scale[1],e}(t,e);return Object(A.a)(t,{type:"Point",coordinates:n})}(e.topology,t)})),console.log(this.points),(i.node()?i:r.append("g")).attr("class","stats").attr("fill","green").attr("fill-opacity",.5).attr("stroke","#fff").attr("stroke-width",.5).selectAll("circle").data(this.points).enter().append("circle").attr("cx",function(t){return n.centroid(t)[0]}).attr("cy",function(t){return n.centroid(t)[1]}).attr("r",function(t){return 50}).filter(function(t){return console.log("datum",t),!0}).transition().duration(500).attr("r",2.5)}}]),e}();function ut(t){return(ut="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function lt(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function ht(t,e){return!e||"object"!==ut(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function dt(t){return(dt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function ft(t,e){return(ft=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var pt=.34,yt=function(t){function e(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(t=ht(this,dt(e).call(this,Object(E.h)("body").append("table"),{position:Q,widthFactor:pt}))).rowHeight=100/(n+2),t.maxItems=n,t.body=null,t}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&ft(t,e)}(e,tt),function(t,e,n){e&&lt(t.prototype,e),n&&lt(t,n)}(e,[{key:"getRowHeight",value:function(){return this.getWidgetHeight()/(this.maxItems+2)}},{key:"build",value:function(t){var e=this;this.node.html("");var n=this.node.attr("width",this.getWidgetWidth()+"px").attr("style","margin: 15px;").append("thead").append("tr").attr("height",this.getRowHeight()+"px");this.columns=t,this.columns.forEach(function(t){n.append("th").text(t.title)}),this.body=this.node.append("tbody");for(var r=function(t){var n=e.body.append("tr").attr("height",e.getRowHeight()+"px");e.columns.forEach(function(t){n.append("td")})},i=0;i<this.maxItems;i++)r()}},{key:"addRow",value:function(t){var e=this.body,n=this.columns,r=this.getRowHeight();e.select("tr:last-of-type").transition().style("transform","translateY(".concat(r,"px)")).duration(500).on("end",function(){this.remove();var i=e.insert("tr",":first-child").attr("class","with-data").attr("height",r+"px").style("transform","translate(50%)");n.forEach(function(e){i.append("td").html(t[e.key])}),i.transition().duration(500).style("transform","translate(0)")})}}]),e}();function vt(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var mt=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.map=new ct(e,n),this.table=new yt,this.currentTimeline=null}return function(t,e,n){e&&vt(t.prototype,e),n&&vt(t,n)}(t,[{key:"build",value:function(t){this.table.build(t),this.map.build()}},{key:"addToTable",value:function(t){console.log(t),this.table.addRow(t)}},{key:"addToMap",value:function(t){console.log("addToMap",t),this.map.applySvgStats([[Number(t.lng),Number(t.lat)]])}},{key:"getTweens",value:function(){return{mapExpand:this.map.expandTween(),tableMinimize:this.table.minimizeTween()}}}]),t}();n(129),n(131);function gt(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){i=!0,o=t}finally{try{r||null==s.return||s.return()}finally{if(i)throw o}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function wt(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){bt(t,e,n[e])})}return t}function bt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function xt(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Tt(t,e){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t))+t}var Ot=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.daily_items=[],this.counter_items={},this._daily_subs=new Set,this._total_change=new Set}return function(t,e,n){e&&xt(t.prototype,e),n&&xt(t,n)}(t,[{key:"onDailyChange",value:function(t){var e=this;return this._daily_subs.add(t),function(){return e._daily_subs.delete(t)}}},{key:"onTotalChange",value:function(t){var e=this;return this._total_change.add(t),function(){return e._total_change.delete(t)}}},{key:"addItem",value:function(t){var e=this;this.daily_items.push(t);var n="".concat(t.country,":").concat(t.name),r=this.counter_items[n];this.counter_items[n]=r?wt({},r,{count:r.count+t.count}):wt({},t,{count:t.count}),this._daily_subs.forEach(function(e){return e({event:"add",data:t})}),this._total_change.forEach(function(t){return t(e.getTotal())})}},{key:"getTotal",value:function(){return Object.values(this.counter_items)}},{key:"emulate",value:function(){var t=this;Promise.all([fetch("public/data/cities.json"),fetch("public/data/countries.json")]).then(function(t){var e=gt(t,2),n=e[0],r=e[1];return Promise.all([n.json(),r.json()])}).then(function(e){var n=gt(e,2),r=n[0],i=n[1];setInterval(function(){var e=r[Tt(0,128769)],n=i[e.country];t.addItem(wt({},e,{country_props:n,count:Tt(1,3)}))},3e3)})}}]),t}());function _t(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function jt(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}new(function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.currentTimeline=null,this.rotationGlobTimeline=null,this.space=e,this.dataService=Ot}return function(t,e,n){e&&jt(t.prototype,e),n&&jt(t,n)}(t,[{key:"run",value:function(){var t=this;Ot.emulate(),Object(E.e)("public/data/world.json").then(function(t){var e=Object(A.a)(t,t.objects.countries);return{worldTexture:R(e,"#ff5607"),countries:e,topology:t}}).then(function(e){var n,r=!1;t.desk=new mt(e.topology,e.countries),t.desk.build([{key:"flag",title:""},{key:"country",title:"Country"},{key:"city",title:"City"},,{key:"datetime",title:"Datetime"}]),t.space.run(e),t.dataService.onDailyChange(function(e){r||V.watchPoint([Number(e.data.lat),Number(e.data.lng)]),console.log("TOTAL",t.dataService.getTotal()),t.desk.addToTable({flag:"<img src='https://www.countryflags.io/".concat(e.data.country.toLowerCase(),"/flat/32.png'/ alt='").concat(e.data.country,"-flag'>"),country:e.data.country_props.name,city:e.data.name,datetime:(new Date).toISOString()}),t.desk.addToMap(e.data)}),t.timelineTable=new p.d({paused:!0}),t.setupDescriptionAnimation(),t.rotationGlobTimeline=new p.d({paused:!0,onComplete:function(){this.restart()}}),(n=t.rotationGlobTimeline).to.apply(n,_t(t.space.getRotateGlobeTween())),document.body.addEventListener("contextmenu",function(e){e.preventDefault(),r?(t.animateFromDescription(),V.worldMain(),r=!1):(t.animateToDescription(),r=!0,V.normalizeGlobe(),V.worldAlternative(),V.heatmapGlobe(t.dataService.getTotal()))})})}},{key:"setupDescriptionAnimation",value:function(){var t,e,n;this.timelineDescription=new p.d({paused:!0}),(t=this.timelineDescription).to.apply(t,_t(this.space.getGlobeTween("LEFT")));var r=this.desk.getTweens(),i=r.mapExpand,o=r.tableMinimize;(e=this.timelineDescription).to.apply(e,_t(i).concat(["-=1.3"])),(n=this.timelineDescription).to.apply(n,_t(o).concat(["-=1.3"]))}},{key:"animateToDescription",value:function(){this.currentTimeline&&this.currentTimeline.isActive()&&(this.currentTimeline.pause(),this.rotationGlobTimeline.pause()),this.currentTimeline=this.timelineDescription,this.currentTimeline.restart(),this.rotationGlobTimeline.restart()}},{key:"animateFromDescription",value:function(){this.currentTimeline&&this.currentTimeline.isActive()&&this.currentTimeline.pause(),this.currentTimeline=this.timelineDescription,this.currentTimeline.reverse(),this.rotationGlobTimeline.pause()}}]),t}())(V).run()}});
//# sourceMappingURL=app.50acd4de.js.map