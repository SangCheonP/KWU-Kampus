import * as URL from './url.js'
import * as roomPosition from './room-position.js'

const floorList = document.getElementById('floors');
const roomList = document.getElementById('rooms');
const roomNums = document.querySelectorAll('#detail .img-wrap .roomNum');
const roomNum = document.getElementsByClassName( 'roomNum' );

let rooms, prevElement, prevDesc, floors, building_code, prevRoomCode = "";
let bgUrl;
let imgBg;
let mapWidth, mapHeight, addPosition;
const whRatio = ( 768/1200 );
const hwRatio = ( 1200/768 );

init();

function init() {
    // sessionStorage 에서 클릭한 건물/시설 정보를 저장 및 불러옵니다.
    building_code = sessionStorage.getItem( "building_code" );
    if ( !building_code ) return;

    bgUrl = "../floor-img/" + building_code + "/";

    fetch(URL.detail + building_code, {
        method: "GET"
    })
    .then( res => res.json() )
    .then( res => {

      let classifiedFloors = classifyFloors( res );
      console.log(classifiedFloors);

      createFloors( classifiedFloors );

      // activate 1st floor as default
      let target_floor = '1';

      if ( sessionStorage.getItem( 'floor' ) ) {
          target_floor = sessionStorage.getItem( 'floor' );
          sessionStorage.removeItem( 'floor' );
      }

        // activateFloor의 두 번째 인자
        // 즉, floor의 시설 정보를 담고 있는 배열의 인덱스를 계산합니다.
      const floor = ( '00' + target_floor ).slice( -2 );

      classifiedFloors.forEach( ( c, i ) => {
            if ( c[0].floor == target_floor ) {
                activateFloor( document.getElementById( floor ), i, classifiedFloors );
                return false; // break
            }
      } );

//    sessionStorage.removeItem( 'building_code' );

    } )

    // createFloors( receivedFloorList );
    // setFloorBg( receivedBgUrl );

    imgBg = document.getElementsByClassName( 'imgBg' );

    window.addEventListener( 'resize', setFont );
    window.addEventListener('unload', () => sessionStorage.clear());
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
 * @param floorInfo classifiedFloors[i]
 */
function setFont( i, floorInfo ) {
    let building = floorInfo[0].building.replaceAll(' ', '');
    if ( building == '80주년기념관&광운스퀘어' ) building = '기념관';

    let positionArr = roomPosition.position[ building ][i];
    const recentRatio = ( imgBg[0].offsetHeight / imgBg[0].offsetWidth );
    let index, num = 0.0;

    // `div.imgBg`의 height 가 background 의 height 보다 더 큰 경우
    if ( recentRatio >= whRatio ) {
        mapWidth = imgBg[0].offsetWidth;
        mapHeight = mapWidth * whRatio;
        addPosition = (imgBg[0].offsetHeight - mapHeight) / 2;
    }
    // `div.imgBg`의 width 가 background 의 width 보다 더 큰 경우
    else {
        mapHeight = imgBg[0].offsetHeight;
        mapWidth = mapHeight * hwRatio;
        addPosition = (imgBg[0].offsetWidth - mapWidth) / 2;
    }

    for( var j = 0; j < floorInfo.length; j++ ) {
        index = Number( ( floorInfo[j].room_no ).slice( -2 ) );
        index--;

        if( index < 0 ) {
            roomNum[j].style.display = 'none';
            continue;
        }

        roomNum[j].style.width = ( mapWidth * 0.1 ) + 'px';
        roomNum[j].style.height = ( mapHeight * 0.05 ) + 'px';

        if ( recentRatio >= whRatio ) {
            roomNum[j].style.left = (mapWidth * positionArr[index][0]) + 'px';
            roomNum[j].style.top = (mapHeight * (positionArr[index][1] - num++ * 0.05) + addPosition) + 'px';
        } else {
            roomNum[j].style.left = ( mapWidth * positionArr[index][0] + addPosition ) + 'px';
            roomNum[j].style.top = ( mapHeight * (positionArr[index][1] - num++ * 0.05)) + 'px';
        }
    }
}

function activeRoom( targetCode ) {
    // rooms = floor.querySelectorAll( '#rooms li' );
    // rooms.forEach( ( room, idx ) => {
    //     room.addEventListener( 'click', () => {
    //
    //         if ( prevDesc ) { prevDesc.classList.remove( 'active' ); }
    //         const desc = roomNums[ idx ].querySelector( '.desc' );
    //         desc.classList.add( 'active' );
    //         prevDesc = desc;
    //
    //     })
    // });
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
/**
 * 07/07 수정 사항입니다.
 * 건물에 대한 정보 중 총 층(floor)수를 받아와서
 * detail_example.html에 Floor List를 구성하는 새 element 들을 생성하고,
 * 클릭 이벤트를 설정합니다.
 *
 * @param { Array } classifiedFloors
 * @result Create new elements under `ul#floors`
 */
function createFloors( classifiedFloors ) {

    for ( let i = 0; i < classifiedFloors.length; ++i ) {

        const liFloor = document.createElement( 'li' );
        const div = document.createElement( 'div' );
        const span = document.createElement( 'span' );

        div.className = 'text'; // div.text
        span.className = 'floor-title'; // span.floor-title
        span.innerText = `${classifiedFloors[i][0].floor}F`;

        div.appendChild( span ); // div > span
        liFloor.appendChild( div ); // li > div > span

        // const ul = document.createElement( 'ul' );
        // ul.setAttribute( 'id', 'rooms' ); // ul#rooms
        //
        // for ( let j = 0; j < classifiedFloors[i].length; j++ ) {
        //
        //     const liRoom = document.createElement( 'li' );
        //     liRoom.innerText = classifiedFloors[i][j].room_no;
        //     liRoom.setAttribute( 'id', classifiedFloors[i][j].room_code );
        //     ul.appendChild( liRoom ); // ul > li
        //
        // }

        liFloor.setAttribute( 'id', ( '00' + classifiedFloors[i][0].floor ).slice( -2 ) ); // set id to its floor number
        // liFloor.appendChild(ul); // li > div + ul
        floorList.appendChild( liFloor );

    }

    floors = document.querySelectorAll( '#floors>li' );
//    console.log( "Floors:\n", floors );
    floors.forEach( ( floor, i ) => {
        // 1층을 Default로 보여주기 위한 설정
        // if (i === 0) { activateFloor( floor, i, classifiedFloors ); }

        const floorTitle = floor.querySelector( '.floor-title' );
        floorTitle.addEventListener( 'click', ( e ) => {

            e.preventDefault();
            // 한 층만 표시하기 위해서 활성화되었던 element를 저장하고,
            // 다른 element 클릭 시 저장한 이전 element를 비활성화
            if ( prevDesc ) { prevDesc.classList.remove( 'active' ); }
            if ( prevElement ) { prevElement.classList.remove( 'active' ); }

            // Room List와 평면도를 초기화하고,
            // 선택한 층에 따라 표시되는 호수(방 번호) 변경
            roomList.innerHTML = '';
            imgBg[0].innerHTML = '';
            activateFloor( floor, i, classifiedFloors );

        } );

    } );

}

/**
 * `main#detail > div.img-wrap > div.imgBg` 의 background url을 `bgUrl`로 설정합니다.
 * @param { string } bgUrl url string of the background image
 */
function setFloorBg ( bgUrl = "" ) {

    const target = document.querySelector( '#detail .img-wrap .imgBg' );
    target.style.background = `url(${ bgUrl }) no-repeat center center / contain`;

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
function activateFloor ( floor, i, classifiedFloors ) {

    for ( let j = 0; j < classifiedFloors[i].length; j++ ) {

        // 시설 리스트 생성
        if( !classifiedFloors[i][j].time & !classifiedFloors[i][j].url & classifiedFloors[i][j].phone_num.length <= 7 )
            roomList.appendChild( listAddRoom( classifiedFloors[i][j] ) ); // ul > li
        else
            roomList.appendChild( listAddRoomAccordion( classifiedFloors[i][j] ) ); // ul > li

        // 평면도 상에 호수 글자 생성
        imgBg[0].appendChild( mapAddRoom( classifiedFloors[i][j] ) );
    }

    floor.classList.add( 'active' );

//     const fl = classifiedFloors[ i ];
//     roomNums.forEach( ( rn, j ) => {
//
//         rn.querySelector( 'span' ).innerText = fl[j].facilities;
//         rn.querySelector( '.desc p' ).innerText = `${ fl[ j ] } description`;
//
//     });
//
//     rooms = floor.querySelectorAll( '#rooms li' );
//     console.log( "activated rooms: \n", rooms );
//     rooms.forEach( ( room, idx ) => {
//         room.addEventListener( 'click', () => {
//             console.log("!");
//             // if ( prevDesc ) { prevDesc.classList.remove( 'active' ); }
//             // const desc = roomNums[ idx ].querySelector( '.desc' );
//             // desc.classList.add( 'active' );
//             // prevDesc = desc;
//
//         })
//     });

    prevElement = floor;

    bgUrl = '../floor-img/' + building_code + '/' + floor.id + '.png'
    setFloorBg( bgUrl );

    // 평면도 상에 호수 글자 위치 조절
    setFont( i, classifiedFloors[i] );
    window.addEventListener( 'resize', function(){ setFont( i, classifiedFloors[i] ) } );
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
    liRoom.innerText = roomInfo.room_no + ' ' + roomInfo.facilities;
    liRoom.setAttribute( 'id', roomInfo.room_code );

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
    accor_button.setAttribute( 'data-bs-target', '#info-' + roomInfo.room_code );
    accor_button.innerText = roomInfo.room_no + ' ' + roomInfo.facilities;
    accor_button.setAttribute( 'id', roomInfo.room_code );

    const accor_body = document.createElement( 'div' );
    accor_body.className = 'accordion-collapse collapse';
    accor_body.setAttribute( 'data-bs-parent', '#rooms' );
    accor_body.id = 'info-' + roomInfo.room_code;

    // 상세 정보 추가
    const accor_body_text = document.createElement( 'div' );
    accor_body_text.className = 'accordion-body';
    const content = document.createElement( 'div' );
    content.className = 'facility-detail';

    if ( roomInfo.time ) {
        var p = document.createElement( 'p' );
        p.innerText = '• 운영 시간: ' + roomInfo.time;
        content.appendChild( p );
    }
    if ( roomInfo.phone_num.length > 7 ) {
        var p = document.createElement( 'p' );
        p.innerText = '• 문의처: ' + roomInfo.phone_num;
        content.appendChild( p );
    }
    if ( roomInfo.url ) {
        var a = document.createElement( 'a' );
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

function mapAddRoom ( roomInfo ) {
    const div = document.createElement( 'div' );
    div.className = 'roomNum';
    const span = document.createElement( 'span' );
    span.innerText = roomInfo.room_no;
    div.appendChild( span ); // div > span

    return div;
}

/**
 * 한 건물의 분류되지 않은 방 정보 리스트를 받아와서 층 별로 분류하고,
 * 정보를 층 별로 분류하고, 방 번호를 오름차순으로 정렬하여 2차 Array 형태로 리턴합니다.
 *
 * `room_code`에 regular expression 을 적용해 검색하여 분류합니다.
 *
 * @param { Array } res raw data(floor list) received from server
 * @returns a classified floor list
 */
function classifyFloors( res ) {

    let classifiedFloors = [];
    let floors = res.map( room => room.floor );
    let uniqFloors = [... new Set(floors.sort(compareFloors))]; // remove duplicate and sort floors[]
    uniqFloors.forEach( ( floor ) => {

        let floorNum, regex;
        if ( /^B+/.test( floor ) ) {
            // if floor item starts with 'B'
            floorNum = ('00' + floor.substr(1, 1)).slice(-2);
            regex = new RegExp(`^1-${floorNum}+`);
        } else {
            floorNum = ('00' + floor).slice(-2);
            regex = new RegExp(`^0-${floorNum}+`);
        }

        const classifiedFloor = res.filter(data => regex.test(data.room_code));
        classifiedFloors.push(classifiedFloor.sort(function(a, b) { return a.room_no < b.room_no ? -1 : a.room_no > b.room_no ? 1 : 0; }));

    } )

    return classifiedFloors;
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