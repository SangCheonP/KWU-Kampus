import * as URL from './url.js'

const floorList = document.getElementById('floors');
const roomList = document.getElementById('rooms');
const roomNums = document.querySelectorAll('#detail .img-wrap .roomNum');

const f1 = [
    {
        building: "새빛관",
        building_code: "08",
        building_phone_num: null,
        floor: "1F",
        room_no: 101,
        room_code: "0-0101-0",
        facilities: "대강의실",
        category: null,
        importance: false
    },
    {
        building: "새빛관",
        building_code: "08",
        building_phone_num: null,
        floor: "1F",
        room_no: 102,
        room_code: "0-0102-0",
        facilities: "계단강의실",
        category: null,
        importance: false
    },
    {
        building: "새빛관",
        building_code: "08",
        building_phone_num: null,
        floor: "1F",
        room_no: 103,
        room_code: "0-0103-0",
        facilities: "정보융합부 실습실2",
        category: null,
        importance: false
    },
    {
        building: "새빛관",
        building_code: "08",
        building_phone_num: null,
        floor: "1F",
        room_no: 104,
        room_code: "0-0104-0",
        facilities: "정보융합부 실습실1",
        category: null,
        importance: false
    },
    {
        building: "새빛관",
        building_code: "08",
        building_phone_num: null,
        floor: "1F",
        room_no: 105,
        room_code: "0-0105-0",
        facilities: "코딩컨설팅룸",
        category: null,
        importance: false
    },
];
const f2 = [
    {
        building: "새빛관",
        building_code: "08",
        building_phone_num: null,
        floor: "2F",
        room_no: "202",
        room_code: "0-0202-0",
        facilities: "강의실",
        category: null,
        importance: false
    },
    {
        building: "새빛관",
        building_code: "08",
        building_phone_num: null,
        floor: "2F",
        room_no: "203",
        room_code: "0-0203-0",
        facilities: "강의실",
        category: null,
        importance: false
    },
    {
        building: "새빛관",
        building_code: "08",
        building_phone_num: null,
        floor: "2F",
        room_no: "204",
        room_code: "0-0204-0",
        facilities: "강의실",
        category: null,
        importance: false
    },
    {
        building: "새빛관",
        building_code: "08",
        building_phone_num: null,
        floor: "2F",
        room_no: "205",
        room_code: "0-0205-0",
        facilities: "강의실",
        category: null,
        importance: false
    },
    {
        building: "새빛관",
        building_code: "08",
        building_phone_num: null,
        floor: "2F",
        room_no: "206",
        room_code: "0-0206-0",
        facilities: "강의실",
        category: null,
        importance: false
    },
    {
        building: "새빛관",
        building_code: "08",
        building_phone_num: null,
        floor: "2F",
        room_no: "207",
        room_code: "0-0207-0",
        facilities: "회의실",
        category: null,
        importance: false
    }
];

const receivedFloorList = [
    f1,
    f2
];

let rooms, prevElement, prevDesc, floors, building_code;
let bgUrl;
let imgBg;

init();

function init() {
    // sessionStorage 에서 클릭한 건물/시설 정보를 저장 및 불러옵니다.
//    sessionStorage.setItem( 'floor', 'B2' );
//    sessionStorage.setItem( 'building_code', "08" );
    building_code = sessionStorage.getItem( "building_code" );
    if ( !building_code ) return;

    bgUrl = "../floor-img/" + building_code + "/";

    fetch( URL.detail + building_code, {
        method: "GET"
    } )
        .then( res => res.json() )
        .then( res => {

            let classifiedList = classifyList( res );
            console.log(classifiedList);
            // console.log( classifiedList );
            createFloors( classifiedList );
            if ( sessionStorage.getItem( 'floor' ) ) {

                const floor = ( '00' + sessionStorage.getItem( 'floor' ) ).slice( -2 );
                activateFloor( document.getElementById( floor ), 0, classifiedList );
                sessionStorage.removeItem( 'floor' );

            } else {
                // activate 1st floor as default
                activateFloor( document.getElementById( '01' ), 0, classifiedList );

            }

            sessionStorage.removeItem( 'building_code' );

        } )

    // createFloors( receivedFloorList );
    // setFloorBg( receivedBgUrl );

    imgBg = document.getElementsByClassName( 'imgBg' );

    window.addEventListener( 'resize', setFont );

}

