<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    String contextPath = request.getContextPath();
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

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

console.log("option_confirm recipeMaterialMap", recipeMaterialMap);
console.log("option_confirm stockMap", stockMap);

</script>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>옵션 확인</title>

<link rel="stylesheet" href="<%=contextPath%>/kiosk_css/common.css">
<link rel="stylesheet" href="<%=contextPath%>/kiosk_css/option_confirm.css">
</head>

<body>
<div class="screen">
  <section class="panel">

    <header class="panel-header">
      <button type="button" class="close-btn" onclick="goBack()">x</button>
      <div class="panel-title">옵션 확인</div>
      <div class="panel-desc">선택하신 옵션을 확인해주세요</div>
    </header>

    <div class="panel-body">
      <div class="summary-list" id="summaryList"></div>
    </div>

    <div class="panel-footer">
      <div class="info-bar">
        <div class="qty-box">
          <div class="qty-label">수량</div>
          <button type="button" class="qty-btn" id="minusBtn">－</button>
          <div class="qty-value" id="qtyValue">1</div>
          <button type="button" class="qty-btn" id="plusBtn">＋</button>
        </div>

        <div class="price-box">
          <div class="price-label">금액</div>
          <div class="price-value" id="totalPrice">0원</div>
        </div>
      </div>

      <div class="action-bar">
        <button type="button" class="action-btn pay-btn" onclick="addCart()">장바구니</button>
        <button type="button" class="action-btn save-btn" onclick="goPay()">결제하기</button>
      </div>
    </div>

  </section>
</div>

<script>
  const contextPath = "<%=contextPath%>";
</script>

<script src="<%=contextPath%>/kiosk_js/option_confirm.js"></script>
<script src="<%=contextPath%>/kiosk_js/timer.js"></script>
</body>
</html>