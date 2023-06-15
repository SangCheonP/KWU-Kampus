import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { MapControls } from 'three/addons/controls/MapControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

// basic javascripts

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

let width, height, camera, controls, scene, renderer, raycaster;
let textTitle, textContent, help_content, building_content, categoty_content, info_help, info_building, info_category;
let infoTag, infoPage, infoButton;

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
  fetch( "http://13.124.194.184:8080/buildings/info", {
    method: "GET"
  } )
  .then( res => res.json() )
  .then( res => {

    const datas = res;
    console.log( datas );
    datas.forEach( ( data ) => {
      createModel( gltfLoader, data );
    } );

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

  // Create Info Pannel
  textTitle = document.getElementsByClassName("infoTitle");
  textContent = document.getElementsByClassName("infoContent");

  info_building = new Array('건물명', '전화번호', '시설관리팀', '시설관리팀 전화번호', '기타 정보');
  info_category = new Array('시설명', '건물명', '층수', '호수', '기타 정보');

  info_help = new Array('※ 화면 크기를 변경하면서 지도 로딩이 덜 되었다면 화면 새로고침을 해주세요.', '※ 완성본이 아닌, 기능만 확인할 수 있는 버전입니다.', 'KWU Kampus', '조작법');
  help_content = new Array('', '모든 정보가 채워진 상태가 아니며, 상세 정보는 \'새빛관\'만 확인하실 수 있습니다.',
                                 '광운대학교 시설 정보 취합 사이트 \'KWU Kampus\'입니다. 건물 또는 카테고리를 클릭해 보세요. 해당 건물 및 시설에 대한 정보를 확인할 수 있습니다.',
                                 '정보창: 해당 창의 우측 책갈피 클릭 // ' +
                                  '카테고리 메뉴: 사이트의 우측 상단 버튼 클릭 // ' +
                                  '지도 이동: 마우스 우 클릭 + 드래그 // ' +
                                  '지도 회전: 마우스 좌 클릭 + 드래그 // ' +
                                  '지도 확대/축소: 마우스 휠');
  building_content = new Array(5);
  categoty_content = new Array(5);

  infoTag = document.getElementById('infoTag');
  infoPage = document.getElementById('infoPage');
  infoButton = document.getElementsByClassName('infoButton');

  setInfo(info_help, help_content);
  infoButton[0].textContent = '만족도 조사 하기';
  infoButton[0].setAttribute("onclick", "window.open('https://forms.gle/dMwa7nym85tTc79x5')");

  infoPage.classList.remove('on');
  infoTag.classList.remove('on');

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
 * 카테고리 클릭 시 배열에 관련 정보 세팅
 */
subCategories.forEach( ( subCategory ) => {
  subCategory.addEventListener( 'click', function() {
    // 00-0000-0: 건물번호-호실-추가번호
    var c_id = this.getAttribute('category-id');
    categoty_content[0] = this.text;
    // categoty_content[1] = c_id;
    // 하단 수정 필요
    categoty_content[2] = '';
    categoty_content[3] = '';
    categoty_content[4] = '';
    // categoty_content[2] = c_id.substr(0, 2);
    // categoty_content[3] = c_id.substr(3, 4);
    // categoty_content[4] = c_id.substr(8, 1);

    setInfo(info_category, categoty_content);
  });
});

/**
 * 건물의 모델링을 불러와 `scene`에 추가하고, `buildings` 리스트에 저장 및 `subCategories`의 이벤트 리스너를 설정합니다.
 * 
 * `loader` 를 사용해 `building.modelPath` 에 있는 모델을 불러옵니다.   
 * 모델의 위치, 회전시킬 각도, 크기 조정을 위한 스케일을 설정하여 `scene` 및 `buildings` 리스트에 추가하고, `createFont()` 에 `position` 을 전달합니다.
 * @param { GLTFLoader } loader `GLTFLoader` used in this file.
 * @param { object } data Item stored in `receivedData` list, an object containing informations of each buildings.
 */
function createModel ( loader, data ) {

  if ( !data.model_path ) { console.error( 'model_path not found' ); }
  loader.load( data.model_path, async ( gltf ) => {

    const model = await gltf.scene;
    if ( !model ) {
      // error handling
    }
    model.name = data.building;
    model.position.set( data.position_x, data.position_y, data.position_z );
    model.rotateY( Math.PI / 180 * data.angle );
    model.scale.setScalar( data.scale );

    model.userData = {
      // isActive: false, // not used
      id: data.building_code,
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

//        camera.position.setY( 100 );
        controls.target.copy( model.position );
        controls.update();
        console.log( model.name + ' clicked' );
        
        // 빌딩 클릭 시 배열에 관련 정보 세팅
        building_content[0] = model.name;
        building_content[1] = model.userData.building_phone_num;
        building_content[2] = model.userData.management_team;
        building_content[3] = model.userData.management_team_phone_num;
        building_content[4] = '';

        setInfo(info_building, building_content);

        // 임시 코드
        categoty_content[1] = model.name;
      }
    }
    
    createFont( model.position, model.name.replace( /\s+/g, '' ) );
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

          setInfo(info_category, categoty_content);
      
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

/**
 * 정보 요약창 생성
 * title_arr: 정보 항목
 * content_arr: 항목별 내용
 */

function setInfo(title_arr, content_arr) {
  // 초기화
  for(var i = 0; i < textTitle.length; i++) {
    textTitle[i].style.display = 'none';
    textContent[i].style.display = 'none';
  }

  for(var i = 0; i < title_arr.length; i++) {
    textTitle[i].style.display = 'block';
    textContent[i].style.display = 'block';

    textTitle[i].textContent = title_arr[i];
    textContent[i].textContent = content_arr[i];
  }

  if(!infoPage.classList.contains('on')) {
    infoPage.classList.toggle('on');
    infoTag.classList.toggle('on');
  }

  infoButton[0].textContent = '상세 정보 보기';
  infoButton[0].setAttribute("onclick", "location.href='/detail'");

  if(content_arr[0]=='새빛관') {
    textContent[4].textContent='주요 시설: 코딩컨설팅룸, 소융대 교학팀/학사, 소융대 학과 학생회실, 소융대 대학원 연구실 등';
  }
}

infoTag.addEventListener('click', function() {
  if(!infoPage.classList.contains('on')) {
    setInfo(info_help, help_content);
    infoButton[0].textContent = '만족도 조사 하기';
    infoButton[0].setAttribute("onclick", "window.open('https://forms.gle/dMwa7nym85tTc79x5')");
  }
  else {
    infoPage.classList.remove('on');
    infoTag.classList.remove('on');
  }
});
