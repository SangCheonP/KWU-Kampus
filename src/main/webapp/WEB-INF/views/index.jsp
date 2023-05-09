<%@ page import="com.google.gson.Gson" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KWU Kampus</title>
  <link rel="stylesheet" href="./css/reset.css">
  <link rel="stylesheet" href="./css/layout.css">
</head>

<body>
<script type="text/javascript" src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
  <div class="page">
    <header>
      <div class="inner">
        <h1>광운대학교<a href="./index.jsp">(logo)</a></h1>
        <!-- Temporary Links List -->
        <ul class="temp-links">
          <li>Temporary Links</li>
          <li><a href="./pages/detail_example.html">Detail Example</a></li>
        </ul>
        <!-- Temporary Links List end -->
        <div id="menuBtn">
          <!-- <i class='bx bx-search' ></i> -->
          <div class="center">
            <div class="bar bar01"></div>
            <div class="bar bar02"></div>
            <div class="bar bar03"></div>
          </div>
        </div>
        <div id="sideMenu">
          <div class="category">
            <div class="text">
              <span>건물</span>
              <img src="./images/icon-chevron-down.svg" alt="">
              <div class="mask">
                <span></span>
                <img src="./images/icon-chevron-down.svg" alt="">
              </div>
            </div>
            <ul class="sub-categories">
              <li><a href="">새빛관</a></li>
              <li><a href="">비마관</a></li>
              <li><a href="">한울관</a></li>
              <li><a href="">옥의관</a></li>
            </ul>
          </div>
          <div class="category">
            <div class="text">
              <span>스터디</span>
              <img src="./images/icon-chevron-down.svg" alt="">
              <div class="mask">
                <span></span>
                <img src="./images/icon-chevron-down.svg" alt="">
              </div>
            </div>
            <ul class="sub-categories">
              <li><a href="">중앙 도서관</a></li>
              <li><a href="">한울관 열람실</a></li>
              <li><a href="">비마관 열람실</a></li>
              <li><a href="">새빛관 로비</a></li>
              <li><a href="">중앙도서관</a></li>
            </ul>
          </div>
          <div class="category">
            <div class="text">
              <span>학적</span>
              <img src="./images/icon-chevron-down.svg" alt="">
              <div class="mask">
                <span></span>
                <img src="./images/icon-chevron-down.svg" alt="">
              </div>
            </div>
            <ul class="sub-categories">
              <li><a href="">증명서</a></li>
              <li><a href="">비마관 창구</a></li>
            </ul>
          </div>
          <div class="category">
            <div class="text">
              <span>은행/ATM/우체국</span>
              <img src="./images/icon-chevron-down.svg" alt="">
              <div class="mask">
                <span></span>
                <img src="./images/icon-chevron-down.svg" alt="">
              </div>
            </div>
            <ul class="sub-categories">
              <li><a href="">은행</a></li>
              <li><a href="">ATM</a></li>
              <li><a href="">우체국</a></li>
            </ul>
          </div>
          <div class="category">
            <div class="text">
              <span>휴게실</span>
              <img src="./images/icon-chevron-down.svg" alt="">
              <div class="mask">
                <span></span>
                <img src="./images/icon-chevron-down.svg" alt="">
              </div>
            </div>
            <ul class="sub-categories">
              <li><a href="">한울관 휴게실</a></li>
              <li><a href="">한울관 여자 휴게실</a></li>
              <li><a href="">비마관 휴게실</a></li>
            </ul>
          </div>
          <div class="category">
            <div class="text">
              <span>흡연장</span>
              <img src="./images/icon-chevron-down.svg" alt="">
              <div class="mask">
                <span></span>
                <img src="./images/icon-chevron-down.svg" alt="">
              </div>
            </div>
            <ul class="sub-categories">
              <li><a href="">한울관 흡연장</a></li>
              <li><a href="">비마관 흡연장</a></li>
              <li><a href="">참빛관 흡연장</a></li>
            </ul>
          </div>
          <div class="category">
            <div class="text">
              <span>행정기관</span>
              <img src="./images/icon-chevron-down.svg" alt="">
              <div class="mask">
                <span></span>
                <img src="./images/icon-chevron-down.svg" alt="">
              </div>
            </div>
            <ul class="sub-categories">
              <li><a href="">교육지원팀</a></li>
            </ul>
          </div>
          <div class="category">
            <div class="text">
              <span>장애인 지원 시설</span>
              <img src="./images/icon-chevron-down.svg" alt="">
              <div class="mask">
                <span></span>
                <img src="./images/icon-chevron-down.svg" alt="">
              </div>
            </div>
            <ul class="sub-categories">
              <li><a href="">~~~</a></li>
            </ul>
          </div>
          <div class="category">
            <div class="text">
              <span>기타 시설</span>
              <img src="./images/icon-chevron-down.svg" alt="">
              <div class="mask">
                <span></span>
                <img src="./images/icon-chevron-down.svg" alt="">
              </div>
            </div>
            <ul class="sub-categories">
              <li><a href="">자동제세동기</a></li>
            </ul>
          </div>
        </div>
      </div>
      <script src="./js/header.js"></script>
    </header>

    <main class="main">
      <div>
      </div>
      <div id="guiContainer">
