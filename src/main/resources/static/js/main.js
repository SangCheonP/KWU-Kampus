import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { MapControls } from 'three/addons/controls/MapControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

// basic javascripts

const datas = [];
let receivedData = [];

function getBuildings() {
  $.ajax( {

    url : "http://localhost:8090/buildings",
    type : "GET",
    success : function ( res ) {

      if ( res ) {
        receivedData = res;
        console.log( res );
        console.log( receivedData );
      } else {
        alert( "실패" );
      }

    }

  } );
}
// const receivedData = getBuildings();
// getBuildings();

const HwaDo = {
  id: '01',
  building: '화도관',
  building_phone_num: '',
  management_team: '',
  management_team_phone_num: '',
  modelPath: './models/HwaDo.glb',
  position: { x: -16, y: 0, z: -106 },
  angle: -118,
  scale: 1,
  others: '',
}
const OkUi = {
  id: '02',
  building: '옥의관',
  building_phone_num: '',
  management_team: '',
  management_team_phone_num: '',
  modelPath: './models/OkUi.glb',
  position: { x: 162, y: 0, z: -72 },
  angle: 212,
  scale: 1,
  others: '',
}
const BiMa = {
  id: '03',
  building: '비마관',
  building_phone_num: '',
  management_team: '',
  management_team_phone_num: '',
  modelPath: './models/BiMa.glb',
  position: { x: 79, y: 0, z: -148 },
  angle: 23,
  scale: 1,
  others: '',
}
const SaeBit = {
  id: '04',
  building: '새빛관',
  building_phone_num: '',
  management_team: '',
  management_team_phone_num: '',
  modelPath: './models/SaeBit.glb',
  position: { x: 55, y: 0, z: -229 },
  angle: 74.5,
  scale: 1,
  others: '',
}
const BokJi = {
  id: '05',
  building: '복지관',
  building_phone_num: '',
  management_team: '',
  management_team_phone_num: '',
  modelPath: './models/BokJi.glb',
  position: { x: 120, y: 0, z: 5 },
  angle: -28,
  scale: 1,
  others: '',
}
const DongHae = {
  id: '06',
  building: '연구문화관',
  building_phone_num: '',
  management_team: '',
  management_team_phone_num: '',
  modelPath: './models/DongHae.glb',
  position: { x: 50, y: 0, z: 65 },
  angle: 159,
  scale: 1,
  others: '',
}
const IceRink = {
  id: '06-1',
  building: '아이스링크',
  building_phone_num: '',
  management_team: '',
  management_team_phone_num: '',
  modelPath: './models/IceRink.glb',
  position: { x: 0, y: 0, z: 97 },
  angle: 123,
  scale: 1,
  others: '',
}
const DaSan = {
  id: '07',
  building: '다산재',
  building_phone_num: '',
  management_team: '',
  management_team_phone_num: '',
  modelPath: './models/DaSan.glb',
  position: { x: 131, y: 0, z: -156 },
  angle: 42,
  scale: 1,
  others: '',
}
const ChamBit = {
  id: '09',
  building: '참빛관',
  building_phone_num: '',
  management_team: '',
  management_team_phone_num: '',
  modelPath: './models/ChamBit.glb',
  position: { x: 128, y: 0, z: -235 },
  angle: -70,
  scale: 1,
  others: '',
}
const HanUl = {
  id: '10',
  building: '한울관',
  building_phone_num: '',
  management_team: '',
  management_team_phone_num: '',
  modelPath: './models/HanUl.glb',
  position: { x: -37, y: 0, z: 104 },
  angle: -76,
  scale: 1,
  others: '',
}
const HanCheon = {
  id: '11',
  building: '한천재',
  building_phone_num: '',
  management_team: '',
  management_team_phone_num: '',
  modelPath: './models/HanCheon.glb',
  position: { x: 8, y: 0, z: 65 },
  angle: -20,
  scale: 1,
  others: '',
}
const KWSquare = {
  id: '16',
  building: '광운스퀘어&80주년기념관',
  building_phone_num: '',
  management_team: '',
  management_team_phone_num: '',
  modelPath: './models/KWSquare.glb',
  position: { x: 42, y: 0, z: -70 },
  angle: -119,
  scale: 1,
  others: '',
}
const BitSolA = {
  id: '17',
  building: '빛솔재A동',
  building_phone_num: '',
  management_team: '',
  management_team_phone_num: '',
  modelPath: './models/BitSolA.glb',
  position: { x: -118, y: 0, z: 180 },
  angle: 15,
  scale: 1,
  others: '',
}
const BitSolB = {
  id: '18',
  building: '빛솔재B동',
  building_phone_num: '',
  management_team: '',
  management_team_phone_num: '',
  modelPath: './models/BitSolB.glb',
  position: { x: -107, y: 0, z: 129 },
  angle: 15,
  scale: 1,
  others: '',
}

