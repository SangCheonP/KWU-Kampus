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
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  <link rel="stylesheet" href="./css/reset.css">
  <link rel="stylesheet" href="./css/layout.css">
</head>
<body>
  <div class="page detail">

      <header>

        <div class="inner">

          <h1>광운대학교<a href="/"><img src="./images/logo.png"></a></h1>

        </div>
        <!-- div.inner end -->

      </header>

      <main id="detail">

        <div class="inner">

          <div class="text-wrap" id="text-wrap-floors">
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

          <div class="text-wrap" id="text-wrap-rooms">
            <ul id="rooms" class="accordion accordion-flush">
            </ul>
          </div>

          <div class="img-wrap">
            <div class="imgBg">
<%--              <div class="roomNum">--%>
<%--                <div class="desc">--%>
<%--                  <p>Description</p>--%>
<%--                </div>--%>
<%--              </div>--%>

<%--              <div class="roomNum">--%>
<%--                <span>102</span>--%>
<%--                <div class="desc">--%>
<%--                  <p>Description</p>--%>
<%--                </div>--%>
<%--              </div>--%>

<%--              <div class="roomNum">--%>
<%--                <span>103</span>--%>
<%--                <div class="desc">--%>
<%--                  <p>Description</p>--%>
<%--                </div>--%>
<%--              </div>--%>

<%--              <div class="roomNum">--%>
<%--                <span>104</span>--%>
<%--                <div class="desc">--%>
<%--                  <p>Description</p>--%>
<%--                </div>--%>
            </div>
          </div>
            <!-- imgBg end -->
        </div>
          <!-- img-wrap end -->

      </main>

    </div>

  <script type="module" src="../js/room-position.js"></script>
  <script type="module" src="../js/detail-example.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
</body>
</html>