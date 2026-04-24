<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>키오스크 대기화면</title>
<link rel="stylesheet" href="${contextPath}/kiosk_css/common.css" />
<link rel="stylesheet" href="${contextPath}/kiosk_css/start.css" />
</head>
<body>
<div class="screen">

<header class="top-header">
    <h1 class="header-title">주문 방식 선택</h1>
    <p class="header-desc">식사 방식을 선택해주세요</p>
    <div class="header-badge">ZEROLOSS</div>
</header>

<main class="main-content">
    <section class="logo-section">
        <div class="logo-box">
            <img id="logoImg" src="${contextPath}/images/logo.png" alt="ZEROLOSS 로고"/>
            <div id="logoFallback" class="img-fallback logo-fallback">ZEROLOSS</div>
        </div>
        <p class="section-desc">매장 또는 포장 주문을 선택한 뒤 주문을 진행해주세요</p>
    </section>

    <section class="select-section">
        <form method="POST" action="${contextPath}/kiosk/start">
            <input type="hidden" name="orderType" value="HERE"/>
            <button type="submit" class="select-card" id="eatInBtn">
                <div class="select-image-box">
                    <img id="eatInImg" src="${contextPath}/images/eat_in.png" alt="매장"/>
                    <div id="eatInFallback" class="img-fallback select-fallback">매장</div>
                </div>
                <div class="select-title">매장</div>
                <div class="select-desc">매장에서 식사하실 경우 선택해주세요</div>
            </button>
        </form>

        <form method="POST" action="${contextPath}/kiosk/start" >
            <input type="hidden" name="orderType" value="TOGO"/>
            <button type="submit" class="select-card" id="takeOutBtn">
                <div class="select-image-box">
                    <img id="takeOutImg" src="${contextPath}/images/take_out.png" alt="포장"/>
                    <div id="takeOutFallback" class="img-fallback select-fallback">포장</div>
                </div>
                <div class="select-title">포장</div>
                <div class="select-desc">포장하여 가져가실 경우 선택해주세요</div>
            </button>
        </form>
    </section>
</main>

<section class="ad-section">
    <div class="ad-title">이달의 프로모션</div>
    <div class="ad-box">
        <img id="adImg" src="${contextPath}/images/ad_banner.png" alt="광고 배너"/>
        <div id="adFallback" class="img-fallback ad-fallback">광고 영역</div>
    </div>
</section>

<!-- 로그인 팝업 -->
<div class="popup-overlay" id="welcomePopup">
    <div class="popup-box">
        <p class="popup-branch">${sessionScope.branchName} · ${sessionScope.kiosk_id}번 키오스크</p>
        <p class="popup-name">${sessionScope.empName} 매니저님</p>
        <p class="popup-welcome">환영합니다!</p>
        <button class="popup-btn" onclick="closePopup()">시작하기</button>
    </div>
</div>

</div>

<script src="${contextPath}/kiosk_js/start.js"></script>
</body>
</html>