datas.push( HwaDo );
datas.push( OkUi );
datas.push( BiMa ); 
datas.push( SaeBit );
datas.push( BokJi );
datas.push( DongHae );
datas.push( IceRink );
datas.push( DaSan );
datas.push( ChamBit );
datas.push( HanUl );
datas.push( HanCheon );
datas.push( KWSquare );
datas.push( BitSolA );
datas.push( BitSolB );

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

const subCategories = document.querySelectorAll( 'ul.sub-categories li a' );
const main = document.querySelector( 'main' );

///////////////////////////////
///// THREE.js from here: /////
///////////////////////////////

let width, height, camera, controls, scene, renderer, raycaster, gui;

const pointer = new THREE.Vector2(); // mouse cursor position tracking
let intersects = []; // list to find which building is selected
let INTERSECTED = undefined; // stores which building is selected

const buildings = [];
const fonts = [];
// const arrows = [];

init();
animate();

function init() {

  // variables

  width = window.innerWidth;
  height = window.innerHeight;

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xcccccc );
  scene.fog = new THREE.FogExp2( 0xcccccc, 0.003 );

  raycaster = new THREE.Raycaster(); // for mouse(pointer) tracking

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( width, height );
  main.appendChild( renderer.domElement ); // where to append

  camera = new THREE.PerspectiveCamera( 60, width / height, 1, 700 );// 1000 );
  camera.position.set( 200, 100, 0 ); // ( 400, 200, 0 );

  // controls

  controls = new MapControls( camera, renderer.domElement );

  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  controls.minDistance = 100;
  controls.maxDistance = 500;

  controls.maxPolarAngle = Math.PI / 2;

  // GLTF Loader, load models

  const gltfLoader = new GLTFLoader();
  datas.forEach( ( data ) => {
    createModel( gltfLoader, data );
  } );

  // world floor

  const planeSize = 1000; // 2000;
  const planeTexture = new THREE.TextureLoader().load( './images/KakaoMap_KWU.png' );
  const worldFloor = new THREE.Mesh(
    new THREE.PlaneGeometry( planeSize, planeSize, 8, 8 ),
    new THREE.MeshBasicMaterial( { side: THREE.FrontSide, map: planeTexture } )
  );
  worldFloor.rotateX( Math.PI / ( -2 ) );
  worldFloor.rotateZ( Math.PI / 2 );
  worldFloor.name = 'worldFloor';
  scene.add( worldFloor );

  // lights

  const dirLight1 = new THREE.DirectionalLight( 0xffffff );
  dirLight1.position.set( 10, 12, 9 );
  dirLight1.name = 'dirLight1';
  scene.add( dirLight1 );

  const dirLight2 = new THREE.DirectionalLight( 0x002266 );
  dirLight2.position.set( -9, -12, -10 );
  dirLight2.name = 'dirLight2';
  scene.add( dirLight2 );

  const ambientLight = new THREE.AmbientLight( 0x222222 );
  ambientLight.name = 'ambientLight';
  scene.add( ambientLight );

  // Create GUI Pannel

  gui = new GUI( { container: document.getElementById( 'guiContainer' ), title: 'Information' } );
  let obj = {
    building: '',
    building_phone_num: '',
    management_team: '',
    management_team_phone_num: '',
    id: '',
    myFunction: function() { alert( 'hi' ) }, // onclick callback
  }
  
  gui.add( obj, 'building' ).name( '건물명' );
  gui.add( obj, 'building_phone_num' ).name( '전화번호' );
  gui.add( obj, 'management_team' ).name( '시설관리팀' );
  gui.add( obj, 'management_team_phone_num' ).name( '시설관리팀 전화번호' );
  gui.add( obj, 'id' ).name( 'Building ID' );
  gui.add( obj, 'myFunction' ).name( 'alert hi' ); 	// button
  gui.controllers[0].$input.readOnly = true;
  gui.controllers[1].$input.readOnly = true;
  gui.controllers[2].$input.readOnly = true;
  gui.controllers[3].$input.readOnly = true;
  gui.open( false );

  // // Grid Helper
  // const gridHelper = new THREE.GridHelper( 1000, 100 );
  // scene.add( gridHelper );

  window.addEventListener( 'resize', onWindowResize );
  main.addEventListener( 'pointermove', onPointerMove );
  main.addEventListener( 'click', onClick );
  // window.addEventListener( 'dblclick', ( event ) => { // dev, 더블 클릭시 카메라의 위치에서 카메라 방향으로 
  //   let worldDirection = new THREE.Vector3;
  //   let worldPosition = new THREE.Vector3;
  //   const arrow = new THREE.ArrowHelper( camera.getWorldDirection( worldDirection ), camera.getWorldPosition( worldPosition ), 15, 0xff0000 );
  //   scene.add( arrow );
  //   console.log( worldDirection );
  //   console.log( worldPosition );
  // } );

}

