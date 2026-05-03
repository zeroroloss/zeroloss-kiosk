<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>주문 완료</title>

<link rel="stylesheet" href="${contextPath}/kiosk_css/common.css">
<link rel="stylesheet"
	href="${contextPath}/kiosk_css/order_complete.css">
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

					<div class="panel-body">

						<!-- 1. 주문번호 카드 -->
						<div class="order-box">
							<div class="order-box-title">주문 번호</div>
							<div class="order-number" id="orderNumber">${orderNum}</div>
						</div>

						<!-- 2. 영수증 카드 -->
						<div class="receipt-card">
							<c:choose>
								<c:when test="${not empty receiptUrl}">
									<iframe class="receipt-frame" src="${receiptUrl}" title="영수증">
									</iframe>
								</c:when>
								<c:otherwise>
									<div class="receipt-empty">영수증 정보가 없습니다</div>
								</c:otherwise>
							</c:choose>
						</div>

						<!-- 3. 하단 영역 -->
						<div class="complete-bottom">
							<div class="countdown-box">
								<span class="countdown-time" id="countdown">10</span>초 후 초기 화면으로
								돌아갑니다
							</div>

							<button type="button" class="home-btn"
								onclick="goHome('${contextPath}')">처음으로</button>
						</div>

					</div>

				</div>
			</div>

		</section>
	</div>

	<script src="${contextPath}/kiosk_js/order_complete.js"></script>

</body>
</html>