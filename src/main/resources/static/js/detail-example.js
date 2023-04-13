const floorList = document.getElementById('floors');
const roomNums = document.querySelectorAll('#detail .img-wrap .roomNum');
const floorDefaultHeight = 80;

const receivedFloorCount = 4;
const receivedRoomCount = 4;
const setFloorText = (floorCount, roomCount) => {
    for (let i = 0; i < floorCount; ++i) {
        const liFloor = document.createElement('li');
        const div = document.createElement('div');
        div.className = 'text';
        const span = document.createElement('span');
        span.className = 'floor-title';
        span.innerText = `${i + 1}F`;
        // const dt = document.createElement('dt');
        // dt.className = 'floor-title';
        // dt.innerText = `${i + 1}F`
        // floorList.appendChild(dt);
        div.appendChild(span);
        // console.log(div);
        liFloor.appendChild(div);
        // const dl = document.createElemene('dl');
        const ul = document.createElement('ul');
        ul.setAttribute('id', 'rooms');
        for (let j = 0; j < roomCount; j++) {
            const liRoom = document.createElement('li');
            liRoom.innerText = `${i + 1}0${j + 1}`;
            ul.appendChild(liRoom);
        }
        // console.log(ul);
        liFloor.appendChild(ul);
        
        // console.log(liFloor);
        floorList.appendChild(liFloor);
        // dl.appendChild(ul);
        // floorList.appendChild(dl);
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

const setFloorBg = (bgUrl) => {
    const target = document.querySelector('#detail .img-wrap');
    target.style.background = `url(${bgUrl}) no-repeat center center / contain`;
}

// setFloorList(receivedBuildingInfo);
setFloorBg(receivedBgUrl);

let rooms;

let prevElement = undefined;
let prevDesc = undefined;
const floors = document.querySelectorAll('#floors>li');
floors.forEach((floor, i) => {
    const floorTitle = floor.querySelector('.floor-title');
    floorTitle.addEventListener('click', e => {
        e.preventDefault();
        const roomsHeight = floor.querySelector('#rooms').clientHeight;
        if (prevDesc) { prevDesc.removeAttribute('style'); }

        // active 되어있다면 제거하고 종료
        if (floor.classList.contains('active')) {
            floor.classList.remove('active');
            floor.style.height = floorDefaultHeight + 'px';
            return;
        }

        // 한 층만 표시하기 위해서 활성화되었던 element를 저장하고,
        // 다른 element 클릭 시 저장한 이전 element를 비활성화
        if (prevElement) {
            prevElement.classList.remove('active');
            prevElement.style.height = floorDefaultHeight + 'px';
        }

        // 선택한 층에 따라 표시되는 호수(방 번호) 변경
        floor.classList.toggle('active');
        const fl = receivedFloorList[i];
        roomNums.forEach((rn, j) => {
            rn.querySelector('span').innerText = `${fl[j]}`;
            rn.querySelector('.desc p').innerText = `${fl[j]} description`;
        });
        
        rooms = floor.querySelectorAll('#rooms li');
        // console.log(rooms);

        rooms.forEach((room, idx) => {

            room.addEventListener('click', () => {
                if (prevDesc) { prevDesc.removeAttribute('style'); }

                const desc = roomNums[idx].querySelector('.desc');
                desc.style.opacity = '1';
                desc.style.transform = 'translateY(0)';
                desc.style.pointerEvents = 'all';

                prevDesc = desc;
            })
        })
        prevElement = floor;
        floor.style.height = floorDefaultHeight + roomsHeight + 18 + 'px';
    })
});