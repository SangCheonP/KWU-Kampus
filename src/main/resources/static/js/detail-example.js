import * as URL from './url.js'
import { floorNum, roomPosition } from "./room-position.js"

let classifiedFloors = [];

let prevElement, prevRoom, building_code, building_name = "";
let mapWidth, mapHeight, addPosition;
const whRatio = ( 768/1200 );
const hwRatio = ( 1200/768 );

let wait = true;
let floors;

init();

function init() {

    // sessionStorage 에서 클릭한 건물/시설 정보를 저장 및 불러옵니다.
    building_code = sessionStorage.getItem( "building_code" );
    if ( !building_code ) return;

    building_name = sessionStorage.getItem( "building_name" );
    let inner = document.getElementsByClassName( 'inner' )[0];
    const detail_title = document.createElement( 'div' );
    detail_title.className = 'detail-title';
    detail_title.innerText = building_name;
    inner.appendChild( detail_title );

    fetch(URL.detail + building_code, {
        method: "GET"
    })
        .then( res => res.json() )
        .then( res => {

            classifyFloors( res );
            createFloors();

            // activate 1st floor as default
            let target_floor = '01';
            if ( sessionStorage.getItem( 'floor' ) ) {
                target_floor = sessionStorage.getItem( 'floor' );
                target_floor = ( '00' + target_floor ).slice( -2 );
                sessionStorage.removeItem( 'floor' );
            }

            activateFloor( target_floor );
            floors = document.querySelectorAll( '.floor-title' );
            waitingClickFloor();

        } )

}

/**
 * 한 건물의 분류되지 않은 방 정보 리스트를 받아와서 층 별로 분류하고,
 * 정보를 층 별로 분류하고, 방 번호를 오름차순으로 정렬하여 2차 Array 형태로 리턴합니다.
 *
 * `room_code`에 regular expression 을 적용해 검색하여 분류합니다.
 *
 * @param { Array } res raw data(floor list) received from server
 */
function classifyFloors( res ) {

    let floors = res.map( room => room.floor );
    let uniqFloors = [... new Set(floors.sort(compareFloors))]; // remove duplicate and sort floors[]
    uniqFloors.forEach( floor  => {

        let floorNum, regex;
        if ( /^B+/.test( floor ) ) {
            // if floor item starts with 'B'
            floorNum = ('00' + floor.substr(1, 1)).slice(-2);
            regex = new RegExp(`^1-${floorNum}+`);
        } else {
            floorNum = ('00' + floor).slice(-2);
            regex = new RegExp(`^0-${floorNum}+`);
        }

        const classifiedFloor = res.filter(data => regex.test(data['room_code']));
        classifiedFloors.push(classifiedFloor.sort(function(a, b) { return a['room_no'] < b['room_no'] ? -1 : a['room_no'] > b['room_no'] ? 1 : 0; }));

    } )

}

/**
 * 건물 층 값인 문자열(B1, 10, 1, ...) 정렬을 위한 함수입니다.
 * 문자열이 "B"(대문자)로 시작하면, B를 "-"로 바꾸어 비교합니다.
 *
 * @param {String} a a value of floor to compare
 * @param {String} b a value of floor to compare
 * @returns Compared Result for sort() function.
 */
function compareFloors(a, b) {

    let _a, _b;
    if (a.startsWith("B")) { _a = a.replace("B", "-") } else { _a = a }
    if (b.startsWith("B")) { _b = b.replace("B", "-") } else { _b = b }
    return _a - _b;

}

/**
 * 건물에 대한 정보 중 총 층(floor)수를 받아와서
 * detail_example.html에 Floor List를 구성하는 새 element 들을 생성하고,
 * 클릭 이벤트를 설정합니다.
 */
function createFloors() {

    const floorList = document.getElementById('floors');
    classifiedFloors.forEach( floor => {

        let target_floor = floor[0].floor;

        const liFloor = document.createElement( 'li' );
        const div = document.createElement( 'div' );
        const span = document.createElement( 'span' );

        div.className = 'text'; // div.text
        span.className = 'floor-title'; // span.floor-title
        span.innerText = `${target_floor}F`;
        liFloor.setAttribute( 'id', ( '00' + target_floor ).slice( -2 ) ); // set id to its floor number

        div.appendChild( span ); // div > span
        liFloor.appendChild( div ); // li > div > span
        floorList.appendChild( liFloor );

    });

}

function waitingClickFloor() {
    floors.forEach( ( floor, i ) => {

        floor.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            activateFloor (( '00' + classifiedFloors[i][0].floor ).slice( -2 ));

        } );

    } );

}

