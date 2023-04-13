let hover_container = document.querySelector('.hover-container');
// let layer = document.querySelectorAll('.hover-layer');

// //마우스에 따라 움직이는 이미지
// container.onmousemove = function(e) {
//     let X = e.pageX;
//     let Y = e.pageY;
  
//     layer[0].style.transform = 'translate(' + X/100 + 'px, ' + Y/100 + 'px)';
//     layer[1].style.transform = 'translate(' + X/100*-2 + 'px, ' + Y/100*-2 + 'px)';
//     layer[2].style.transform = 'translate(' + X/100*-4 + 'px, ' + Y/100*-4 + 'px)';
//     layer[3].style.transform = 'translate(' + X/100*-6 + 'px, ' + Y/100*-6 + 'px)';
// }

let categoryF = document.querySelectorAll('.popupF_btn');
let popupB = document.querySelectorAll('.popupB');
let popupF, pre_popupF = undefined;

menuBtn.addEventListener('click', function() {
    // 사이드 메뉴 열면 건물 팝업창 비활성화
    if(sideMenu.classList.contains('on'))
        for(var j=0; j<popupB.length; j++)
            popupB[j].style.pointerEvents = 'none';

    // 사이드 메뉴 닫으면 건물 팝업창 활성화
    else
        for(var j=0; j<popupB.length; j++)
            popupB[j].style.pointerEvents = 'all';
});

for(var i = 0; i < categoryF.length; i++){
    // 시설 클릭 시
    categoryF[i].addEventListener('click', function() {
        // 이전 팝업창 비활성화
        if(pre_popupF)
            document.querySelector(pre_popupF).classList.remove('on');

        // 클릭한 시설 팝업창 활성화
        popupF = this.getAttribute('href');
        document.querySelector(popupF).classList.toggle('on');

        pre_popupF = popupF;

        // 사이드 메뉴 닫으면 시설 팝업창 비활성화
        menuBtn.addEventListener('click', function() {
            document.querySelector(popupF).classList.remove('on');
        });
    });
}