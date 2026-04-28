const CART_KEY = 'cart';
const PAYMENT_METHOD_KEY = 'selectedPaymentMethod';
const RECEIPT_PRINT_KEY = 'receiptPrint';
const SELECTED_MENU_KEY = 'selectedMenu';
const OPTION_EDIT_MODE_KEY = 'optionEditMode';

let remainSeconds = 10;
let timerId = null;

const orderNumber = document.getElementById('orderNumber');
const receiptStatus = document.getElementById('receiptStatus');
const countdown = document.getElementById('countdown');


/* ===== 세션 초기화 ===== */
function clearKioskSession() {
  sessionStorage.removeItem(CART_KEY);
  sessionStorage.removeItem(PAYMENT_METHOD_KEY);
  sessionStorage.removeItem(RECEIPT_PRINT_KEY);
  sessionStorage.removeItem(SELECTED_MENU_KEY);
  sessionStorage.removeItem(OPTION_EDIT_MODE_KEY);

  Object.keys(sessionStorage).forEach(key => {
    if (key.startsWith('optionState_') || key === 'pendingCartItem') {
      sessionStorage.removeItem(key);
    }
  });
}

/* ===== 홈 이동 ===== */
window.goHome = function(contextPath) {
  if (timerId) clearInterval(timerId);
  clearKioskSession();
  location.href = contextPath + '/kiosk/start';
};

/* ===== 렌더 ===== */

function renderReceiptStatus() {
  const receipt = sessionStorage.getItem(RECEIPT_PRINT_KEY);
  receiptStatus.textContent = receipt === 'Y' ? '출력함' : '미출력';
}

function startCountdown(contextPath) {
  countdown.textContent = remainSeconds;

  timerId = setInterval(() => {
    remainSeconds--;
    countdown.textContent = remainSeconds;

    if (remainSeconds <= 0) {
      window.goHome(contextPath);
    }
  }, 1000);
}

/* ===== 실행 ===== */

const contextPath = window.contextPath || '';

renderReceiptStatus();
startCountdown(contextPath);