/**
 * 윈도우 창 크기 조절하는 것에 따라 평면도 위 표기되는 폰트 (호수)의 크기 및 위치를 조정합니다.
 *
 * `div.imgBg` background (평면도) 의 width, height 를 구하는 방법을 아직 찾지 못해,
 * 임의로 `main#detail > div.img-wrap > div.imgBg` 의 현재 width (또는 height) 를 구하고,
 * 평면도 비율을 이용하여 현재 height (또는 width) 를 도출합니다.
 *
 * 현재 평면도의 width, height 값에 맞춰 폰트 (호수)의 크기 및 위치를 조정합니다.
 *
 */
function setFont() {
    const roomNum = document.getElementsByClassName( 'roomNum' );

    const whRatio = ( 768/1200 );
    const hwRatio = ( 1200/768 );
    const recentRatio = ( imgBg[0].offsetHeight / imgBg[0].offsetWidth );

    let mapWidth, mapHeight, addHeight, addWidth;
    let spanWidth, spanHeight;

    // 새빛관 1층 기준, 임시 위치 배열
    let arr = [ [0.75, 0.3], [0.8, 0.7], [0.58, 0.68], [0.12, 0.63], [0.12, 0.3] ];

    // `div.imgBg`의 height 가 background 의 height 보다 더 큰 경우
    if ( recentRatio >= whRatio ) {
        mapWidth = imgBg[0].offsetWidth;
        mapHeight = mapWidth * whRatio;

        addHeight = ( imgBg[0].offsetHeight - mapHeight ) / 2;

        spanWidth = ( mapWidth * 0.1 );
        spanHeight = ( mapHeight * 0.05 );

        for( var i = 0; i < arr.length; i++ ) {
            roomNum[i].style.width = spanWidth + 'px';
            roomNum[i].style.height = spanHeight + 'px';
            roomNum[i].style.left = (mapWidth * arr[i][0]) + 'px';
            roomNum[i].style.top = (mapHeight * arr[i][1] + addHeight) + 'px';
        }

    }
    // `div.imgBg`의 width 가 background 의 width 보다 더 큰 경우
    else {
        mapHeight = imgBg[0].offsetHeight;
        mapWidth = mapHeight * hwRatio;

        addWidth = ( imgBg[0].offsetWidth - mapWidth ) / 2;

        spanWidth = ( mapWidth * 0.1 );
        spanHeight = ( mapHeight * 0.05 );

        for( var i = 0; i < arr.length; i++ ) {
            roomNum[i].style.width = spanWidth + 'px';
            roomNum[i].style.height = spanHeight + 'px';
            roomNum[i].style.left = (mapWidth * arr[i][0] + addWidth) + 'px';
            roomNum[i].style.top = (mapHeight * arr[i][1]) + 'px';
        }
    }

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
 * @param { Array } classifiedList
 * @result Create new elements under `ul#floors`
 */
function createFloors( classifiedList ) {

    for ( let i = 0; i < classifiedList.length; ++i ) {

        const liFloor = document.createElement( 'li' );
        const div = document.createElement( 'div' );
        const span = document.createElement( 'span' );

        div.className = 'text'; // div.text
        span.className = 'floor-title'; // span.floor-title
        span.innerText = `${classifiedList[i][0].floor}F`;

        div.appendChild( span ); // div > span
        liFloor.appendChild( div ); // li > div > span

        // const ul = document.createElement( 'ul' );
        // ul.setAttribute( 'id', 'rooms' ); // ul#rooms
        //
        // for ( let j = 0; j < classifiedList[i].length; j++ ) {
        //
        //     const liRoom = document.createElement( 'li' );
        //     liRoom.innerText = classifiedList[i][j].room_no;
        //     liRoom.setAttribute( 'id', classifiedList[i][j].room_code );
        //     ul.appendChild( liRoom ); // ul > li
        //
        // }

        liFloor.setAttribute( 'id', ( '00' + classifiedList[i][0].floor ).slice( -2 ) ); // set id to its floor number
        // liFloor.appendChild(ul); // li > div + ul
        floorList.appendChild( liFloor );

    }

    floors = document.querySelectorAll( '#floors>li' );
//    console.log( "Floors:\n", floors );
    floors.forEach( ( floor, i ) => {
        // 1층을 Default로 보여주기 위한 설정
        // if (i === 0) { activateFloor( floor, i, classifiedList ); }

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
            activateFloor( floor, i, classifiedList );

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
function activateFloor ( floor, i, classifiedList ) {

    for ( let j = 0; j < classifiedList[i].length; j++ ) {

        // 시설 리스트 생성
        // if문은 임의로 작성했습니다.
        // 추가 정보 필요 유무에 따라 Room List를 구성하는 element가 달라집니다.
        if( j % 2 == 0 )
            roomList.appendChild( listAddRoom( classifiedList[i][j] ) ); // ul > li
        else
            roomList.appendChild( listAddRoomAccordion( classifiedList[i][j] ) ); // ul > li

        // 평면도 상에 호수 글자 생성
        imgBg[0].appendChild( mapAddRoom( classifiedList[i][j] ) );
    }

    floor.classList.add( 'active' );

//     const fl = classifiedList[ i ];
//     roomNums.forEach( ( rn, j ) => {
//
//         rn.querySelector( 'span' ).innerText = fl[j].facilities;
//         rn.querySelector( '.desc p' ).innerText = `${ fl[ j ] } description`;
//
//     });
//
//     rooms = floor.querySelectorAll( '#rooms li' );
// //    console.log( "activated rooms: \n", rooms );
//     rooms.forEach( ( room, idx ) => {
//         room.addEventListener( 'click', () => {
//
//             if ( prevDesc ) { prevDesc.classList.remove( 'active' ); }
//             const desc = roomNums[ idx ].querySelector( '.desc' );
//             desc.classList.add( 'active' );
//             prevDesc = desc;
//
//         })
//     });

    prevElement = floor;

    bgUrl = '../floor-img/' + building_code + '/' + floor.id + '.png'
    setFloorBg( bgUrl );

    setFont();
}

/**
 * i 층의 호(room)수를 받아와서
 * detail_example.html에 Room List를 구성하는 새 element 를 생성합니다.
 * 별도의 정보가 필요없는 시설이므로, `li`(시설명) element 만 생성합니다.
 *
 * @param roomInfo classifiedList[i][j]
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
 * @param roomInfo classifiedList[i][j]
 * @returns {HTMLLIElement} `li` element in rooms list
 */
function listAddRoomAccordion( roomInfo ) {

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

    const accor_body_text = document.createElement( 'div' );
    accor_body_text.className = 'accordion-body';
    accor_body_text.innerText = roomInfo.room_code + ' 관련 추가 정보';

    accor_liRoom.appendChild( accor_button ); // li > button
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
function classifyList( res ) {

    let classifiedList = [];
    let floors = res.map( room => room.floor );
    let uniqFloors = [... new Set( floors )];
    console.log( uniqFloors );
    uniqFloors.forEach( ( floor ) => {

        let floorNum, regex;
        if ( /^B+/.test( floor ) ) {
            // if floor element starts with 'B'
            floorNum = ( '00' + floor.substr(1, 1) ).slice( -2 );
            regex = new RegExp( `^1-${floorNum}+` );
        } else {
            floorNum = ( '00' + floor ).slice( -2 );
            regex = new RegExp( `^0-${floorNum}+` );
        }

        const classifiedFloor = res.filter( data => regex.test( data.room_code ) );
        classifiedList.push( classifiedFloor.sort( function( a, b ) {
            // Sort By room_no
            if ( a.room_no > b.room_no ) return 1;
            if ( a.room_no === b.room_no ) return 0;
            if ( a.room_no < b.room_no ) return -1;

        } ) );

    } )

    return classifiedList;
}