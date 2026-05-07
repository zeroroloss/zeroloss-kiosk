let timer = null;

function restartOrder() {
	location.href = contextPath + "/kiosk/start";
}

function resetIdleTimer() {
	clearTimeout(timer);
	const IDLE_TIMEOUT = 40000;

	timer = setTimeout(restartOrder, IDLE_TIMEOUT);
}

const RESET_EVENTS = ["click", "touchstart", "mousemove", "keydown"];

RESET_EVENTS.forEach(event => {
	document.addEventListener(event, resetIdleTimer);
});

resetIdleTimer();