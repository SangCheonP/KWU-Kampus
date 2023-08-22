import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { MapControls } from 'three/addons/controls/MapControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import * as URL from './url.js'

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
// const mapContainer = document.querySelector( 'main' );
const mapContainer = document.getElementById('mapContainer');

///////////////////////////////
///// THREE.js from here: /////
///////////////////////////////

let width, height, camera, controls, scene, renderer, raycaster, headerHeight;
let textTitle, textContent, help_content, categoty_content, info_help, info_category;
let infoTag, infoPage, infoButton, infoClose;
let mapChange, mapState, map2D, map3D;
let container, options, map;

const pointer = new THREE.Vector2(); // mouse cursor position tracking
let intersects = []; // list to find which building is selected
let INTERSECTED = undefined; // stores which building is selected

const buildings = [];
const fonts = [];
// const arrows = [];

init();
noticeInit();
animate();

async function init() {

  // variables
  headerHeight = Number(getComputedStyle(document.documentElement).getPropertyValue('--header-height').slice(0, 2));
  width = window.innerWidth - 20;
  height = window.innerHeight - 20 - headerHeight;

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xcccccc );
//  scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

  raycaster = new THREE.Raycaster(); // for mouse(pointer) tracking

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( width, height );
  mapContainer.appendChild( renderer.domElement ); // where to append

  camera = new THREE.PerspectiveCamera( 60, width / height, 1, 1000 );// 1000 );
  camera.position.set( 300, 300, 0 ); // ( 400, 200, 0 );

  // controls

  controls = new MapControls( camera, renderer.domElement );

  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  controls.minDistance = 100;
  controls.maxDistance = 500;

  controls.maxPolarAngle = Math.PI / 2;

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

  const dirLight2 = new THREE.DirectionalLight( 0x222222 );
  dirLight2.position.set( -9, -12, -10 );
  dirLight2.name = 'dirLight2';
  scene.add( dirLight2 );

  const dirLight3 = new THREE.DirectionalLight( 0x666666 );
  dirLight3.position.set( 13, 12, -10 );
  dirLight3.name = 'dirLight3';
  scene.add( dirLight3 );

  const ambientLight = new THREE.AmbientLight( 0x666666 );
  ambientLight.name = 'ambientLight';
  scene.add( ambientLight );

  // Create Info Pannel
  textTitle = document.getElementsByClassName("infoTitle");
  textContent = document.getElementsByClassName("infoContent");

  info_category = new Array('시설명', '건물명', '층수', '호수', '기타 정보');

  info_help = new Array('KWU Kampus', '조작법');
  help_content = new Array('광운대학교 시설 정보 취합 사이트 \'KWU Kampus\'입니다. 건물 또는 카테고리를 클릭해 보세요. 해당 건물 및 시설에 대한 정보를 확인할 수 있습니다.',
                           '정보창: 해당 창의 우측 책갈피 클릭 //\n ' +
                           '카테고리 메뉴: 사이트의 우측 상단 버튼 클릭 //\n ' +
                           '지도 이동: 마우스 우 클릭 + 드래그 //\n ' +
                           '지도 회전: 마우스 좌 클릭 + 드래그 //\n ' +
                           '지도 확대/축소: 마우스 휠');
  categoty_content = new Array(5);

  infoTag = document.getElementById('infoTag');
  infoPage = document.getElementById('infoPage');
  infoButton = document.getElementsByClassName('infoButton');
  infoClose =  document.getElementById('infoClose');

  setInfo(info_help, help_content);
  infoTag.classList.toggle( 'on' );
  infoPage.classList.toggle( 'on' );

  map2D = mapChange = document.getElementById('map');
  // map3D = mapChange = document.getElementById('guiContainer');
  mapChange = document.getElementById('mapChange');
  mapState = '2D';

  // // Grid Helper
  // const gridHelper = new THREE.GridHelper( 1000, 100 );
  // scene.add( gridHelper );

  window.addEventListener( 'resize', onWindowResize );
  mapContainer.addEventListener( 'pointermove', onPointerMove );
  mapContainer.addEventListener( 'click', onClick );
  // window.addEventListener( 'dblclick', ( event ) => { // dev, 더블 클릭시 카메라의 위치에서 카메라 방향으로 
  //   let worldDirection = new THREE.Vector3;
  //   let worldPosition = new THREE.Vector3;
  //   const arrow = new THREE.ArrowHelper( camera.getWorldDirection( worldDirection ), camera.getWorldPosition( worldPosition ), 15, 0xff0000 );
  //   scene.add( arrow );
  //   console.log( worldDirection );
  //   console.log( worldPosition );
  // } );

  // GLTF Loader, load models

    const gltfLoader = new GLTFLoader();
    const datas = await fetch(URL.buildings, { method: "GET" })
                        .then(res => res.json())
                        .then(res => { return res; });
    datas.forEach(data => { createModel(gltfLoader, data); });

}