<%--          <div class="lil-gui allow-touch-styles root">--%>
<%--            <div class="title" role="button" aria-expanded="true" tabindex="0">건물 정보</div>--%>
<%--            <div class="children">--%>
<%--              <div class="controller string1">--%>
<%--                <div class="name" id="lil_gui_building">건물</div>--%>
<%--                <div class="widget">--%>
<%--                  <input type="text" aria-labelledby="lil_gui_building" value="${buildings[0].building}">--%>
<%--                </div>--%>
<%--              </div>--%>
<%--              <div class="controller string2">--%>
<%--                <div class="name" id="building_phone_num">전화번호</div>--%>
<%--                <div class="widget">--%>
<%--                  <input type="text" aria-labelledby="lil_gui_building_phone_num" value="${buildings[0].building_phone_num}">--%>
<%--                </div>--%>
<%--              </div>--%>
<%--              <button onclick="javascript:showMainInfo()"> 버튼 </button>--%>
<%--            </div>--%>
<%--          </div>--%>
      </div>
      <script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>
      <script type="importmap">
        {
          "imports": {
            "three": "https://unpkg.com/three@0.151.3/build/three.module.js",
            "three/addons/": "https://unpkg.com/three@0.151.3/examples/jsm/"
          }
        }
      </script>
      <script type="module" src="./js/main.js"></script>

      <div id="fixedHelp">
        <img class="help-icon" src="./images/icon-help-round.svg" alt="to see how to use, click here">
        <ul>
          <li>
            <img src="./images/icon-move.svg" alt="">
            <img class="for-mobile" src="./images/gui-gesture-one-finger-touch.svg" alt="">
            <img class="for-pc" src="./images/icon-mouse-left-button.svg" alt="">
          </li>
          <li>
            <img src="./images/icon-3d-rotate.svg" alt="">
            <img class="for-mobile" src="./images/gui-gesture-two-finger-touch.svg" alt="">
            <img class="for-pc" src="./images/icon-mouse-right-button.svg" alt="">
          </li>
          <li>
            <img src="./images/icon-zoom-out.svg" alt="">
            <img src="./images/icon-zoom-in.svg" alt="">
            <img class="for-mobile" src="./images/gui-gesture-pinch-open.svg" alt="">
            <img class="for-mobile" src="./images/gui-gesture-pinch-close.svg" alt="">
            <img class="for-pc" src="./images/icon-mouse-scroll-wheel.svg" alt="">
          </li>
        </ul>
      </div>
    </main>
  </div>
</body>
</html>