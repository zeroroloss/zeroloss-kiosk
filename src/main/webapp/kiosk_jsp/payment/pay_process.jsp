<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>결제 진행</title>

<link rel="stylesheet" href="${contextPath}/kiosk_css/common.css">
<link rel="stylesheet" href="${contextPath}/kiosk_css/pay_process.css">
</head>

<body>

<script>
window.contextPath = "${contextPath}";
</script>

<div class="screen">
<section class="panel">

<header class="panel-header">
    <button class="close-btn" onclick="goBack('${contextPath}')">×</button>
    <h1 class="panel-title">결제 진행</h1>
    <p class="panel-desc">결제를 진행하고 있습니다</p>
</header>

<div class="panel-body">
    <div class="process-card">

        <h2 class="process-title">결제 처리 중</h2>
        <div class="process-amount" id="paymentAmount">0원</div>
        <div class="method-badge" id="methodBadge">카드</div>

        <div class="icon-wrap">
            <div class="icon-svg">💳</div>
        </div>

        <div class="process-message" id="processMessage"></div>
        <div class="process-sub" id="processSub"></div>

        <!-- 토스 위젯 렌더링 영역 -->
        <div id="payment-widget"></div>
        <div id="agreement"></div>

        <div class="action-row">
            <button type="button" class="action-btn cancel-btn"
                    onclick="goBack('${contextPath}')">취소</button>
            <button type="button" class="action-btn confirm-btn"
                    id="payBtn">결제하기</button>
        </div>

    </div>
</div>

<!-- 실패 팝업 -->
<div class="overlay" id="errorOverlay">
    <div class="popup">
        <div class="popup-head">결제 실패</div>
        <div class="popup-body">
            <div class="popup-title">결제에 실패했습니다</div>
            <div class="popup-reason" id="errorReason"></div>
            <div class="popup-desc">다시 시도해주세요</div>
        </div>
        <div class="popup-footer">
            <button class="popup-btn"
                    onclick="goBack('${contextPath}')">확인</button>
        </div>
    </div>
</div>

</section>
</div>
<script>
  window.contextPath = "${contextPath}";
  window.orderId = "${sessionScope.orderId}";       <%-- 세션에서 --%>
  window.totalAmount = ${sessionScope.totalAmount}; <%-- 세션에서 --%>
</script>

<!-- 토스 SDK -->
<script src="https://js.tosspayments.com/v2/standard"></script>
<script src="${contextPath}/kiosk_js/pay_process.js"></script>
</body>
</html>