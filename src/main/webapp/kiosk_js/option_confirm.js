const ITEM_KEY = "item";
const CART_KEY = "cart";

let item = JSON.parse(sessionStorage.getItem(ITEM_KEY) || "null");

function moveToMenu() {
	location.href = contextPath + "/kiosk/menu";
}

if (!item) {
	alert("주문 정보 없음");
	moveToMenu();
	throw new Error("item not found in sessionStorage");
}

let qty = Number(item.qty || 1);

const summaryList = document.getElementById("summaryList");
const totalPrice = document.getElementById("totalPrice");
const qtyValue = document.getElementById("qtyValue");

function format(v) {
	return Number(v || 0).toLocaleString() + "원";
}

function getItemUnitPrice(item) {
	return Number(item.totalPrice || item.price || 0);
}

function createEmptyCart() {
	return {
		orderId: null,
		orderType: sessionStorage.getItem("orderType") || null,
		totalAmount: 0,
		items: []
	};
}

function calculateTotalAmount(items = []) {
	return items.reduce((sum, item) => {
		return sum + Number(item.totalPrice || item.price || 0) * Number(item.qty || 1);
	}, 0);
}

function getCart() {
	const savedCart = JSON.parse(sessionStorage.getItem(CART_KEY) || "null");

	if (!savedCart) {
		return createEmptyCart();
	}

	if (Array.isArray(savedCart)) {
		return {
			orderId: null,
			orderType: sessionStorage.getItem("orderType") || null,
			totalAmount: calculateTotalAmount(savedCart),
			items: savedCart
		};
	}

	if (!savedCart.items) {
		savedCart.items = [];
	}

	return savedCart;
}

function calculateUsedMaterialsFromCart() {
	const cart = getCart();
	const used = {};

	(cart.items || []).forEach(cartItem => {
		const qty = Number(cartItem.qty || 1);

		const defaultMaterials =
			(cartItem.defaultMaterials && cartItem.defaultMaterials.length)
				? cartItem.defaultMaterials
				: (recipeMaterialMap[String(cartItem.recipeCode)] || []);

		defaultMaterials.forEach(m => {
			const code = String(m.materialCode);
			const needQty = Number(m.deductQty || m.requiredQty || 1) * qty;

			used[code] = (used[code] || 0) + needQty;
		});

		(cartItem.options || []).forEach(o => {
			const code = String(o.materialCode);
			const needQty = Number(o.deductQty || 1) * qty;

			used[code] = (used[code] || 0) + needQty;
		});
	});

	return used;
}

function isOptionConfirmStockAvailable(nextQty) {
	const used = calculateUsedMaterialsFromCart();

	const defaultMaterials =
		(item.defaultMaterials && item.defaultMaterials.length)
			? item.defaultMaterials
			: (recipeMaterialMap[String(item.recipeCode)] || []);

	defaultMaterials.forEach(m => {
		const code = String(m.materialCode);
		const needQty = Number(m.deductQty || m.requiredQty || 1) * nextQty;

		used[code] = (used[code] || 0) + needQty;
	});

	(item.options || []).forEach(o => {
		const code = String(o.materialCode);
		const needQty = Number(o.deductQty || 1) * nextQty;

		used[code] = (used[code] || 0) + needQty;
	});

	console.log("option_confirm used", used);

	return Object.keys(used).every(code => {
		const dbQty = Number(stockMap[code] || 0);
		const usedQty = Number(used[code] || 0);

		console.log("stock check detail", {
			code,
			dbQty,
			usedQty,
			remain: dbQty - usedQty
		});

		return dbQty - usedQty >= 0;
	});
}

function saveCart(cart) {
	cart.totalAmount = calculateTotalAmount(cart.items);
	sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function isSameOptions(options1 = [], options2 = []) {
	return JSON.stringify(options1) === JSON.stringify(options2);
}

function makeOptionRows(options = []) {
	if (!options.length) return [];

	const grouped = {};

	options.forEach(option => {
		const group = option.groupName || option.optionGroupName || "옵션";
		const name = option.materialName || option.optionName || "";

		if (!grouped[group]) {
			grouped[group] = [];
		}

		grouped[group].push(name);
	});

	return Object.keys(grouped).map(group => {
		return [group, grouped[group].join(", ")];
	});
}

function render() {
	if (!summaryList || !totalPrice || !qtyValue) return;

	const rows = [];

	rows.push(["메뉴", item.menuName || "-"]);

	makeOptionRows(item.options || []).forEach(row => {
		rows.push(row);
	});

	summaryList.innerHTML = rows.map(row => `
		<div class="summary-row">
			<div class="summary-label">${row[0]}</div>
			<div class="summary-value">${row[1] || "-"}</div>
		</div>
	`).join("");

	qtyValue.textContent = qty;
	totalPrice.textContent = format(getItemUnitPrice(item) * qty);
}

/* 수량 */
const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");

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
		const nextQty = qty + 1;

		const canIncrease = isOptionConfirmStockAvailable(nextQty);

		console.log("nextQty", nextQty);
		console.log("stock check", canIncrease);

		if (!canIncrease) {
			alert("재고가 부족해서 수량을 더 늘릴 수 없습니다.");
			return;
		}

		qty = nextQty;
		item.qty = qty;
		render();
	};
}

/* 장바구니 처리 */
function addItemToCart() {
	const cart = getCart();

	const cartItem = {
		...item,
		qty: qty,
		totalPrice: getItemUnitPrice(item)
	};

	const sameItem = cart.items.find(savedItem =>
		savedItem.recipeCode == cartItem.recipeCode &&
		isSameOptions(savedItem.options, cartItem.options)
	);

	if (sameItem) {
		sameItem.qty += qty;
		sameItem.totalPrice = getItemUnitPrice(cartItem);
	} else {
		cart.items.push(cartItem);
	}

	saveCart(cart);
	sessionStorage.removeItem(ITEM_KEY);
}

/* 버튼 함수 */
window.addCart = function () {
	if (!isOptionConfirmStockAvailable(qty)) {
		alert("재고가 부족해서 장바구니에 담을 수 없습니다.");
		return;
	}

	addItemToCart();
	location.href = contextPath + "/kiosk/menu";
};

window.goPay = function () {
	if (!isOptionConfirmStockAvailable(qty)) {
		alert("재고가 부족해서 결제할 수 없습니다.");
		return;
	}

	addItemToCart();
	location.href = contextPath + "/kiosk/orderCon";
};

window.goBack = function () {
	item.qty = qty;
	sessionStorage.setItem(ITEM_KEY, JSON.stringify(item));
	location.href = contextPath + "/kiosk/option?categoryId=" + item.categoryId;
};

render();