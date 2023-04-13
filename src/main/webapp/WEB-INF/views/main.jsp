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
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  <link rel="stylesheet" href="./css/reset.css">
  <link rel="stylesheet" href="./css/layout.css">
</head>

<body>
  <div class="page">
    <header>
      <div class="inner">
        <h1>광운대학교<a href="/main">KWU Kampus</a></h1>
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
              <i class='bx bxs-chevron-down'></i>
            </div>
            <ul class="sub-categories">
              <li><a href="">중앙도서관</a></li>
              <li><a href="">새빛관</a></li>
              <li><a href="">참빛관</a></li>
              <li><a href="">비마관</a></li>
            </ul>
          </div>
          <div class="category">
            <div class="text">
              <span>스터디</span>
              <i class='bx bxs-chevron-down'></i>
            </div>
            <ul class="sub-categories">
              <li><a href="">비마관 2층</a></li>
              <li><a href="">새빛관 1층</a></li>
              <li><a href="">참빛관 B1층</a></li>
              <li><a href="">한울관 1층</a></li>
              <li><a href="">기념관 2층</a></li>
              <li><a href="">집현전</a></li>
            </ul>
          </div>
          <div class="category">
            <div class="text">
              <span>학적</span>
              <i class='bx bxs-chevron-down'></i>
            </div>
            <ul class="sub-categories">
              <li><a href="">증명서</a></li>
            </ul>
          </div>
          <div class="category">
            <div class="text">
              <span>은행/ATM/우체국</span>
              <i class='bx bxs-chevron-down'></i>
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
              <i class='bx bxs-chevron-down'></i>
            </div>
            <ul class="sub-categories">
              <li><a href="">한울관 4층</a></li>
              <li><a href="">비마관 4층</a></li>
            </ul>
          </div>
          <div class="category">
            <div class="text">
              <span>행정기관</span>
              <i class='bx bxs-chevron-down'></i>
            </div>
            <ul class="sub-categories">
              <li><a href="">교육지원팀</a></li>
            </ul>
          </div>
          <div class="category">
            <div class="text">
              <span>흡연장</span>
              <i class='bx bxs-chevron-down'></i>
            </div>
            <ul class="sub-categories">
              <li><a href="">흡연장</a></li>
            </ul>
          </div>
          <div class="category">
            <div class="text">
              <span>장애인 지원 시설</span>
              <i class='bx bxs-chevron-down'></i>
            </div>
            <ul class="sub-categories">
              <li><a href="">기타</a></li>
            </ul>
          </div>
          <div class="category">
            <div class="text">
              <span>기타시설</span>
              <i class='bx bxs-chevron-down'></i>
            </div>
            <ul class="sub-categories">
              <li><a href="">기타</a></li>
            </ul>
          </div>
        </div>
      </div>
      <script src="./js/header.js"></script>
    </header>

    <main class="main">
      <div class="box">
        <div class="floor"></div>
        <div class="prop prop01">
          <a href="/detail">
            prop01
            <br>
            detail_example
          </a>
        </div>
        <div class="prop prop02">prop02</div>
        <div class="prop prop03">prop03</div>
        <div class="prop prop04">prop04</div>
        <div class="prop prop05">prop05</div>
      </div>
      <div>
        <c:forEach items="${arr}" var="arr">
          <table>
            <tbody>
            <tr>
              <td>${arr.id}</td>
              <td>${arr.bd_name}</td>
              <td>${arr.floor}</td>
              <td>${arr.fc_name}</td>
            </tr>
            </tbody>
          </table>
        </c:forEach>
      </div>
    </main>

  </div>
</body>

</html>