const CART_KEY = 'cart';
const PAYMENT_METHOD_KEY = 'selectedPaymentMethod';

const paymentAmount = document.getElementById('paymentAmount');
const methodBadge = document.getElementById('methodBadge');
const processMessage = document.getElementById('processMessage');
const processSub = document.getElementById('processSub');
const errorOverlay = document.getElementById('errorOverlay');
const errorReason = document.getElementById('errorReason');

const methodMeta = {
    card:   { label: '신용카드',   message: '카드를 넣어주세요',        sub: '결제 승인 중입니다' },
    kakao:  { label: '카카오페이', message: '카카오페이 승인 요청 중',   sub: '모바일 확인해주세요' },
    naver:  { label: '네이버페이', message: '네이버페이 연결 중',        sub: '네트워크 확인 중' },
    payco:  { label: '페이코',     message: '페이코 인증 중',            sub: '잠시만 기다려주세요' }
};

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
        sum + Number(item.totalPrice || item.basePrice || 0) * Number(item.qty || 1), 0);
}

function showError(msg) {
    if (errorReason) errorReason.textContent = msg;
    if (errorOverlay) errorOverlay.style.display = 'flex';
}

window.goBack = function(contextPath) {
    location.href = contextPath + '/kiosk_jsp/payment/pay_method.jsp';
};

/* ===== 실행 ===== */
const contextPath = window.contextPath || '';
const cart = getCart();

if (!cart.length) {
    alert('장바구니가 비어있습니다.');
    location.href = contextPath + '/kiosk_jsp/menu/menu.jsp';
}

const method = sessionStorage.getItem(PAYMENT_METHOD_KEY) || 'card';
const meta = methodMeta[method];
/*const totalAmount = getCartTotal(cart);
const orderId = 'ZEROLOSS_' + Date.now();*/

if (paymentAmount) paymentAmount.textContent = formatPrice(totalAmount);
if (methodBadge)   methodBadge.textContent   = meta.label;
if (processMessage) processMessage.textContent = meta.message;
if (processSub)    processSub.textContent     = meta.sub;

/* ===== 토스 위젯 ===== */
const clientKey  = 'test_ck_여기에_클라이언트키';
const customerKey = 'KIOSK_' + Date.now();

const paymentWidget = PaymentWidget(clientKey, customerKey);

paymentWidget.renderPaymentMethods(
    '#payment-widget',
    { value: totalAmount }
);

paymentWidget.renderAgreement('#agreement');

/* ===== cart 세션 저장 후 결제 ===== */
const payBtn = document.getElementById('payBtn');
if (payBtn) {
    payBtn.addEventListener('click', async () => {
        try {
           
            await paymentWidget.requestPayment({
                orderId: orderId,
                orderName: '제로로스 키오스크 주문',
                successUrl: location.origin + contextPath + '/kiosk/payment/success',
                failUrl:    location.origin + contextPath + '/kiosk/payment/fail',
            });
        } catch (e) {
            showError(e.message || '결제 중 오류가 발생했습니다.');
        }
    });
}