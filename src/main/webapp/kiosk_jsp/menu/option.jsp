<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%
String contextPath = request.getContextPath();
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>옵션 선택</title>

<link rel="stylesheet" href="<%=contextPath%>/kiosk_css/common.css">
<link rel="stylesheet" href="<%=contextPath%>/kiosk_css/option.css">
</head>

<body>
	<div class="screen">
		<section class="modal">

			<header class="modal-header">
				<button class="close-btn" id="closeBtn" type="button">×</button>
				<h1 class="modal-title">옵션 선택 화면</h1>
				<div class="menu-name-title" id="menuNameTitle"></div>
				<p class="modal-desc">원하시는 재료와 구성을 선택해주세요</p>
				<div class="step-tabs" id="stepTabs"></div>
			</header>

			<div class="option-scroll" id="optionScroll"></div>

			<div class="summary-bar">
				<div class="summary-price-wrap">
					<div class="summary-price-label">현재 금액</div>
					<div class="summary-price" id="totalPrice">0원</div>
				</div>
				<button class="next-btn" id="nextBtn" type="button">다음</button>
			</div>

			<div class="summary-panel">
				<div class="summary-panel-title">선택한 옵션</div>
				<div class="summary-grid" id="summaryGrid"></div>
			</div>

		</section>
	</div>

	<script>
	window.materialGroupList = [
		  <c:forEach var="g" items="${materialGroupList}" varStatus="s">
		  {
			  materialGroupId: ${g.materialGroupId},
			  groupName: "${g.groupName}",
			  groupMin: ${g.groupMin},
			  groupMax: ${g.groupMax}
		  }<c:if test="${!s.last}">,</c:if>
		  </c:forEach>
		];

window.optionMaterialList = [
  <c:forEach var="m" items="${materialList}" varStatus="s">
  {
    materialCode: "${m.materialCode}",
    materialName: "${m.materialName}",
    price: ${m.price == null ? 0 : m.price},
    materialGroupId: ${m.materialGroupId}
  }<c:if test="${!s.last}">,</c:if>
  </c:forEach>
];
</script>

	<script src="<%=contextPath%>/kiosk_js/option.js"></script>
	<script>
const contextPath = '<%=contextPath%>';

document.getElementById('closeBtn').onclick = function () {
  window.goBackMenu(contextPath);
};

document.getElementById('nextBtn').onclick = function () {
  window.goNext(contextPath);
};
</script>

</body>
</html>