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
  <div class="page detail">

      <header>

        <div class="inner">

          <h1>광운대학교<a href="/"><img src="./images/logo.png"></a></h1>

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
                <img src="../images/icon-chevron-down.svg" alt="">
                <div class="mask">
                  <span></span>
                  <img src="../images/icon-chevron-down.svg" alt="">
                </div>
              </div>
              <ul class="sub-categories">
                <li><a href="">세부 카테고리 1</a></li>
                <li><a href="">세부 카테고리 2</a></li>
                <li><a href="">세부 카테고리 3</a></li>
                <li><a href="">세부 카테고리 4</a></li>
              </ul>
            </div>

            <div class="category">
              <div class="text">
                <span>카테고리 2</span>
                <img src="../images/icon-chevron-down.svg" alt="">
                <div class="mask">
                  <span></span>
                  <img src="../images/icon-chevron-down.svg" alt="">
                </div>
              </div>
              <ul class="sub-categories">
                <li><a href="">세부 카테고리 1</a></li>
                <li><a href="">세부 카테고리 2</a></li>
                <li><a href="">세부 카테고리 3</a></li>
                <li><a href="">세부 카테고리 4</a></li>
                <li><a href="">세부 카테고리 5</a></li>
                <li><a href="">세부 카테고리 6</a></li>
                <li><a href="">세부 카테고리 7</a></li>
              </ul>
            </div>

            <div class="category">
              <div class="text">
                <span>카테고리 3</span>
                <img src="../images/icon-chevron-down.svg" alt="">
                <div class="mask">
                  <span></span>
                  <img src="../images/icon-chevron-down.svg" alt="">
                </div>
              </div>
              <ul class="sub-categories">
                <li><a href="">세부 카테고리 1</a></li>
                <li><a href="">세부 카테고리 2</a></li>
                <li><a href="">세부 카테고리 3</a></li>
              </ul>
            </div>

          </div>
          <!-- side menu end -->
        </div>
        <!-- div.inner end -->

      </header>

      <main id="detail">

        <div class="inner">
          <!-- <div class="testBg"></div> -->

          <div class="text-wrap">
            <ul id="floors">
            <!--
              <li>
                <div class="text">
                  <span class="floor-title">1f, 2f, 3f, ...</span>
                </div>
                <ul id="rooms">
                  <li>101, 201, ...</li>
                  <li>102. 202, ...</li>
                </ul>
              </li>
              -->
            </ul>
          </div>


          <div class="img-wrap">
            <div class="navbar">
              Facility Name Here
            </div>

            <div class="imgBg">

              <div class="roomNum">
                <span>101</span>
                <div class="desc">
                  <p>Description</p>
                </div>
              </div>

              <div class="roomNum">
                <span>102</span>
                <div class="desc">
                  <p>Description</p>
                </div>
              </div>

              <div class="roomNum">
                <span>103</span>
                <div class="desc">
                  <p>Description</p>
                </div>
              </div>

              <div class="roomNum">
                <span>104</span>
                <div class="desc">
                  <p>Description</p>
                </div>
              </div>

            </div>
            <!-- imgBg end -->
          </div>
          <!-- img-wrap end -->
        </div>

      </main>

    </div>

    <script src="../js/header.js"></script>
    <script src="../js/detail-example.js"></script>

</body>
</html>