async function noticeInit() {

  const noticeDatas = await fetch(URL.notice, { method: 'GET' })
                            .then(res => res.json())
                            .then(res => { return res; });
  // console.log(noticeDatas);

  // Extract dept names and remove duplicates from raw data
  const depts = [];
  noticeDatas.forEach(data => { depts.push(data.dept); });

  const uniqDepts = [...new Set(depts)];
  console.log(uniqDepts);

  uniqDepts.forEach((dept, index) => {
    // get filtered data with unique dept names
    const filtered = noticeDatas.filter(data => data.dept === dept);
    createNoticeList(filtered, index);

  });

  // click events
  const noticeLis = document.querySelectorAll('li.notice-list');
  let activateIndex = 0;
  noticeLis.forEach((noticeLi, index) => {

    noticeLi.addEventListener('click', (e) => {

      e.preventDefault();
      let currentActiveNoticeLi = document.querySelector('li.notice-list.active');
      currentActiveNoticeLi.classList.remove('active');
      e.target.parentElement.classList.add('active');
      activateNotice(activateIndex, index);
      activateIndex = index;

    });

  });

}

// window events
/**
 * 브라우저 창 크기 변경에 따른 3d map 비율 및 렌더링 옵션을 변경합니다.
 * 브라우저 창의 너비, 높이 및 header 영역 높이에 의해 결정됩니다.
 */
function onWindowResize() {

  headerHeight = Number(getComputedStyle(document.documentElement).getPropertyValue('--header-height').slice(0, 2));
  width = window.innerWidth - 20;
  height = window.innerHeight - 20 - headerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize( width, height );
  
}

function onPointerMove( event ) {

  event.preventDefault();
  let gapX = event.clientX - event.offsetX;
  let gapY = event.clientY - event.offsetY;
//  pointer.set( ( event.clientX / width ) * 2 - 1, - ( event.clientY / height ) * 2 + 1 );
  pointer.set(((event.clientX - gapX) / width) * 2 - 1, - ((event.clientY - gapY) / height) * 2 + 1)
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
 * 카테고리 클릭 시 인포 창에 관련 정보를 세팅합니다.
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

    setCategoryInfo( info_category, categoty_content );
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

    const facilities = await fetch( URL.importance + data.building_code )
                              .then( res => res.json() )
                              .then( datas => {

                               let result = [];
                               datas.forEach( ( data ) => { result.push( data ); } );
                               return result;

                              });

    model.userData = {

      id: data.building_code,
      building_phone_num: data.building_phone_num,
      management_team: data.management_team,
      management_team_phone_num: data.management_team_phone_num,
      importance_rooms: facilities,
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

        controls.target.copy( model.position );
        controls.update();
        console.log( model.name + ' clicked' );
        
        // 빌딩 클릭 시 배열에 관련 정보 세팅
        setBuildingInfo(model);

        sessionStorage.setItem( 'building_code', model.userData.id );

        // 임시
        categoty_content[1] = model.name;
      }

    }

    // removing spaces from the model.name as this font does not support spaces.
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

          setCategoryInfo( info_category, categoty_content );
      
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
 * 정보창에 새로운 값을 업데이트하기 전, 초기화합니다.
 * @param len 정보창에 들어갈 내용 개수
 */
function clearInfo( len = 0 ) {

  for( var i = 0; i < len; i++ ) {
    textTitle[i].textContent = '';
    textContent[i].textContent = '';

    textTitle[i].style.display = 'block';
    textContent[i].style.display = 'block';
  }

  for( var i = len; i < textTitle.length; i++ ) {
    textTitle[i].style.display = 'none';
    textContent[i].style.display = 'none';
  }
}

/**
 * 정보 요약창을 생성합니다.
 * @param title_arr: 정보 항목
 * @param content_arr: 항목별 내용
 */
function setInfo( title_arr, content_arr ) {
  clearInfo( title_arr.length );

  for( var i = 0; i < title_arr.length; i++ ) {
    textTitle[i].textContent = title_arr[i];
    textContent[i].textContent = content_arr[i];
  }

  infoButton[0].textContent = '만족도 조사 하기';
  infoButton[0].setAttribute( "onclick", "window.open('https://forms.gle/dMwa7nym85tTc79x5')" );
}

