const CART_KEY = 'cart';
const PAYMENT_METHOD_KEY = 'selectedPaymentMethod';

const paymentGrid = document.getElementById('paymentGrid');
const finalAmount = document.getElementById('finalAmount');

let selectedMethod = 'card';

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
  return cart.reduce((sum, item) => {
    return sum + Number(item.totalPrice || item.basePrice || 0) * Number(item.quantity || 1);
  }, 0);
}

function renderAmount() {
  if (!finalAmount) return;
  finalAmount.textContent = formatPrice(getCartTotal(getCart()));
}

function renderSelected() {
  if (!paymentGrid) return;

  paymentGrid.querySelectorAll('.payment-option').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.method === selectedMethod);
  });
}

if (paymentGrid) {
  paymentGrid.querySelectorAll('.payment-option').forEach(btn => {
    btn.onclick = () => {
      selectedMethod = btn.dataset.method;
      renderSelected();
    };
  });
}

window.goBack = function(contextPath) {
  location.href = contextPath + '/kiosk_jsp/menu/order_confirm.jsp';
};

window.goNext = function(contextPath) {
 /* const cart = getCart();

  if (!cart.length) {
    alert('장바구니가 비어있습니다.');
    location.href = contextPath + '/kiosk_jsp/menu/menu.jsp';
    return;
  }

  sessionStorage.setItem(PAYMENT_METHOD_KEY, selectedMethod);
  location.href = contextPath + '/kiosk_jsp/payment/pay_process.jsp';*/
  
  const cart = getCart();

    if (!cart.length) {
        alert('장바구니가 비어있습니다.');
        location.href = contextPath + '/kiosk_jsp/menu/menu.jsp';
        return;
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = contextPath + '/kiosk/payment';

    // 결제 수단
    addInput(form, 'payMethod', selectedMethod);

    // cart JSON 통째로
    addInput(form, 'cartJson', JSON.stringify(cart));

    // 클라이언트 총액
    addInput(form, 'clientTotalAmount', getCartTotal(cart));

    document.body.appendChild(form);
    form.submit();
};

function addInput(form, name, value) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
};

renderAmount();
renderSelected();