/**
 * `ul#floors` element 아래의 `li` element 들 중에서, i 번째 요소를 활성화합니다.
 *
 * 활성화는 다음과 같은 작업을 포함합니다.
 *
 * * `roomNums` 요소 내의 `span`(방 번호)과 `.desc p`(해당 방 설명)의 innerText 변경
 * * `rooms` 에 클릭 이벤트 설정
 * * `prevElement`에 현재 선택된 `floor` 저장
 * @param { Element } floor `li` element in floors list
 * @param { number } i index value of the element
 */
function activateFloor ( target_floor ) {

    let active_floor = document.getElementById( target_floor );
    if ( prevElement ) { prevElement.classList.remove( 'active' ); }
    prevElement = active_floor;
    active_floor.classList.add( 'active' );

    if ( prevRoom ) { prevRoom.classList.remove( 'active' ); }
    prevRoom = "";

    setFloorBg( `../floor-img/${building_code}/${target_floor}.png` );

    let roomList = document.getElementById( 'rooms' );
    let imgBg = document.getElementsByClassName( 'imgBg' )[0];
    roomList.innerHTML = '';
    imgBg.innerHTML = '';

    let active_index = floorNum[building_code].findIndex( i => i == target_floor );
    let room_infos = classifiedFloors[active_index];
    room_infos.forEach( roomInfo => {

        // 시설 리스트 생성
        if( !roomInfo.time & !roomInfo.url & !roomInfo['phone_num'])
            roomList.appendChild( listAddRoom( roomInfo ) ); // ul > li
        else
            roomList.appendChild( listAddRoomAccordion( roomInfo ) ); // ul > li

        // 평면도 상에 호수 글자 생성
        imgBg.appendChild( mapAddRoom( roomInfo ) );

    })

    setFont( active_index );

    window.addEventListener( 'resize', function(){ setFont( active_index ); } );
    waitingClickRoom();

}

/**
 * `main#detail > div.img-wrap > div.imgBg` 의 background url을 `bgUrl`로 설정합니다.
 * @param { string } bgUrl url string of the background image
 */
function setFloorBg ( bgUrl = "" ) {

    const target = document.querySelector( '#detail .img-wrap .imgBg' );
    target.style.background = `url(${ bgUrl }) no-repeat center center / contain`;

}

function mapAddRoom ( roomInfo ) {
    const div = document.createElement( 'div' );
    div.className = 'roomNum';
    const span = document.createElement( 'span' );
    span.innerText = roomInfo['room_no'];
    div.appendChild( span ); // div > span

    return div;
}

/**
 * 윈도우 창 크기 조절하는 것에 따라 평면도 위 표기되는 폰트 (호수)의 크기 및 위치를 조정합니다.
 *
 * `main#detail > div.img-wrap > div.imgBg` 의 현재 width (또는 height) 를 구하고,
 * 평면도 비율을 이용하여 현재 height (또는 width) 를 도출합니다.
 *
 * 현재 평면도의 width, height 값에 맞춰 폰트 (호수)의 크기 및 위치를 조정합니다.
 *
 * @param { number } i current floor
 */
function setFont( active_index ) {

    let imgBg = document.getElementsByClassName( 'imgBg' )[0];
    const recentRatio = ( imgBg.offsetHeight / imgBg.offsetWidth );

    // `div.imgBg`의 height 가 background 의 height 보다 더 큰 경우
    if ( recentRatio >= whRatio ) {
        mapWidth = imgBg.offsetWidth;
        mapHeight = mapWidth * whRatio;
        addPosition = (imgBg.offsetHeight - mapHeight) / 2;
    }
    // `div.imgBg`의 width 가 background 의 width 보다 더 큰 경우
    else {
        mapHeight = imgBg.offsetHeight;
        mapWidth = mapHeight * hwRatio;
        addPosition = (imgBg.offsetWidth - mapWidth) / 2;
    }

    let index, num = 0.0;
    let room_infos = classifiedFloors[ active_index ];
    let positionArr = roomPosition[ building_code ][ active_index ];
    let roomNum = document.getElementsByClassName( 'roomNum' );
    room_infos.forEach( ( room, idx ) => {
        index = Number( room['room_no'].slice( -2 ) );
        index--;

        if( index < 0 ) {
            roomNum[idx].style.display = 'none';
        }
        else {
            roomNum[idx].style.display = 'block';
            roomNum[idx].style.width = (mapWidth * 0.1) + 'px';
            roomNum[idx].style.height = (mapHeight * 0.05) + 'px';

            if (recentRatio >= whRatio) {
                roomNum[idx].style.left = (mapWidth * positionArr[index][0]) + 'px';
                roomNum[idx].style.top = (mapHeight * (positionArr[index][1] - num++ * 0.05) + addPosition) + 'px';
            } else {
                roomNum[idx].style.left = (mapWidth * positionArr[index][0] + addPosition) + 'px';
                roomNum[idx].style.top = (mapHeight * (positionArr[index][1] - num++ * 0.05)) + 'px';
            }
        }
    })
}

