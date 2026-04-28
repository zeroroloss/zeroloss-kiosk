<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>주문 완료</title>
<link rel="stylesheet" href="${contextPath}/kiosk_css/common.css">
<link rel="stylesheet" href="${contextPath}/kiosk_css/order_complete.css">
</head>

<body>

<script>
window.contextPath = "${contextPath}";
</script>

<div class="screen">
<section class="panel">

<header class="panel-header">
<h1 class="panel-title">주문 완료</h1>
<p class="panel-desc">결제가 완료되었습니다</p>
</header>

<div class="panel-body">
<div class="complete-card">

<div class="check-circle">✓</div>

<h2 class="complete-title">주문이 정상적으로 완료되었습니다</h2>
<p class="complete-sub">픽업 대기 화면을 확인해주세요</p>

<div class="order-box">
<div class="order-box-title">주문 번호</div>
<div class="order-number" id="orderNumber">${orderNum}</div>
</div>

<div class="info-grid">
<div class="info-row">
<div class="info-label">영수증</div>
<div class="info-value">
    <c:choose>
        <c:when test="${not empty receiptUrl}">
            <a href="${receiptUrl}" target="_blank">영수증 보기</a>
        </c:when>
        <c:otherwise>-</c:otherwise>
    </c:choose>
</div>
</div>
</div>

<div class="countdown-box">
<span class="countdown-time" id="countdown">10</span>초 후 초기 화면으로 돌아갑니다
</div>

<button class="home-btn" onclick="goHome('${contextPath}')">
처음으로
</button>

</div>
</div>

</section>
</div>

<script src="${contextPath}/kiosk_js/order_complete.js"></script>

</body>
</html>