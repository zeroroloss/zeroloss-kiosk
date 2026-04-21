const CART_KEY = 'cart';
const PAYMENT_METHOD_KEY = 'selectedPaymentMethod';

const paymentAmount = document.getElementById('paymentAmount');
const methodBadge = document.getElementById('methodBadge');
const processMessage = document.getElementById('processMessage');
const processSub = document.getElementById('processSub');

const errorOverlay = document.getElementById('errorOverlay');
const errorReason = document.getElementById('errorReason');

/* ===== 결제 메타 ===== */

const methodMeta = {
  card: {
    label: '신용카드',
    message: '카드를 넣어주세요',
    sub: '결제 승인 중입니다',
    success: true
  },
  kakao: {
    label: '카카오페이',
    message: '카카오페이 승인 요청 중',
    sub: '모바일 확인해주세요',
    success: false,
    error: '잔액 부족'
  },
  naver: {
    label: '네이버페이',
    message: '네이버페이 연결 중',
    sub: '네트워크 확인 중',
    success: false,
    error: '네트워크 오류'
  },
  payco: {
    label: '페이코',
    message: '페이코 인증 중',
    sub: '잠시만 기다려주세요',
    success: false,
    error: '인증 시간 초과'
  }
};

/* ===== 공통 ===== */

function getCart() {
  try {
    return JSON.parse(sessionStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function formatPrice(v) {
  return Number(v || 0).toLocaleString() + '원';
}

function getCartTotal(cart) {
  return cart.reduce((sum, item) =>
    sum + (item.totalPrice || item.basePrice || 0) * (item.quantity || 1), 0);
}

/* ===== 초기화 ===== */

function init(contextPath) {

  const cart = getCart();

  if (!cart.length) {
    alert('장바구니 비어있음');
    location.href = contextPath + '/kiosk_jsp/menu/menu.jsp';
    return null;
  }

  const method = sessionStorage.getItem(PAYMENT_METHOD_KEY) || 'card';
  const meta = methodMeta[method];

  paymentAmount.textContent = formatPrice(getCartTotal(cart));
  methodBadge.textContent = meta.label;
  processMessage.textContent = meta.message;
  processSub.textContent = meta.sub;

  return meta;
}

/* ===== 실패 처리 ===== */

function showError(msg) {
  errorReason.textContent = msg;
  errorOverlay.style.display = 'flex';
}

window.goBack = function(contextPath) {
  location.href = contextPath + '/kiosk_jsp/payment/pay_method.jsp';
};

/* ===== 실행 ===== */

const contextPath = window.contextPath || '';

const meta = init(contextPath);

if (meta) {
  setTimeout(() => {

    if (meta.success) {
      sessionStorage.removeItem(PAYMENT_METHOD_KEY);
      sessionStorage.removeItem('cart');

      location.href = contextPath + '/kiosk_jsp/complete/receipt.jsp';
    } else {
      showError(meta.error);
    }

  }, 1500);
}