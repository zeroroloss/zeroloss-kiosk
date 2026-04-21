const CART_KEY = 'cart';

const orderList = document.getElementById('orderList');
const emptyBox = document.getElementById('emptyBox');
const totalPrice = document.getElementById('totalPrice');

function getCart() {
  try {
    return JSON.parse(sessionStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function formatPrice(v) {
  return Number(v || 0).toLocaleString() + '원';
}

function makeRows(item) {
  const rows = [];

  if (item.menu) rows.push({ label: '메뉴', value: item.menu });

  if (item.menuType === 'sandwich' && item.bread) {
    rows.push({ label: '빵', value: item.bread });
  }

  if (item.cheese) rows.push({ label: '치즈', value: item.cheese });
  if (item.vegetable) rows.push({ label: '야채', value: item.vegetable });
  if (item.extra) rows.push({ label: '추가', value: item.extra });
  if (item.sauce) rows.push({ label: '소스', value: item.sauce });

  return rows;
}

function getItemTotal(item) {
  return Number(item.totalPrice || item.basePrice || 0) * Number(item.quantity || 1);
}

function getCartTotal(cart) {
  return cart.reduce((sum, item) => sum + getItemTotal(item), 0);
}

function renderOrders() {
  const cart = getCart();

  if (!cart.length) {
    if (orderList) orderList.style.display = 'none';
    if (emptyBox) emptyBox.style.display = 'flex';
    if (totalPrice) totalPrice.textContent = '0원';
    return;
  }

  if (orderList) orderList.style.display = 'flex';
  if (emptyBox) emptyBox.style.display = 'none';

  if (!orderList) return;

  orderList.innerHTML = cart.map(item => {
    const rows = makeRows(item);

    return `
      <div class="order-item" data-cart-id="${item.id}">
        <div class="order-tags">
          ${rows.map(row => `
            <div class="order-tag-row">
              <div class="order-tag">${row.label}</div>
              <div class="order-value">${row.value}</div>
            </div>
          `).join('')}
        </div>

        <div class="order-bottom">
          <div class="qty-box">
            <span>수량</span>
            <button type="button" class="qty-btn" data-action="minus">-</button>
            <span class="qty-value">${item.quantity || 1}</span>
            <button type="button" class="qty-btn" data-action="plus">+</button>
          </div>

          <div class="item-price">${formatPrice(getItemTotal(item))}</div>

          <button type="button" class="remove-btn" data-action="remove">×</button>
        </div>
      </div>
    `;
  }).join('');

  if (totalPrice) {
    totalPrice.textContent = formatPrice(getCartTotal(cart));
  }

  bindEvents();
}

function bindEvents() {
  document.querySelectorAll('.order-item').forEach(el => {
    const id = el.dataset.cartId;

    const minusBtn = el.querySelector('[data-action="minus"]');
    const plusBtn = el.querySelector('[data-action="plus"]');
    const removeBtn = el.querySelector('[data-action="remove"]');

    if (minusBtn) minusBtn.onclick = () => updateQty(id, -1);
    if (plusBtn) plusBtn.onclick = () => updateQty(id, 1);
    if (removeBtn) removeBtn.onclick = () => removeItem(id);
  });
}

function updateQty(id, delta) {
  const cart = getCart().map(item => {
    if (String(item.id) !== String(id)) return item;

    const next = Math.max(1, Number(item.quantity || 1) + delta);
    return { ...item, quantity: next };
  });

  saveCart(cart);
  renderOrders();
}

function removeItem(id) {
  const cart = getCart().filter(item => String(item.id) !== String(id));
  saveCart(cart);
  renderOrders();
}

window.goMenu = function(contextPath) {
  location.href = contextPath + '/kiosk_jsp/menu/menu.jsp';
};

window.goPay = function(contextPath) {
  const cart = getCart();

  if (!cart.length) {
    alert('장바구니가 비어있습니다.');
    return;
  }

  location.href = contextPath + '/kiosk_jsp/payment/pay_method.jsp';
};

renderOrders();