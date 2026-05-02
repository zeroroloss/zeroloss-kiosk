<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<script>
const recipeMaterialMap = {
<c:forEach var="entry" items="${recipeMaterialMap}" varStatus="st">
  "${entry.key}": [
    <c:forEach var="m" items="${entry.value}" varStatus="ms">
    {
      materialCode: "${m.materialCode}",
      deductQty: ${m.deductQty}
    }<c:if test="${!ms.last}">,</c:if>
    </c:forEach>
  ]<c:if test="${!st.last}">,</c:if>
</c:forEach>
};

const stockMap = {
<c:forEach var="s" items="${stockList}" varStatus="st">
  "${s.materialCode}": ${s.currentQty}<c:if test="${!st.last}">,</c:if>
</c:forEach>
};

console.log("order_confirm recipeMaterialMap", recipeMaterialMap);
console.log("order_confirm stockMap", stockMap);
</script>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>주문 목록 확인</title>

    <link rel="stylesheet" href="${contextPath}/kiosk_css/common.css">
    <link rel="stylesheet" href="${contextPath}/kiosk_css/order_confirm.css">
</head>

<body>
<div class="screen">
    <section class="panel">

        <header class="panel-header">
            <h1 class="panel-title">주문 목록 확인</h1>
        </header>

        <div class="panel-body">
            <div class="order-list" id="orderList"></div>

            <div class="empty-box" id="emptyBox">
                <div>장바구니가 비어있습니다</div>
                <div>메뉴 화면으로 돌아가서 메뉴를 담아주세요</div>
            </div>
        </div>

        <div class="panel-footer">
            <div class="total-row">
                <div class="total-label">총 금액</div>
                <div class="total-price" id="totalPrice">0원</div>
            </div>

            <div class="action-row">
                <button type="button" class="action-btn cancel-btn" onclick="goMenu()">메뉴로</button>
                <button type="button" class="action-btn confirm-btn" onclick="goPay()">결제하기</button>
            </div>
        </div>

    </section>
</div>

<script>
    const contextPath = "${contextPath}";
    
    const errorMessage = "${errorMessage}";
    if (errorMessage) {
        alert("결제 실패: " + errorMessage);
    }
</script>

<!-- ✅ 토스 SDK 먼저, order_confirm.js는 한 번만 -->
<script src="https://js.tosspayments.com/v2/standard"></script>
<script src="${contextPath}/kiosk_js/order_confirm.js"></script>
</body>
</html>