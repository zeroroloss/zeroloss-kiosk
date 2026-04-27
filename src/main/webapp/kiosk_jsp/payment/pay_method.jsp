<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>결제 방식 선택</title>

<link rel="stylesheet" href="${contextPath}/kiosk_css/common.css">
<link rel="stylesheet" href="${contextPath}/kiosk_css/pay_method.css">
</head>

<body>
<div class="screen">
<section class="panel">

<header class="panel-header">
    <h1 class="panel-title">결제 방식 선택</h1>
    <p class="panel-desc">원하시는 결제 수단을 선택해주세요</p>
</header>

<div class="panel-body">
    <div class="pay-card">
        <div class="pay-card-inner">

            <h2 class="pay-section-title">결제 수단</h2>

            <div class="payment-grid" id="paymentGrid">
                <button type="button" class="payment-option selected" data-method="card">
                    <div class="payment-icon card"></div>
                    <div class="payment-name">카드 결제</div>
                </button>

                <button type="button" class="payment-option" data-method="kakao">
                    <div class="payment-icon kakao">Kakao</div>
                    <div class="payment-name">카카오페이</div>
                </button>

                <button type="button" class="payment-option" data-method="naver">
                    <div class="payment-icon naver">N Pay</div>
                    <div class="payment-name">네이버페이</div>
                </button>

                <button type="button" class="payment-option" data-method="payco">
                    <div class="payment-icon payco">PAYCO</div>
                    <div class="payment-name">페이코</div>
                </button>
            </div>

            <div class="amount-box">
                <div class="amount-label">최종 결제 금액</div>
                <div class="amount-value" id="finalAmount">0원</div>
            </div>

        </div>
    </div>
</div>

<div class="panel-footer">
    <button type="button" class="action-btn cancel-btn"
            onclick="goBack('${contextPath}')">이전</button>
    <button type="button" class="action-btn confirm-btn"
            onclick="goNext('${contextPath}')">결제 진행</button>
</div>

</section>
</div>

<script src="${contextPath}/kiosk_js/pay_method.js"></script>
</body>
</html>