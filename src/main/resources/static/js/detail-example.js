const floorList = document.getElementById('floors');
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
const receivedBgUrl = "../images/details-example.jpg";
let receivedBgUrlArr;

let rooms = undefined;
let prevElement = undefined;
let prevDesc = undefined;
let floors = undefined;

let infoTitle, infoContent, titleText, contentText;
let infoTag, infoPage;
let prevIdx = 0;
let contentArr;

// 임시
let help = new Array('도움말');
let helpContent = new Array('목록에서 층수(ex. 1F)를 클릭하면 평면도가 업데이트됩니다. 호수(ex. 101)를 클릭하면 해당 시설의 정보가 업데이트됩니다.');
let Left = [[70, 75, 54, 7, 7], [43, 23, 11, 23, 11], [24, 36, 48, 60, 24], [24, 23, 24, 37, 61, 61, 61, 61, 50, 61],
    [36, 48, 61, 61, 61, 61, 61, 61, 22, 22], [21, 27, 33, 39, 44, 50, 56, 63, 61, 61, 61, 22, 22, 22, 36, 47],
    [21, 27, 33, 39, 44, 50, 56, 63, 61, 61, 61, 22, 22, 22, 36, 47], [21, 27, 33, 39, 44, 50, 56, 63, 61, 61, 61, 22, 22, 22, 36, 47],
    [21, 27, 33, 39, 44, 50, 56, 63, 61, 61, 61, 22, 22, 22, 36, 47]];
let Top = [[36, 72, 76, 76, 49], [37, 64, 64, 33, 33], [37, 37, 37, 37, 64], [61, 41, 28, 36, 43, 51, 59, 66, 36, 32],
    [35, 35, 27, 35, 43, 51, 59, 67, 35, 27], [29, 29, 29, 29, 29, 29, 29, 29, 50, 58, 66, 66, 58, 50, 48, 48],
    [29, 29, 29, 29, 29, 29, 29, 29, 50, 58, 66, 66, 58, 50, 48, 48], [29, 29, 29, 29, 29, 29, 29, 29, 50, 58, 66, 66, 58, 50, 48, 48],
    [29, 29, 29, 29, 29, 29, 29, 29, 50, 58, 66, 66, 58, 50, 48, 48]];
