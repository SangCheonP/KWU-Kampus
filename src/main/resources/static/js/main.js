import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { MapControls } from 'three/addons/controls/MapControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

let camera, controls, scene, renderer;
const buildings = [];
const modals = [];

const fixedHelp = document.getElementById( 'fixedHelp' );
fixedHelp.addEventListener( 'click', () => {

  if ( fixedHelp.classList.contains( 'active' ) ) {

    fixedHelp.classList.remove( 'active' );
    fixedHelp.removeAttribute( 'style' );
    return;

  }

  fixedHelp.classList.add( 'active' );
  fixedHelp.style.height = fixedHelp.querySelector( 'ul' ).clientHeight + 40 + 'px';

} );

init();
//render(); // remove when using next line for animation loop (requestAnimationFrame)
animate();

function init() {

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xcccccc );
  scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight - 80 );
  document.querySelector('main').appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera (60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 400, 200, 0 );

  // controls

  controls = new MapControls( camera, renderer.domElement );

  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  controls.minDistance = 100;
  controls.maxDistance = 500;

  controls.maxPolarAngle = Math.PI / 2;

  // GLTF Loader
  const gltfLoader = new GLTFLoader();
  loadModel( gltfLoader, './models/SaeBit.glb', new THREE.Vector3( 112, 0, -460 ), 'SaeBit', -106, 2 );
  loadModel( gltfLoader, './models/HwaDo.glb', new THREE.Vector3(-30, 0, -210), 'HwaDo', -118, 2);

  // world floor
  const planeSize = 2000;
  const planeTexture = new THREE.TextureLoader().load( './images/KakaoMap_KWU.png' );
  const worldFloor = new THREE.Mesh(
    new THREE.PlaneGeometry( planeSize, planeSize, 8, 8 ),
    new THREE.MeshBasicMaterial( { side: THREE.FrontSide, map: planeTexture } )
  );
  worldFloor.rotateX( Math.PI / (-2) );
  worldFloor.rotateZ( Math.PI / 2 );
  scene.add(worldFloor);

  // lights

  const dirLight1 = new THREE.DirectionalLight( 0xffffff );
  dirLight1.position.set( 10, 12, 9 );
  scene.add( dirLight1 );

  const dirLight2 = new THREE.DirectionalLight( 0x002266 );
  dirLight2.position.set( -9, -12, -10 );
  scene.add( dirLight2 );

  const ambientLight = new THREE.AmbientLight( 0x222222 );
  scene.add( ambientLight );

  //

  window.addEventListener( 'resize', onWindowResize );

  // Create GUI Control Pannel
  const gui = new GUI( { container: document.getElementById( 'guiContainer' ), title: 'Information' } );
  let obj = {
    myBoolean: false,
    myString: 'Test String',
    myNumber: 512,
    자세히보기: function() { alert( 'hi' ) } // onclick callback
  }
  
  gui.add( obj, 'myBoolean' ); 	// checkbox
  gui.add( obj, 'myString' ); 	// text field
  gui.add( obj, 'myNumber' ); 	// number field
  gui.add( obj, '자세히보기' ); 	// button

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );
  // Let the groups generated from `createMedal()` to face camera all the time
  modals.forEach( ( modal ) => {

    modal.quaternion.copy( camera.quaternion );

  });
  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
  render();

}

function render() {

  renderer.render( scene, camera );

}

/**
 * 건물 모델, `*.glb`를 불러옵니다.
 * 
 * `loader` 를 사용해 `modelPath` 에 있는 모델을 불러옵니다.   
 * 모델의 위치, 회전시킬 각도, 크기 조정을 위한 스케일을 설정하여 `scene` 및 `buildings` 리스트에 추가하고, `createModal()` 에 `position` 을 전달합니다.
 * 
 * 모델만 불러오고, 모델의 position, angle, scale 을 설정하는 기능을 나눠야함.
 * @param { GLTFLoader } loader `GLTFLoader` used in this file.
 * @param { string } modelPath 
 * @param { THREE.Vector3 } position 
 * @param { string } name 
 * @param { number } angle 
 * @param { number } scale 
 */
async function loadModel ( loader, modelPath, position, name, angle, scale ) {

  await loader.load( modelPath, async ( gltf ) => {

    const model = await gltf.scene;
    model.position.copy( position );
    model.rotateY( Math.PI / 180 * angle );
    model.scale.setScalar( scale );
    
    createModal( model.position, name );
    buildings.push( model );
    scene.add( model );

  }, ( progress ) => {

    console.log( progress.loaded / progress.total * 100 + "% loaded!" );

  }, ( error ) => {

    console.error( error );

  } );

}

/**
 * 건물 이름 표시를 위한 3D 모달 생성 함수입니다.   
 * `position` 에 해당하는 위치에서 `THREE.Line` 과 `THREE.Mesh (text)` 을 갖는 `THREE.Group` 을 생성합니다.
 * @param { THREE.Vector3 } position position of the target model
 * @param { string } name name of the target building
 */
function createModal( position, name ) {
  // Drawing Lines:
  const points = [];
  points.push( new THREE.Vector3( 0, 0, 0 ) );
  points.push( new THREE.Vector3( 50, 50, 50 ) );

  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints( points ),
    new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 5 } )
  );
  line.position.set( 0, 0, 0 );
  line.material.depthTest = false; // for renderOrder

  // Create Plane:
  // (Will be replaced by Text)
  // const plane = new THREE.Mesh(
  //   new THREE.PlaneGeometry( 50, 50, 8, 8, ),
  //   new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.FrontSide, transparent: true, opacity: 0.5 } )
  // );
  // plane.position.set( 50, 50, 50 );
  // plane.material.depthTest = false; // for renderOrder

  const loader = new FontLoader();
  loader.load('./fonts/helvetiker_bold.typeface.json', function (font) {

    const material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: false,
      side: THREE.FrontSide,
    });

    const message = name;
    const shapes = font.generateShapes(message, 10);
    const geometry = new THREE.ShapeGeometry(shapes);

    geometry.computeBoundingBox();
    const yMid = 0.5 * (geometry.boundingBox.max.y - geometry.boundingBox.min.y);
    // geometry.translate(0, yMid, 0);

    // make shape ( N.B. edge view not visible )
    const text = new THREE.Mesh(geometry, material);
    text.position.set( 50, 50, 50 );
    text.material.depthTest = false; // for renderOrder
    group.add(text);

  }); //end load function

  // Create Group:
  const group = new THREE.Group();
  group.add( line );
  // group.add( plane );
  group.position.copy( position );
  modals.push( group );
  group.renderOrder = 1; // renderOrder (z-index)
  scene.add( group );

}