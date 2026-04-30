<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>키오스크 로그인</title>
<link rel="stylesheet" href="${contextPath}/kiosk_css/login.css"/>
</head>
<body>
<div class="screen">

<header class="top-header">
    <h1 class="header-title">키오스크 로그인</h1>
    <p class="header-desc">관리자 계정으로 로그인해주세요</p>
    <div class="header-badge">ZEROLOSS</div>
</header>

<main class="main-content">
<section class="login-card">

    <c:if test="${not empty errorMsg}">
        <div class="error-msg">${errorMsg}</div>
    </c:if>

    <form id="loginForm" action="${contextPath}/kiosk/login" method="post">

        <div class="form-group">
            <label class="form-label" for="branchSelect">지점 선택</label>
            <select class="form-select" id="branchSelect" name="branchCode">zl
                <option value="">지점을 선택하세요</option>
                <c:forEach var="branch" items="${branchList}">
                    <option value="${branch.branch_code}"
                        <c:if test="${branch.branch_code == selectedBranchCode}">selected</c:if>>
                        ${branch.name} (${branch.branch_code})
                    </option>
                </c:forEach>
            </select>
        </div>

        <div class="form-group">
            <label class="form-label" for="kioskSelect">키오스크 선택</label>
           <select class="form-select" id="kioskSelect" name="kiosk_id" disabled>
    			<option value="">지점을 먼저 선택하세요</option>
		   </select>
        </div>

        <div class="form-group">
            <label class="form-label" for="loginId">아이디</label>
            <input class="form-input" type="text" id="loginId"
                   name="loginId" placeholder="아이디를 입력하세요"
                   value="${param.loginId}"/>
        </div>

        <div class="form-group">
            <label class="form-label" for="password">비밀번호</label>
            <input class="form-input" type="password" id="password"
                   name="password" placeholder="비밀번호를 입력하세요"/>
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

        <button type="submit" class="confirm-btn" id="confirmBtn" disabled>
            로그인
        </button>

    </form>

</section>
</main>

</div>

<script>
const contextPath = "${contextPath}";


// 지점 선택 시 키오스크 목록 AJAX 조회
document.getElementById('branchSelect').addEventListener('change', function () {
    const branchCode = this.value;
    const kioskSelect = document.getElementById('kioskSelect');
    const infoText    = document.getElementById('infoText');

    if (!branchCode) {
        kioskSelect.innerHTML = '<option value="">지점을 먼저 선택하세요</option>';
        kioskSelect.disabled = true;
        infoText.textContent = '-';
        updateConfirmBtn();
        return;
    }

    infoText.textContent = this.options[this.selectedIndex].text;

    // AJAX로 키오스크 목록 조회
    fetch(contextPath + "/kiosk/login?branchCode=" + branchCode)
        .then(res => res.json())
        .then(kiosks => {
            kioskSelect.innerHTML = '<option value="">키오스크를 선택하세요</option>';
            kiosks.forEach(k => {
                kioskSelect.innerHTML +=
                	'<option value="' + k.kiosk_id + '">' + k.kiosk_id + '번 키오스크</option>';
            });
            kioskSelect.disabled = false;
            updateConfirmBtn();
        });
});

// 키오스크 선택 시 표시
document.getElementById('kioskSelect').addEventListener('change', function () {
    document.getElementById('infoKiosk').textContent =
        this.value ? this.options[this.selectedIndex].text : '-';
    updateConfirmBtn();
});

// 아이디/비밀번호 입력 시 버튼 활성화 체크
document.getElementById('loginId').addEventListener('input', updateConfirmBtn);
document.getElementById('password').addEventListener('input', updateConfirmBtn);

function updateConfirmBtn() {
    const branchCode = document.getElementById('branchSelect').value;
    const kioskId    = document.getElementById('kioskSelect').value;
    const loginId    = document.getElementById('loginId').value;
    const password   = document.getElementById('password').value;

    document.getElementById('confirmBtn').disabled =
        !(branchCode && kioskId && loginId && password);
}
</script>
</body>
</html>