/**
 * 건물에 대한 정보 중 총 층(floor)수와 호(room)수를 받아와서
 * detail_example.html에 Floor List를 구성하는 새 element 들을 생성하고,
 * 클릭 이벤트를 설정합니다.
 *
 * @param { number } floorCount the integer number of floors
 * @param { number } roomCount the integer number of rooms in each floors
 * @result Create new elements under `ul#floors`
 */


function waitingClickRoom() {

    let rooms = document.querySelectorAll( '#rooms>li' );
    let roomNum= document.getElementsByClassName( 'roomNum' );
    rooms.forEach( ( room, idx ) => {

        room.addEventListener( 'click', () => {
            if ( prevRoom ) { prevRoom.classList.remove( 'active' ); }
            const span = roomNum[ idx ].querySelector( 'span' );
            span.classList.add( 'active' );
            prevRoom = span;
            return false;
        })

    });

}

/**
 * i 층의 호(room)수를 받아와서
 * detail_example.html에 Room List를 구성하는 새 element 를 생성합니다.
 * 별도의 정보가 필요없는 시설이므로, `li`(시설명) element 만 생성합니다.
 *
 * @param roomInfo classifiedFloors[i][j]
 * @returns {HTMLLIElement} `li` element in rooms list
 */
function listAddRoom( roomInfo ) {

    const liRoom = document.createElement( 'li' );
    liRoom.className = 'list-group-item';
    liRoom.innerText = roomInfo['room_no'] + ' ' + roomInfo['facilities'];
    liRoom.setAttribute( 'id', roomInfo['room_code'] );

    return liRoom;
}

/**
 * i 층의 호(room)수를 받아와서
 * detail_example.html에 Room List를 구성하는 새 element 를 생성합니다.
 * 별도의 정보가 필요한 시설이므로, `button`(시설명) 과 `div`(시설정보) 가 담긴 `li` element 를 생성합니다.
 *
 * @param roomInfo classifiedFloors[i][j]
 * @returns {HTMLLIElement} `li` element in rooms list
 */
function listAddRoomAccordion( roomInfo ) {

    // 정보를 담을 기본 틀 생성
    const accor_liRoom = document.createElement( 'li' );
    accor_liRoom.className = 'accordion-item';

    const accor_button = document.createElement( 'button' );
    accor_button.className = 'accordion-button collapsed';
    accor_button.type = 'button';
    accor_button.setAttribute( 'data-bs-toggle', 'collapse' );
    accor_button.setAttribute( 'data-bs-target', '#info-' + roomInfo['room_code'] );
    accor_button.innerText = roomInfo['room_no'] + ' ' + roomInfo['facilities'];
    accor_button.setAttribute( 'id', roomInfo['room_code'] );

    const accor_body = document.createElement( 'div' );
    accor_body.className = 'accordion-collapse collapse';
    accor_body.setAttribute( 'data-bs-parent', '#rooms' );
    accor_body.id = 'info-' + roomInfo['room_code'];

    // 상세 정보 추가
    const accor_body_text = document.createElement( 'div' );
    accor_body_text.className = 'accordion-body';
    const content = document.createElement( 'div' );
    content.className = 'facility-detail';

    if ( roomInfo.time ) {
        let p = document.createElement( 'p' );
        p.innerText = '• 운영 시간: ' + roomInfo.time;
        content.appendChild( p );
    }
    if ( roomInfo['phone_num'] ) {
        let p = document.createElement( 'p' );
        p.innerText = '• 문의처: ' + roomInfo['phone_num'];
        content.appendChild( p );
    }
    if ( roomInfo.url ) {
        let a = document.createElement( 'a' );
        a.setAttribute('target', '_blank')
        a.innerText = '>> 홈페이지 (클릭)';
        a.setAttribute('href', roomInfo.url)
        content.appendChild( a );
    }

    accor_liRoom.appendChild( accor_button ); // li > button
    accor_body_text.appendChild( content ); // div > div
    accor_body.appendChild( accor_body_text ); // div > div
    accor_liRoom.appendChild( accor_body ); // li > button + div

    return accor_liRoom;

}