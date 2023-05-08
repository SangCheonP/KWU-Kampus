const floorList = document.getElementById('floors');
const roomNums = document.querySelectorAll('#detail .img-wrap .roomNum');

const receivedFloorCount = 4;
const receivedRoomCount = 4;

const receivedFloorList = [
    [101, 102, 103, 104],
    [201, 202, 203, 204],
    [301, 302, 303, 304],
    [401, 402, 403, 404],
];
const receivedBgUrl = "../images/details-example.jpg";

let rooms = undefined;
let prevElement = undefined;
let prevDesc = undefined;
let floors = undefined;

init();

function init() {
    
    createFloors(receivedFloorCount, receivedRoomCount);
    setFloorBg(receivedBgUrl);

    floors = document.querySelectorAll( '#floors>li' );
    floors.forEach( ( floor, i ) => {
        // 1층을 Default로 보여주기 위한 설정
        if (i === 0) { activateFloor( floor, i ); }
    
        const floorTitle = floor.querySelector( '.floor-title' );
        floorTitle.addEventListener( 'click', ( e ) => {
    
            e.preventDefault();
            // 한 층만 표시하기 위해서 활성화되었던 element를 저장하고,
            // 다른 element 클릭 시 저장한 이전 element를 비활성화
            if ( prevDesc ) { prevDesc.classList.remove( 'active' ); }
            if ( prevElement ) { prevElement.classList.remove( 'active' ); }
    
            // 선택한 층에 따라 표시되는 호수(방 번호) 변경
            activateFloor( floor, i );
    
        } );
    
    } );

}

/**
 * 건물에 대한 정보 중 총 층(floor)수와 호(room)수를 받아와서
 * detail_example.html에 Floor List를 구성하는 새 element 들을 생성합니다.
 * 
 * @param { number } floorCount the integer number of floors
 * @param { number } roomCount the integer number of rooms in each floors
 * @result Create new elements under `ul#floors`
 */
function createFloors( floorCount = 0, roomCount = 0 ) {

    for ( let i = 0; i < floorCount; ++i ) {

        const liFloor = document.createElement( 'li' );
        const div = document.createElement( 'div' );
        const span = document.createElement( 'span' );

        div.className = 'text'; // div.text
        span.className = 'floor-title'; // span.floor-title
        span.innerText = `${ i + 1 }F`;

        div.appendChild( span ); // div > span
        liFloor.appendChild( div ); // li > div > span

        const ul = document.createElement( 'ul' );
        ul.setAttribute( 'id', 'rooms' ); // ul#rooms

        for ( let j = 0; j < roomCount; j++ ) {

            const liRoom = document.createElement( 'li' );
            liRoom.innerText = `${ i + 1 }0${ j + 1 }`; // 임의로 i0j, 10호 넘어가면 못 씀
            ul.appendChild( liRoom ); // ul > li

        }

        liFloor.appendChild(ul); // li > div + ul
        floorList.appendChild(liFloor);

    }

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
 * @param {Element} floor `li` element in floors list
 * @param {number} i index value of the element
 */
function activateFloor ( floor, i ) {

    floor.classList.add( 'active' ); 
    const fl = receivedFloorList[ i ];
    roomNums.forEach( ( rn, j ) => {

        rn.querySelector( 'span' ).innerText = `${ fl[ j ] }`;
        rn.querySelector( '.desc p' ).innerText = `${ fl[ j ] } description`;

    });
    
    rooms = floor.querySelectorAll( '#rooms li' );
    rooms.forEach( ( room, idx ) => {
        room.addEventListener( 'click', () => {

            if ( prevDesc ) { prevDesc.classList.remove( 'active' ); }
            const desc = roomNums[ idx ].querySelector( '.desc' );
            desc.classList.add( 'active' );
            prevDesc = desc;

        })
    });

    prevElement = floor;

}