<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    String contextPath = request.getContextPath();
%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>주문 목록 확인</title>

<link rel="stylesheet" href="<%=contextPath%>/kiosk_css/common.css">
<link rel="stylesheet" href="<%=contextPath%>/kiosk_css/order_confirm.css">
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
  const contextPath = "<%=contextPath%>";
</script>

<script src="<%=contextPath%>/kiosk_js/order_confirm.js"></script>
</body>
</html>