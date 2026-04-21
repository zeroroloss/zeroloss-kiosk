<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%
    String contextPath = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>테스트 환경 설정</title>
  <link rel="stylesheet" href="<%=contextPath%>/kiosk_css/test_select.css"/>
</head>
<body>
<div class="screen">

  <header class="top-header">
    <h1 class="header-title">테스트 환경 설정</h1>
    <p class="header-desc">테스트할 지점과 키오스크를 선택해주세요</p>
    <div class="header-badge">ZEROLOSS</div>
  </header>

  <main class="main-content">
    <section class="test-card">

      <div class="test-badge">TEST MODE</div>

      <p class="test-desc">
        이 화면은 개발 테스트용입니다.<br/>
        운영 환경에서는 표시되지 않습니다.
      </p>

      <div class="form-group">
        <label class="form-label" for="branchSelect">지점 선택</label>
        <select class="form-select" id="branchSelect">
          <option value="">지점을 선택하세요</option>
          <option value="1">강남점 (BR001)</option>
          <option value="2">홍대점 (BR002)</option>
          <option value="3">신촌점 (BR003)</option>
          <option value="4">건대점 (BR004)</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label" for="kioskSelect">키오스크 선택</label>
        <select class="form-select" id="kioskSelect" disabled>
          <option value="">지점을 먼저 선택하세요</option>
        </select>
      </div>

      <div class="selected-info">
        <div class="info-row">
          <span class="info-label">선택 지점</span>
          <span class="info-value" id="infoText">-</span>
        </div>
        <div class="info-row">
          <span class="info-label">키오스크</span>
          <span class="info-value" id="infoKiosk">-</span>
        </div>
      </div>

      <button type="button" class="confirm-btn" id="confirmBtn" disabled>
        테스트 시작
      </button>

    </section>
  </main>

</div>

<script src="<%=contextPath%>/kiosk_js/test_select.js"></script>
<script>
  const contextPath = '<%=contextPath%>';

  document.getElementById('confirmBtn').addEventListener('click', function () {
    window.goStart(contextPath);
  });
</script>
</body>
</html>