let info = [['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '', '', '', '', '', ''],
    ['', '', 'hwjung@kw.ac.kr', 'kcson@kw.ac.kr', 'ksc0226@kw.ac.kr', '', '', '', '', 'woosin.lee@kw.ac.kr'],
    ['bjpark@kw.ac.kr', '', 'uramoon@kw.ac.kr', 'kang@kw.ac.kr', 'yhdfly@kw.ac.kr', 'whahn@kw.ac.kr', 'smlee5679@gmail.com',
        'dhim@kw.ac.kr', '', 'korfriend@gmail.com', '', '', '', '',
        '대학원 세미나실 대여 문의: 일반대학원 교학팀 (02-940-5082, 5083) // 신청서 작성 장소: 일반대학원 교학팀 화도관 207호',
        '대학원 세미나실 대여 문의: 일반대학원 교학팀 (02-940-5082, 5083) // 신청서 작성 장소: 일반대학원 교학팀 화도관 207호'],
    ['parkcheolsoo@kw.ac.k', 'mis1@kw.ac.kr', 'jaesungpark@kw.ac.kr', 'dhshin@kw.ac.kr', 'shchoi@kw.ac.kr', 'hklee@kw.ac.kr',
        'hlee@kw.ac.kr', '', '', '', '', '', '', '', '', ''],
    ['mgchoi@kw.ac.kr', 'mcho@kw.ac.kr', 'hyunkkim@kw.ac.kr', 'kdpark@kw.ac.kr', 'ljhar@kw.ac.kr', 'yglee96@kw.ac.kr',
        'jinwookim@kw.ac.kr', '', '', '', '', '', '', '', '', ''],
    ['swlee@kw.ac.kr', 'jhryu@security.re.kr', 'tskim@kw.ac.kr', 'hyhwang@kw.ac.kr', 'kihoonlee@kw.ac.kr', 'joonhwan.yi@kw.ac.kr',
        'dgsim@kw.ac.kr', '', '', '', '', '', '', '', '', '']];

init();

function init() {

    fetch( "http://13.124.194.184:8080/detail/info/08", {
        method: "GET"
    } )
    .then( res => res.json() )
    .then( res => {

        let classifiedList = classifyList( res );
        console.log( classifiedList );
        createFloors( classifiedList );

    } )

    // createFloors( receivedFloorList );
    setFloorBg( receivedBgUrl );

    infoTitle = document.getElementsByClassName("infoTitle");
    infoContent = document.getElementsByClassName("infoContent");

    titleText = new Array('시설명', '위치', '설명', '기타 정보');
    contentText = new Array('', '', '', '');
    contentArr = new Array('', '', '', '');

    infoTag = document.getElementById('infoTagD');
    infoPage = document.getElementById('infoPageD');

    setInfo();
    infoPage.classList.remove('on');
    infoTag.classList.remove('on');

    document.getElementById("menuBtn").style.display = 'none';
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
function createFloors( classifiedList ) {

    //임시
    receivedBgUrlArr = ["../floor-img/04-01.png", "../floor-img/04-02.png", "../floor-img/04-03.png",
        "../floor-img/04-04.png", "../floor-img/04-05.png", "../floor-img/04-06.png",
        "../floor-img/04-06.png", "../floor-img/04-06.png", "../floor-img/04-06.png"];

    for ( let i = 0; i < classifiedList.length; ++i ) {

        const liFloor = document.createElement( 'li' );
        const div = document.createElement( 'div' );
        const span = document.createElement( 'span' );

        div.className = 'text'; // div.text
        span.className = 'floor-title'; // span.floor-title
        span.innerText = `${classifiedList[i][0].floor}F`;

        div.appendChild( span ); // div > span
        liFloor.appendChild( div ); // li > div > span

        const ul = document.createElement( 'ul' );
        ul.setAttribute( 'id', 'rooms' ); // ul#rooms

        for ( let j = 0; j < classifiedList[i].length; j++ ) {

            const liRoom = document.createElement( 'li' );
            liRoom.innerText = classifiedList[i][j].room_no; // 임의로 i0j, 10호 넘어가면 못 씀
            ul.appendChild( liRoom ); // ul > li

        }

        liFloor.appendChild(ul); // li > div + ul
        floorList.appendChild(liFloor);


    }

    floors = document.querySelectorAll( '#floors>li' );
//    console.log( "Floors:\n", floors );
    floors.forEach( ( floor, i ) => {
        // 1층을 Default로 보여주기 위한 설정
        if (i === 0) { activateFloor( floor, i, classifiedList ); }

        const floorTitle = floor.querySelector( '.floor-title' );
        floorTitle.addEventListener( 'click', ( e ) => {

            e.preventDefault();
            // 한 층만 표시하기 위해서 활성화되었던 element를 저장하고,
            // 다른 element 클릭 시 저장한 이전 element를 비활성화
            if ( prevDesc ) { prevDesc.classList.remove( 'active' ); }
            if ( prevElement ) { prevElement.classList.remove( 'active' ); }

            // 선택한 층에 따라 표시되는 호수(방 번호) 변경
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

    floor.classList.add( 'active' );
    roomNums[prevIdx].querySelector('span').style.color = '#000';

    setInfo();
    infoPage.classList.remove('on');
    infoTag.classList.remove('on');

    roomNums.forEach( ( rn, j ) => {
        rn.style.display = 'none';
    });

    const fl = classifiedList[ i ];

    for(let num = 0; num < fl.length; num++) {
        roomNums[num].style.display = 'block';
        roomNums[num].style.left = Left[i][num] + '%';
        roomNums[num].style.top = Top[i][num] + '%';
        roomNums[num].querySelector( 'span' ).innerText = fl[num].facilities;
        roomNums[num].querySelector( '.desc p' ).innerText = `${ fl[ num ] } description`;
    }

    rooms = floor.querySelectorAll( '#rooms li' );
        rooms.forEach( ( room, idx ) => {
        room.addEventListener( 'click', () => {
            roomNums[prevIdx].querySelector('span').style.color = '#000';

            roomNums[idx].querySelector( 'span' ).style.color = "red";

            prevIdx = idx;

            contentArr[0] = fl[idx].facilities;
            contentArr[1] = "새빛관 " + room.textContent[0] + "층 " + room.textContent + "호";
            contentArr[3] = info[i][idx];
            if(room.textContent == 615 || room.textContent == 616)
                contentArr[2] = '대학원 세미나실입니다. 학기별로 정해진 대학원 수업시간 이외에 대학원 세미나실 대여 신청절차 없이 사용이 불가합니다.';
            else contentArr[2] = '';
                setInfo2(contentArr);

            console.log(room.textContent);
        })
    });
    // const fl = classifiedList[ i ];
    // roomNums.forEach( ( rn, j ) => {
    //
    //     rn.querySelector( 'span' ).innerText = fl[j].facilities;
    //     rn.querySelector( '.desc p' ).innerText = `${ fl[ j ] } description`;
    //
    // });

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
//
    prevElement = floor;

    setFloorBg(receivedBgUrlArr[i]);
}

/**
 * 분류되지 않은 방 정보 리스트를 받아와서 층 별로 분류하고,
 * 방 번호를 오름차순으로 정렬하여 리턴합니다.
 *
 * *현재는 지상 층만 분류합니다.*
 *
 * @param { Array } res raw data(floor list) received from server
 * @returns a classified floor list
 */
function classifyList( res ) {

    let classifiedList = [];
    let floors = res.map( room => room.floor );
    let uniqFloors = [... new Set( floors )];
    console.log( uniqFloors );
    for ( let i = 0; i < uniqFloors.length; ++i ) {

        const regex = new RegExp( `0-0?${i + 1}+` );
        let floor = res.filter( data => regex.test( data.room_code ) );
        classifiedList.push( floor.sort( function(a, b) {

            if ( a.room_no > b.room_no ) return 1;
            if ( a.room_no === b.room_no ) return 0;
            if ( a.room_no < b.room_no ) return -1;

        } ) );

    }

    return classifiedList;
}

function setInfo() {
    // 초기화
    for(var i = 0; i < infoTitle.length; i++) {
        infoTitle[i].style.display = 'none';
        infoContent[i].style.display = 'none';
    }

    infoTitle[0].style.display = 'block';
    infoContent[0].style.display = 'block';
    infoTitle[0].textContent = help[0];
    infoContent[0].textContent = helpContent[0];

    if(!infoPage.classList.contains('on')) {
        infoPage.classList.toggle('on');
        infoTag.classList.toggle('on');
    }
}

function setInfo2(cArr) {
    for(var i = 0; i < infoTitle.length; i++) {
        infoTitle[i].style.display = 'block';
        infoContent[i].style.display = 'block';
    }

    for(var i = 0; i < infoTitle.length; i++) {
        infoTitle[i].textContent = titleText[i];
        infoContent[i].textContent = cArr[i];
    }

    if(!infoPage.classList.contains('on')) {
        infoPage.classList.toggle('on');
        infoTag.classList.toggle('on');
    }
}

infoTag.addEventListener('click', function() {
    if(!infoPage.classList.contains('on')) {
        setInfo();
        // infoButton[0].textContent = '만족도 조사 하기';
        // infoButton[0].setAttribute("onclick", "window.open('https://forms.gle/dMwa7nym85tTc79x5')");
    }
    else {
        infoPage.classList.remove('on');
        infoTag.classList.remove('on');
        roomNums[prevIdx].querySelector('span').style.color = '#000';
    }
});