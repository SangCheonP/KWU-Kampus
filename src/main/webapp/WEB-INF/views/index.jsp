<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Building-detail-example</title>
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  <link rel="stylesheet" href="../css/reset.css">
  <link rel="stylesheet" href="../css/layout.css">
  <link rel="stylesheet" href="../css/main-style.css">
</head>

<body>
  <div class="page">
    <header>
      <div class="inner">
        <h1>광운대학교<a href="">KWU Kampus</a></h1>
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
              <span>카테고리 1</span>
              <i class='bx bxs-chevron-down'></i>
            </div>
            <ul class="sub-categories">
              <li><a href="#popupF_참빛101" class="popupF_btn">참빛관 101호</a></li>
              <li><a href="#popupF_참빛102" class="popupF_btn">참빛관 102호</a></li>
              <li><a href="#popupF_참빛103" class="popupF_btn">참빛관 103호</a></li>
              <li><a href="#popupF_새빛101" class="popupF_btn">새빛관 101호</a></li>
              <li><a href="#popupF_비마101" class="popupF_btn">비마관 101호</a></li>
            </ul>
          </div>
          <div class="category">
            <div class="text">
              <span>카테고리 2</span>
              <i class='bx bxs-chevron-down'></i>
            </div>
            <ul class="sub-categories">
              <li><a href="#popupF_복지101" class="popupF_btn">복지관 101호</a></li>
              <li><a href="#popupF_한울101" class="popupF_btn">한울관 101호</a></li>
              <li><a href="#popupF_화도101" class="popupF_btn">화도관 101호</a></li>
            </ul>
          </div>
          <div class="category">
            <div class="text">
              <span>카테고리 3</span>
              <i class='bx bxs-chevron-down'></i>
            </div>
            <ul class="sub-categories">
              <li><a href="#popupF_80주년" class="popupF_btn">80주년 기념관</a></li>
              <li><a href="#popupF_중도" class="popupF_btn">중앙도서관</a></li>
              <li><a href="#popupF_아이스" class="popupF_btn">아이스링크</a></li>
            </ul>
          </div>
        </div>
      </div>
      <script src="../js/header.js"></script>
    </header>

    <main class="main">
      <div class="hover-container">
        <div class="popupB hover-layer">
            <img src="../images/background.png">
        </div>
        <div class="popupB hover-layer">
            <a href="/detail"><img src="../images/참빛관.png"></a>
            <!-- <div style="transform: translate(160px, -110px);"> -->
              <div class="popupB-text popupB-triR" >
                <h3>참빛관</h3>
                <h4>주요시설</h4>
                <p>2층: -- / -- / --</p>
                <p>1층: -- / -- / --</p>
              </div>
              <div id="popupF_참빛101" class="popupF">
                <h3>시설명</h3>
                <h4>참빛관 101호</h4>
                <p>관련 사이트 링크 / 02-0000-0000</p>
                <p><br>요약 설명</p>
              </div>
              <div id="popupF_참빛102" class="popupF">
                <h3>시설명</h3>
                <h4>참빛관 102호</h4>
              </div>
              <div id="popupF_참빛103" class="popupF">
                <h3>시설명</h3>
                <h4>참빛관 103호</h4>
              </div>
            <!-- </div> -->
        </div>
        <div class="popupB hover-layer">
            <img src="../images/새빛관.png">
              <div class="popupB-text popupB-triR" >
                <h3>새빛관</h3>
                <h4>주요시설</h4>
                <p>2층: -- / -- / --</p>
                <p>1층: -- / -- / --</p>
              </div>
              <div id="popupF_새빛101" class="popupF">
                <h3>시설명</h3>
                <h4>새빛관 101호</h4>
                <p>관련 사이트 링크 / 02-0000-0000</p>
                <p><br>요약 설명</p>
              </div>
        </div>
        <div class="popupB hover-layer">
            <img src="../images/비마관.png">
              <div class="popupB-text popupB-triR" >
                <h3>비마관</h3>
                <h4>주요시설</h4>
                <p>2층: -- / -- / --</p>
                <p>1층: -- / -- / --</p>
              </div>
              <div id="popupF_비마101" class="popupF">
                <h3>시설명</h3>
                <h4>비마관 101호</h4>
                <p>관련 사이트 링크 / 02-0000-0000</p>
                <p><br>요약 설명</p>
              </div>
        </div>
        <div class="popupB hover-layer">
          <img src="../images/복지관.png">
            <div class="popupB-text popupB-triR" >
              <h3>복지관</h3>
            </div>
            <div id="popupF_복지101" class="popupF">
              <h3>시설명</h3>
              <h4>복지관 101호</h4>
            </div>
        </div>
        <div class="popupB hover-layer">
          <img src="../images/한울관.png">
            <div class="popupB-text popupB-triR" >
              <h3>한울관</h3>
            </div>
            <div id="popupF_한울101" class="popupF">
              <h3>시설명</h3>
              <h4>한울관 101호</h4>
            </div>
        </div>
        <div class="popupB hover-layer">
          <img src="../images/화도관.png">
            <div class="popupB-text popupB-triR" >
              <h3>화도관</h3>
            </div>
            <div id="popupF_화도101" class="popupF">
              <h3>시설명</h3>
              <h4>화도관 101호</h4>
            </div>
        </div>
        <div class="popupB hover-layer">
          <img src="../images/80주년기념관.png">
            <div class="popupB-text popupB-triR" >
              <h3>80주년 기념관</h3>
            </div>
            <div id="popupF_80주년" class="popupF">
              <h3>시설명</h3>
              <h4>80주년 기념관</h4>
            </div>
        </div>
        <div class="popupB hover-layer">
          <img src="../images/중앙도서관.png">
            <div class="popupB-text popupB-triR" >
              <h3>중앙도서관</h3>
            </div>
            <div id="popupF_중도" class="popupF">
              <h3>시설명</h3>
              <h4>중앙도서관</h4>
            </div>
        </div>
        <div class="popupB hover-layer">
          <img src="../images/아이스링크.png">
            <div class="popupB-text popupB-triR" >
              <h3>아이스링크</h3>
            </div>
            <div id="popupF_아이스" class="popupF">
              <h3>시설명</h3>
              <h4>아이스링크</h4>
            </div>
        </div>
      </div>

      <script src="../js/main-map.js"></script>
    </main>
  </div>
</body>

</html>