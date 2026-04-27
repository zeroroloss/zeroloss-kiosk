let timer = null;

function restartOrder() {
	location.href = contextPath + "/kiosk/start";
}

function resetIdleTimer() {
	clearTimeout(timer);
	timer = setTimeout(restartOrder, 40000);
}

["click", "touchstart", "mousemove", "keydown"].forEach(event => {
	document.addEventListener(event, resetIdleTimer);
});

resetIdleTimer();