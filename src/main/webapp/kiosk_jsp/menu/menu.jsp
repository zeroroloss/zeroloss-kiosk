<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    String contextPath = request.getContextPath();
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>키오스크 메뉴 화면</title>

  <link rel="stylesheet" href="<%=contextPath%>/kiosk_css/common.css" />
  <link rel="stylesheet" href="<%=contextPath%>/kiosk_css/menu.css?v=5" />
</head>

<body>
  <div class="app">
    <header class="top-header">
      <h1 class="header-title">메뉴 선택 화면</h1>
      <p class="header-desc">원하시는 메뉴를 선택한 뒤 옵션을 확인해주세요</p>
      <div class="header-highlight" id="headerHighlight">샌드위치</div>
    </header>

    <main class="content">
      <section class="main-tabs" id="mainTabs"></section>
      <section class="sub-tabs" id="subTabs"></section>

      <section class="menu-area">
        <button type="button" class="arrow left" id="leftArrow">&lt;</button>
        <button type="button" class="arrow right" id="rightArrow">&gt;</button>
        <div class="menu-grid" id="menuGrid"></div>
      </section>
    </main>

    <section class="cart-panel" id="cartPanel">
      <div class="cart-empty" id="cartEmpty">
        <div class="title">장바구니가 비어있습니다</div>
        <div class="desc">원하는 메뉴를 선택해주세요</div>
      </div>

      <div class="cart-filled" id="cartFilled">
        <div class="cart-list" id="cartList"></div>
        <div class="cart-summary">
          <div class="cart-total">
            <span class="cart-total-label">총 금액</span>
            <span class="cart-total-price" id="cartTotalPrice">0원</span>
          </div>
          <button type="button" class="cart-pay-btn" id="cartPayBtn">결제하기</button>
        </div>
      </div>
    </section>
  </div>
  
  <script> const contextPath = "<%=contextPath%>"; </script>

  <script>
    const recipeList = [
    <c:forEach var="r" items="${recipeList}" varStatus="s">
      {
        recipeCode: "${r.recipeCode}",
        categoryId: ${r.categoryId},
        subCategoryCode: "${r.subCategoryCode}",
        name: "${r.name}",
        price: ${r.price},
        imgUrl: "${r.imgUrl}"
      }<c:if test="${!s.last}">,</c:if>
    </c:forEach>
    ];

    const mainCategoryList = [
    <c:forEach var="m" items="${mainCategoryList}" varStatus="s">
      {
        categoryId: ${m.categoryId},
        name: "${m.name}"
      }<c:if test="${!s.last}">,</c:if>
    </c:forEach>
    ];

    const subCategoryList = [
    <c:forEach var="s" items="${subCategoryList}" varStatus="st">
      {
        subCategoryCode: "${s.subCategoryCode}",
        categoryId: ${s.categoryId},
        name: "${s.name}"
      }<c:if test="${!st.last}">,</c:if>
    </c:forEach>
    ];

    console.log("recipeList", recipeList);
    console.log("mainCategoryList", mainCategoryList);
    console.log("subCategoryList", subCategoryList);
  </script>

  <script>
  window.goOptionPage = function(item) {
    const categoryId = item.categoryId;

    if (!categoryId) {
      alert("categoryId 없음");
      return;
    }

    sessionStorage.setItem("item", JSON.stringify(item));

    location.href = contextPath + "/kiosk/option?categoryId=" + categoryId;
  };

  document.getElementById("cartPayBtn").addEventListener("click", function() {
    const cart = JSON.parse(sessionStorage.getItem("cart") || "null");

    if (!cart || !cart.items || !cart.items.length) {
      alert("장바구니에 담긴 메뉴가 없습니다.");
      return;
    }

    location.href = contextPath + "/kiosk/orderCon";
  });
</script>

<script>
    const unavailableRecipeCodes = [
        <c:forEach var="code" items="${unavailableRecipeCodes}" varStatus="st">
            ${code}<c:if test="${!st.last}">,</c:if>
        </c:forEach>
    ];

    console.log("품절 메뉴 코드:", unavailableRecipeCodes);
</script>

    <script src="<%=contextPath%>/kiosk_js/menu.js"></script>
    <script src="<%=contextPath%>/kiosk_js/timer.js"></script>
</body>
</html>