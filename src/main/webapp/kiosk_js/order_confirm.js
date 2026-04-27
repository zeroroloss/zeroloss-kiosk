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

window.goPay = function() {
	const cart = getCart();
	const items = cart.items || [];

	if (!items.length) {
		alert("장바구니가 비어있습니다.");
		return;
	}

	const form = document.createElement("form");
	form.method = "POST";
	form.action = contextPath + "/kiosk/order";

	addInput(form, "orderId", cart.orderId || "");
	addInput(form, "orderType", cart.orderType || "");
	addInput(form, "totalAmount", cart.totalAmount || 0);
	addInput(form, "menuCount", items.length);

	items.forEach((item, i) => {
		addInput(form, `recipeCode${i}`, item.recipeCode);
		addInput(form, `menuName${i}`, item.menuName);
		addInput(form, `qty${i}`, item.qty || 1);
		addInput(form, `unitPrice${i}`, item.price || 0);
		addInput(form, `lineTotalAmount${i}`, getItemTotal(item));

		const options = item.options || [];
		addInput(form, `optionCount_${i}`, options.length);

		options.forEach((option, j) => {
			addInput(form, `optMaterialCode_${i}_${j}`, option.materialCode);
			addInput(form, `optMaterialName_${i}_${j}`, option.materialName);
			addInput(form, `optMaterialPrice_${i}_${j}`, option.price || 0);
			addInput(form, `optMaterialGroupId_${i}_${j}`, option.materialGroupId);
		});
	});

	document.body.appendChild(form);
	form.submit();
};

function addInput(form, name, value) {
	const input = document.createElement("input");
	input.type = "hidden";
	input.name = name;
	input.value = value;
	form.appendChild(input);
}

renderOrders();