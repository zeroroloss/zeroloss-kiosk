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
<title>영수증 선택</title>

<link rel="stylesheet" href="<%=contextPath%>/kiosk_css/common.css">
<link rel="stylesheet" href="<%=contextPath%>/kiosk_css/receipt.css">
</head>

<body>

<div class="screen">
  <section class="panel">

    <header class="panel-header">
      <h1 class="panel-title">영수증 출력</h1>
      <p class="panel-desc">영수증 출력 여부를 선택해주세요</p>
    </header>

    <div class="panel-body">

      <div class="receipt-card">

        <h2 class="receipt-title">영수증을 출력하시겠습니까?</h2>
        <p class="receipt-sub">필요하신 경우 출력 버튼을 눌러주세요</p>

        <div class="receipt-options">

          <!-- 출력 -->
          <button type="button"
                  class="receipt-btn"
                  onclick="goNext('<%=contextPath%>', true)">

            <div class="receipt-icon">🧾</div>
            <div class="receipt-label">출력</div>
            <div class="receipt-desc">
              영수증을 출력합니다
            </div>

          </button>

          <!-- 미출력 -->
          <button type="button"
                  class="receipt-btn"
                  onclick="goNext('<%=contextPath%>', false)">

            <div class="receipt-icon">❌</div>
            <div class="receipt-label">미출력</div>
            <div class="receipt-desc">
              영수증 없이 진행합니다
            </div>

          </button>

        </div>

      </div>

    </div>

  </section>
</div>

<script src="<%=contextPath%>/kiosk_js/receipt.js"></script>

</body>
</html>