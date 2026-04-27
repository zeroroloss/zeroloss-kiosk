const CART_KEY = "cart";

const orderList = document.getElementById("orderList");
const emptyBox = document.getElementById("emptyBox");
const totalPrice = document.getElementById("totalPrice");

function createEmptyCart() {
	return {
		orderId: null,
		orderType: sessionStorage.getItem("orderType") || null,
		totalAmount: 0,
		items: []
	};
}

function getCart() {
	try {
		const cart = JSON.parse(sessionStorage.getItem(CART_KEY) || "null");

		if (!cart) return createEmptyCart();

		if (Array.isArray(cart)) {
			return {
				orderId: null,
				orderType: sessionStorage.getItem("orderType") || null,
				totalAmount: getCartTotal(cart),
				items: cart
			};
		}

		if (!cart.items) cart.items = [];

		return cart;
	} catch {
		return createEmptyCart();
	}
}

function saveCart(cart) {
	cart.totalAmount = getCartTotal(cart.items);
	sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function formatPrice(v) {
	return Number(v || 0).toLocaleString() + "원";
}

function makeRows(item) {
	const rows = [];

	rows.push({ label: "메뉴", value: item.menuName || "-" });

	(item.options || []).forEach(option => {
		rows.push({
			label: option.groupName || "옵션",
			value: option.materialName || "-"
		});
	});

	return rows;
}

function getItemTotal(item) {
	return Number(item.totalPrice || item.price || 0) * Number(item.qty || 1);
}

function getCartTotal(items = []) {
	return items.reduce((sum, item) => sum + getItemTotal(item), 0);
}

function renderOrders() {
	const cart = getCart();
	const items = cart.items || [];

	if (!items.length) {
		if (orderList) orderList.style.display = "none";
		if (emptyBox) emptyBox.style.display = "flex";
		if (totalPrice) totalPrice.textContent = "0원";
		return;
	}

	if (orderList) orderList.style.display = "flex";
	if (emptyBox) emptyBox.style.display = "none";

	if (!orderList) return;

	orderList.innerHTML = items.map(item => {
		const rows = makeRows(item);

		return `
			<div class="order-item" data-cart-id="${item.id}">
				<div class="order-tags">
					${rows.map(row => `
						<div class="order-tag-row">
							<div class="order-tag">${row.label}</div>
							<div class="order-value">${row.value}</div>
						</div>
					`).join("")}
				</div>

				<div class="order-bottom">
					<div class="qty-box">
						<span>수량</span>
						<button type="button" class="qty-btn" data-action="minus">-</button>
						<span class="qty-value">${item.qty || 1}</span>
						<button type="button" class="qty-btn" data-action="plus">+</button>
					</div>

					<div class="item-price">${formatPrice(getItemTotal(item))}</div>

					<button type="button" class="remove-btn" data-action="remove">×</button>
				</div>
			</div>
		`;
	}).join("");

	if (totalPrice) {
		totalPrice.textContent = formatPrice(cart.totalAmount);
	}

	bindEvents();
}

function bindEvents() {
	document.querySelectorAll(".order-item").forEach(el => {
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
	const cart = getCart();

	cart.items = cart.items.map(item => {
		if (String(item.id) !== String(id)) return item;

		const nextQty = Math.max(1, Number(item.qty || 1) + delta);

		return {
			...item,
			qty: nextQty
		};
	});

	saveCart(cart);
	renderOrders();
}

function removeItem(id) {
	const cart = getCart();

	cart.items = cart.items.filter(item => String(item.id) !== String(id));

	saveCart(cart);
	renderOrders();
}

window.goMenu = function() {
	location.href = contextPath + "/kiosk/menu";
};

window.goPay = async function() {
    const cart = getCart();
    const items = cart.items || [];

    if (!items.length) {
        alert("장바구니가 비어있습니다.");
        return;
    }

    try {
        // ✅ FormData 빌드 (기존 주석 코드 재활용)
        const params = new URLSearchParams();
params.append("totalAmount", cart.totalAmount || 0);
params.append("menuCount", items.length);

items.forEach((item, i) => {
    params.append(`recipeCode${i}`, item.recipeCode);
    params.append(`menuName${i}`, item.menuName);
    params.append(`qty${i}`, item.qty || 1);
    params.append(`unit_price${i}`, item.price || 0);
    params.append(`lineTotalAmount${i}`, getItemTotal(item));

    const options = item.options || [];
    params.append(`optionCount${i}`, options.length);

    options.forEach((option, j) => {
        params.append(`materialCode${i}_${j}`, option.materialCode);
    });
});

const res = await fetch(contextPath + "/kiosk/order", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString()
});

        const data = await res.json();

        if (!data.success) {
            alert("주문 저장에 실패했습니다.");
            return;
        }

        // ✅ 토스 결제 요청
        const tossPayments = TossPayments("");
        const payment = tossPayments.payment({
            customerKey: "KIOSK_" + Date.now()
        });

        await payment.requestPayment({
            method: "CARD",
            amount: {
                currency: "KRW",
                value: cart.totalAmount
            },
            orderId: data.orderId,
            orderName: "제로로스 키오스크 주문",
            successUrl: location.origin + contextPath + "/kiosk/payment/success",
            failUrl:    location.origin + contextPath + "/kiosk/payment/fail",
        });

    } catch (e) {
        alert("결제 중 오류가 발생했습니다: " + e.message);
    }
};

function addInput(form, name, value) {
	const input = document.createElement("input");
	input.type = "hidden";
	input.name = name;
	input.value = value;
	form.appendChild(input);
}

renderOrders();