const floorList = document.getElementById('floors');
const roomNums = document.querySelectorAll('#detail .img-wrap .roomNum');

const receivedFloorCount = 4;
const receivedRoomCount = 4;
/**
 * 건물에 대한 정보 중 총 층(floor)수와 호(room)수를 받아와서
 * detail_example.html에 Floor List를 구성하는 새 element 들을 생성합니다.
 * 
 * @param {number} floorCount the integer number of floors
 * @param {number} roomCount the integer number of rooms in each floors
 * @result Create new elements under `ul#floors`
 */
const setFloorText = (floorCount, roomCount) => {
    for (let i = 0; i < floorCount; ++i) {
        const liFloor = document.createElement('li');
        const div = document.createElement('div');
        const span = document.createElement('span');

        div.className = 'text';
        span.className = 'floor-title';
        span.innerText = `${i + 1}F`;

        div.appendChild(span);
        liFloor.appendChild(div);

        const ul = document.createElement('ul');
        ul.setAttribute('id', 'rooms');
        for (let j = 0; j < roomCount; j++) {
            const liRoom = document.createElement('li');
            liRoom.innerText = `${i + 1}0${j + 1}`;
            ul.appendChild(liRoom);
        }

        liFloor.appendChild(ul);        
        floorList.appendChild(liFloor);
    }
}

setFloorText(receivedFloorCount, receivedRoomCount);

const receivedFloorList = [
    [101, 102, 103, 104],
    [201, 202, 203, 204],
    [301, 302, 303, 304],
    [401, 402, 403, 404],
];
const receivedBgUrl = "../images/details-example.jpg";

// 로딩 화면 구현 시 필요:
// let isLoading = Boolean();
// let isComplete = Boolean();

const setFloorList = (info) => {
    if (!info.isDesignated) {
        for (floor of info.floorsList) {
            console.log(floor);
        }
    } else {
        // something action here
    }
}
/**
 * `main#detail > div.img-wrap > div.imgBg` 의 background url을 `bgUrl`로 설정합니다.
 * @param {string} bgUrl url string of the background image
 */
const setFloorBg = (bgUrl) => {
    const target = document.querySelector('#detail .img-wrap .imgBg');
    target.style.background = `url(${bgUrl}) no-repeat center center / contain`;
}

// setFloorList(receivedBuildingInfo);
setFloorBg(receivedBgUrl);

let rooms = undefined;
let prevElement = undefined;
let prevDesc = undefined;
const floors = document.querySelectorAll('#floors>li');
floors.forEach((floor, i) => {
    // 1층을 Default로 보여주기 위한 설정
    if (i === 0) { 
        floor.classList.add('active'); 
        const fl = receivedFloorList[i];
        roomNums.forEach((rn, j) => {
            rn.querySelector('span').innerText = `${fl[j]}`;
            rn.querySelector('.desc p').innerText = `${fl[j]} description`;
        });
        
        rooms = floor.querySelectorAll('#rooms li');
        rooms.forEach((room, idx) => {
            room.addEventListener('click', (e) => {
                if (prevDesc) { prevDesc.classList.remove('active'); }

                const desc = roomNums[idx].querySelector('.desc');
                desc.classList.add('active');
                prevDesc = desc;
            })
        });

        prevElement = floor;
    }

    const floorTitle = floor.querySelector('.floor-title');
    floorTitle.addEventListener('click', e => {
        e.preventDefault();
        if (prevDesc) { prevDesc.classList.remove('active'); }

        // 한 층만 표시하기 위해서 활성화되었던 element를 저장하고,
        // 다른 element 클릭 시 저장한 이전 element를 비활성화
        if (prevElement) {
            prevElement.classList.remove('active');
        }

        // 선택한 층에 따라 표시되는 호수(방 번호) 변경
        floor.classList.add('active');
        const fl = receivedFloorList[i];
        roomNums.forEach((rn, j) => {
            rn.querySelector('span').innerText = `${fl[j]}`;
            rn.querySelector('.desc p').innerText = `${fl[j]} description`;
        });
        
        rooms = floor.querySelectorAll('#rooms li');
        rooms.forEach((room, idx) => {
            room.addEventListener('click', (e) => {
                if (prevDesc) { prevDesc.classList.remove('active'); }

                const desc = roomNums[idx].querySelector('.desc');
                desc.classList.add('active');
                prevDesc = desc;
            })
        });

        prevElement = floor;
    });
});