/**
 * 카테고리 클릭 시 정보창을 업데이트합니다.
 * @param title_arr: 정보 항목
 * @param content_arr: 항목별 내용
 */
function setCategoryInfo( title_arr, content_arr ) {
  clearInfo( title_arr.length );

  for( var i = 0; i < title_arr.length; i++ ) {
    textTitle[i].textContent = title_arr[i];
    textContent[i].textContent = content_arr[i];
  }

  infoButton[0].textContent = '상세 정보 보기';
  infoButton[0].setAttribute( "onclick", "location.href='/detail'" );
}

/**
 * 건물 클릭 시 정보창을 업데이트합니다.
 * @param model cliked building
 */
function setBuildingInfo( model ) {
  clearInfo(2);

  textTitle[0].innerText = "건물명";
  textContent[0].innerText = model.name;;

  textTitle[1].innerText = "주요 시설";
  model.userData.importance_rooms.forEach( ( data ) => {
    const p = document.createElement( 'p' );
    p.innerText = data.facilities;
    textContent[1].appendChild( p );
  } )

  infoButton[0].textContent = '상세 정보 보기';
  infoButton[0].setAttribute( "onclick", "location.href='/detail'" );

}

/**
 * info Open
 */
infoTag.addEventListener( 'click', function() {
  setInfo(info_help, help_content);

  infoTag.classList.toggle( 'on' );
  infoPage.classList.toggle( 'on' );
});
/**
 * info Close
 */
infoClose.addEventListener( 'click', function() {
  infoPage.classList.remove( 'on' );
  infoTag.classList.remove( 'on' );
});

/**
 * 각 단과대별로 필터링 된 배열을 ul element로 생성합니다.
 * @param {Array} filtered an array of filtered notices
 * @param {Number} index an index number to set default element as active
 */
function createNoticeList(filtered, index) {

  const header = document.querySelector('ul.notice-header-wrap');
  const list = document.querySelector('div.notice-list-wrap');
  const li = document.createElement('li');
  const h3 = document.createElement('h3');

  li.className = 'notice-list';
  if (index === 0) { li.classList.add('active'); } // Set First Element as active
  h3.innerText = filtered[0].dept;
  li.append(h3);
  header.append(li);

  const ul = document.createElement('ul');
  ul.className = 'notices';
  if (index === 0) { ul.classList.add('active'); }

  filtered.forEach(item => {

    const noticesLi = document.createElement('li');
    const a = document.createElement('a');
    const span = document.createElement('span');

    a.href = item.site;
    a.innerText = item.notice;
    span.innerText = item.date;

    noticesLi.append(a);
    noticesLi.append(span);
    ul.append(noticesLi);

  });

  list.append(ul);

}
/**
 * 단과대 별 공지사항들의 내용이 담긴 ul element들 중 `last`를 비활성화하고, `current`를 활성화합니다.
 * @param {Number} last an index of activated noticeUl
 * @param {Number} current the target index of noticeUl to activate
 */
function activateNotice(last, current) {

  const noticesUls = document.querySelectorAll('ul.notices');
  noticesUls[last].classList.remove('active');
  noticesUls[current].classList.add('active');

}

/**
 * 버튼 클릭 시, 2D <-> 3D 지도를 전환합니다.
 * 2D 지도를 보일 땐 카카오맵을 로드하고,
 * 3D 지도를 보일 땐 카카오맵의 display 값을 none으로 설정합니다.
 */
// mapChange.addEventListener( 'click', function() {
//
//   if( mapState == '2D' ) {
//     map2D.style.display = 'block';
//     // map3D.style.display = 'none';
//     load2Dmap();
//     mapState = '3D';
//   }
//   else if ( mapState == '3D' ) {
//     // animate();
//     map2D.style.display = 'none';
//     // map3D.style.display = 'block';
//     mapState = '2D';
//   }
// });

/**
 * 카카오맵을 load 하기 위해 값을 설정합니다.
 */
// function load2Dmap() {
//   container = document.getElementById( 'map' ); //지도를 담을 영역의 DOM 레퍼런스
//   options = { //지도를 생성할 때 필요한 기본 옵션
//     center: new kakao.maps.LatLng( 33.450701, 126.570667 ), //지도의 중심좌표.
//     level: 3 //지도의 레벨(확대, 축소 정도)
//   };
//
//   map = new kakao.maps.Map( container, options ); //지도 생성 및 객체 리턴
// }