// window events

function onWindowResize() {
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize( width, height );
  
}

function onPointerMove( event ) {

  pointer.set( ( event.clientX / width ) * 2 - 1, - ( event.clientY / height ) * 2 + 1 );
  getIntersects();

}

function onClick( event ) {

  onPointerMove( event ); // get pointer position
  if ( INTERSECTED ) {

    INTERSECTED.userData.onClick();

  }

}

// three.js required

function animate() {

  window.requestAnimationFrame( animate );

  // Let the groups generated from `createFont()` to face the camera all the time
  fonts.forEach( ( font ) => {

    font.quaternion.copy( camera.quaternion );

  } );
  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
  render();

}

function render() {

  renderer.render( scene, camera );

}

// custom functions

/**
 * 건물의 모델링을 불러와 `scene`에 추가하고, `buildings` 리스트에 저장 및 `subCategories`의 이벤트 리스너를 설정합니다.
 * 
 * `loader` 를 사용해 `building.modelPath` 에 있는 모델을 불러옵니다.   
 * 모델의 위치, 회전시킬 각도, 크기 조정을 위한 스케일을 설정하여 `scene` 및 `buildings` 리스트에 추가하고, `createFont()` 에 `position` 을 전달합니다.
 * @param { GLTFLoader } loader `GLTFLoader` used in this file.
 * @param { object } data Item stored in `receivedData` list, an object containing informations of each buildings.
 */
