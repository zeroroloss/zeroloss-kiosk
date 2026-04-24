const pending = JSON.parse(sessionStorage.getItem('item') || 'null');

function moveToMenu() {
  const path = location.pathname;
  const kioskIndex = path.indexOf('/kiosk_jsp/');
  const basePath = kioskIndex >= 0 ? path.substring(0, kioskIndex) : '';
  location.href = basePath + '/kiosk_jsp/menu.jsp';
}

if (!pending) {
  alert('주문 정보 없음');
  moveToMenu();
  throw new Error('item not found in sessionStorage');
}

let qty = pending.quantity || 1;

const summaryList = document.getElementById('summaryList');
const totalPrice = document.getElementById('totalPrice');
const qtyValue = document.getElementById('qtyValue');

function format(v) {
  return Number(v || 0).toLocaleString() + '원';
}

function render() {
  if (!summaryList || !totalPrice || !qtyValue) return;

  const rows = [];

  rows.push(['메뉴', pending.menu || '-']);

  if (pending.menuType === 'sandwich') {
    rows.push(['빵', pending.bread || '-']);
  }

  rows.push(['치즈', pending.cheese || '-']);
  rows.push(['야채', pending.vegetable || '-']);
  rows.push(['소스', pending.sauce || '-']);
  rows.push(['추가', pending.extra || '-']);

  summaryList.innerHTML = rows.map(r => `
    <div class="summary-row">
      <div class="summary-label">${r[0]}</div>
      <div class="summary-value">${r[1] || '-'}</div>
    </div>
  `).join('');

  qtyValue.textContent = qty;

  const price = Number(pending.basePrice || 0) + Number(pending.extraPrice || 0);
  totalPrice.textContent = format(price * qty);
}

/* 수량 */
const minusBtn = document.getElementById('minusBtn');
const plusBtn = document.getElementById('plusBtn');

if (minusBtn) {
  minusBtn.onclick = () => {
    if (qty > 1) {
      qty--;
      render();
    }
  };
}

if (plusBtn) {
  plusBtn.onclick = () => {
    qty++;
    render();
  };
}

/* 장바구니 처리 */
function processCart() {
  let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
  
  const item = { ...pending, quantity: qty };

  const same = cart.find(c =>
    c.menu === item.menu &&
    c.menuType === item.menuType &&
    c.bread === item.bread &&
    c.cheese === item.cheese &&
    c.vegetable === item.vegetable &&
    c.sauce === item.sauce &&
    c.extra === item.extra
  );

  if (same) {
    same.quantity += qty;
  } else {
    item.id = Date.now();
    cart.push(item);
  }

  sessionStorage.setItem('cart', JSON.stringify(cart));
  sessionStorage.removeItem('item');
}

/* 버튼 함수 */
window.addCart = function (contextPath) {
  processCart();
  location.href = contextPath + '/kiosk_jsp/menu/menu.jsp';
};

window.goPay = function (contextPath) {
  processCart();
  location.href = contextPath + '/kiosk_jsp/menu/order_confirm.jsp';
};

window.goBack = function (contextPath) {
  sessionStorage.setItem('item', JSON.stringify({
    ...pending,
    quantity: qty
  }));
  location.href = contextPath + '/kiosk_jsp/menu/option.jsp';
};

render();