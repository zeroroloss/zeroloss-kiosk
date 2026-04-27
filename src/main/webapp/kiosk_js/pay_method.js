const CART_KEY = 'cart';
const PAYMENT_METHOD_KEY = 'selectedPaymentMethod';

const paymentGrid = document.getElementById('paymentGrid');
const finalAmount = document.getElementById('finalAmount');

let selectedMethod = 'card';

function getCart() {
    try {
        return JSON.parse(sessionStorage.getItem(CART_KEY)) || {};
    } catch {
        return {};
    }
}

function formatPrice(v) {
    return Number(v || 0).toLocaleString() + '원';
}

function renderAmount() {
    if (!finalAmount) return;
    const cartData = getCart();
    finalAmount.textContent = formatPrice(cartData.totalAmount || 0);
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

function addInput(form, name, value) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
}

window.goBack = function(contextPath) {
    location.href = contextPath + '/kiosk_jsp/menu/order_confirm.jsp';
};

/*window.goNext = function() {
    const cartData = getCart();
    const items = cartData.items || [];

    if (!items.length) {
        alert('장바구니가 비어있습니다.');
        return;
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = contextPath + '/kiosk/order';

    addInput(form, 'totalAmount', cartData.totalAmount || 0);
    addInput(form, 'menuCount', items.length);

    items.forEach((item, i) => {
    addInput(form, `recipeCode${i}`, item.recipeCode);
    addInput(form, `menuName${i}`, item.menuName);
    addInput(form, `qty${i}`, item.qty || 1);
    addInput(form, `unit_price${i}`, item.price || 0);
    addInput(form, `lineTotalAmount${i}`, item.totalPrice || 0);

    const options = item.options || [];
    addInput(form, `optionCount${i}`, options.length);

    options.forEach((option, j) => {
        addInput(form, `materialCode${i}_${j}`, option.materialCode);
        addInput(form, `materialName${i}_${j}`, option.materialName);
        addInput(form, `materialPrice${i}_${j}`, option.price || 0);
        addInput(form, `materialGroupId${i}_${j}`, option.materialGroupId);
    });
});*/

    document.body.appendChild(form);
    form.submit();
};

renderAmount();
renderSelected();