function createModel ( loader, data ) {

  if ( data.modelPath === '' ) { console.error( 'modelPath not found' ); }
  loader.load( data.modelPath, async ( gltf ) => {

    const model = await gltf.scene;
    if ( !model ) {
      // error handling
    }
    model.name = data.building;
    model.position.set( data.position.x, data.position.y, data.position.z );
    model.rotateY( Math.PI / 180 * data.angle );
    model.scale.setScalar( data.scale );

    model.userData = {
      // isActive: false, // not used
      id: data.id,
      building_phone_num: data.building_phone_num,
      management_team: data.management_team,
      management_team_phone_num: data.management_team_phone_num,
      viewPosition: data.viewPosition,
      others: data.others,

      onPointerOver: function() {
        for ( let child of model.children ) {

          child.currentHex = child.material.emissive.getHex();
          child.material.emissive.setHex( 0xff0000 );
    
        }
      },

      onPointerOut: function() {
        for ( let child of model.children ) {

          child.material.emissive.setHex( 0 );

        }
      },

      onClick: function() {

        camera.position.setY( 100 );
        controls.target.copy( model.position );
        controls.update();
        console.log( model.name + ' clicked' );
        gui.controllers[ 0 ].setValue( model.name );
        gui.controllers[ 1 ].setValue( model.userData.building_phone_num );
        gui.controllers[ 2 ].setValue( model.userData.management_team );
        gui.controllers[ 3 ].setValue( model.userData.management_team_phone_num );
        gui.controllers[ 4 ].setValue( model.userData.id );
        // gui.open();

      }
    }
    
    createFont( model.position, model.name );
    buildings.push( model );
    scene.add( model );

    // subCategories Event Listener
    subCategories.forEach( ( subCategory ) => {

      const subId = subCategory.getAttribute( 'data-id' );
      if ( subId === model.userData.id ) {

        const target = model;

        // hover event
        subCategory.addEventListener( 'mouseover', () => {
          target.userData.onPointerOver();
        } );
        subCategory.addEventListener( 'mouseout', () => {
          target.userData.onPointerOut();
        } );

        // click event
        subCategory.addEventListener( 'click', ( e ) => {
      
          e.preventDefault();
          target.userData.onClick();
      
        } );

        }
    } );

  }, ( progress ) => {

    // console.log( progress.loaded / progress.total * 100 + "% loaded!" );

  }, ( error ) => {

    console.error( error );

  } );

}

/**
 * 건물 이름 표시를 위한 3D 폰트 생성 함수입니다.   
 * `position` 에 해당하는 위치에서 `THREE.Line` 과 `THREE.Mesh (text)` 을 갖는 `THREE.Group` 을 생성합니다.
 * @param { THREE.Vector3 } position position of the target model
 * @param { string } name name of the target building
 */
async function createFont( position, name ) {
  // Drawing Lines:
  const points = [];
  points.push( new THREE.Vector3( 0, 0, 0 ) );
  points.push( new THREE.Vector3( 25, 25, 25 ) ); // ( 50, 50, 50 ) );

  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints( points ),
    new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 5 } )
  );
  line.position.set( 0, 0, 0 );
  // line.material.depthTest = false; // for renderOrder

  // font loading function
  const loader = new FontLoader();
  await loader.load( './fonts/NanumSquareRound.json', function ( font ) {

    const material = new THREE.MeshBasicMaterial( {
      color: 0x000000,
      transparent: false,
      side: THREE.FrontSide,
    } );

    const message = name;
    const shapes = font.generateShapes( message, 5 ); // 10 );
    const geometry = new THREE.ShapeGeometry( shapes );

    // make shape ( N.B. edge view not visible )
    const text = new THREE.Mesh( geometry, material );
    text.position.set( 25, 25, 25 );// ( 50, 50, 50 );
    text.material.depthTest = false; // for renderOrder
    group.add( text );

  } ); //end load function

  // Create Group:
  const group = new THREE.Group();
  group.add( line );
  // group.add( plane );
  group.position.copy( position );
  fonts.push( group );
  group.renderOrder = 1; // renderOrder (z-index)
  group.name = name + ' Font';
  scene.add( group );

}

/**
 * `pointer` 에서 `camera` 가 바라보는 방향으로 `raycaster` 를 생성해 교차하는 아이템을 가져옵니다.   
 * 
 * `buildings[]` 에서 `raycaster` 와 교차하는 아이템을 확인하여 가장 앞에 있는 것을 `INTERSECTED`로 설정한 후 `onPointerOver()` 를 수행합니다.
 * 교차하는 아이템이 바뀌거나 사라졌을 때는 기존 아이템의 `onPointerOut()`를 수행합니다.
 */
function getIntersects() {

  raycaster.setFromCamera( pointer, camera );
  intersects = raycaster.intersectObjects( buildings, true );
  if ( intersects.length > 0 ) { 
    
    if ( INTERSECTED ) INTERSECTED.userData.onPointerOut();
    INTERSECTED = intersects[ 0 ].object.parent;
    INTERSECTED.userData.onPointerOver();
  
  } else { 
    
    if ( INTERSECTED ) INTERSECTED.userData.onPointerOut();
    INTERSECTED = undefined;
  
  }

}