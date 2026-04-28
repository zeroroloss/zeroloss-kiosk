const cartStorageKey = "cart";
const itemStorageKey = "item";

// DB 기준 상태값
let currentMainId = mainCategoryList.length ? Number(mainCategoryList[0].categoryId) : null;
let currentSubCode = null;

const mainTabs = document.getElementById("mainTabs");
const subTabs = document.getElementById("subTabs");
const menuGrid = document.getElementById("menuGrid");
const cartEmpty = document.getElementById("cartEmpty");
const cartFilled = document.getElementById("cartFilled");
const cartList = document.getElementById("cartList");
const cartTotalPrice = document.getElementById("cartTotalPrice");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const headerHighlight = document.getElementById("headerHighlight");

function createId() {
	return Date.now() + "_" + Math.random().toString(36).substring(2, 8);
}

function formatPrice(value) {
	return `${Number(value || 0).toLocaleString()}원`;
}

function initCurrentSubCategory() {
	const subs = subCategoryList.filter(s => Number(s.categoryId) === Number(currentMainId));
	currentSubCode = subs.length ? String(subs[0].subCategoryCode) : null;
}

// ================== 메뉴 탭 ==================
function createMainTabs() {
	mainTabs.innerHTML = mainCategoryList.map(cat => `
		<button class="tab ${Number(cat.categoryId) === currentMainId ? "active" : ""}"
			data-id="${cat.categoryId}">
			${cat.name}
		</button>
	`).join("");

	mainTabs.querySelectorAll("[data-id]").forEach(btn => {
		btn.addEventListener("click", () => {
			currentMainId = Number(btn.dataset.id);
			initCurrentSubCategory();
			render();
		});
	});
}

function createSubTabs() {
	const subs = subCategoryList.filter(s => Number(s.categoryId) === currentMainId);

	subTabs.innerHTML = subs.map(sub => `
		<button class="tab sub ${String(sub.subCategoryCode) === currentSubCode ? "active" : ""}"
			data-sub="${sub.subCategoryCode}">
			${sub.name}
		</button>
	`).join("");

	subTabs.querySelectorAll("[data-sub]").forEach(btn => {
		btn.addEventListener("click", () => {
			currentSubCode = String(btn.dataset.sub);
			createSubTabs();
			renderMenus();
		});
	});
}

// ================== 메뉴 출력 ==================
function renderMenus() {
	const currentMain = mainCategoryList.find(c => Number(c.categoryId) === currentMainId);
	headerHighlight.textContent = currentMain ? currentMain.name : "";

	let filtered = recipeList.filter(r => Number(r.categoryId) === currentMainId);

	const selectedSub = subCategoryList.find(s => String(s.subCategoryCode) === currentSubCode);

	if (selectedSub && selectedSub.name !== "전체") {
		filtered = filtered.filter(r => String(r.subCategoryCode) === currentSubCode);
	}

	menuGrid.innerHTML = filtered.map(item => {
		const isUnavailable = unavailableRecipeCodes.includes(Number(item.recipeCode));

		return `
        <article class="menu-card ${isUnavailable ? "sold-out" : ""}"
            data-name="${item.name}"
            data-price="${item.price}"
            data-category="${item.categoryId}"
            data-recipe-code="${item.recipeCode}">
            <div class="menu-thumb">
                ${item.imgUrl ? `<img src="/zero/${item.imgUrl}">` : `<div>이미지</div>`}
            </div>
            <div class="menu-name">${item.name}</div>
            <div class="menu-price">${formatPrice(item.price)}</div>
            ${isUnavailable ? `<div class="sold-out-badge">재고 부족</div>` : ""}
        </article>
    `;
	}).join("");

	menuGrid.querySelectorAll(".menu-card").forEach(card => {
		card.addEventListener("click", () => {
			handleMenuClick({
				recipeCode: card.dataset.recipeCode,
				menuName: card.dataset.name,
				price: Number(card.dataset.price),
				categoryId: Number(card.dataset.category)
			});
		});
	});
}

// ================== 메뉴 클릭 ==================
function resolveMenuType(categoryId) {
	if (categoryId === 1) return "sandwich";
	if (categoryId === 2) return "salad";
	if (categoryId === 3) return "side";
	if (categoryId === 4) return "drink_soup";
	return "";
}

function createBaseItem(menu) {
	const menuType = resolveMenuType(menu.categoryId);

	return {
		id: createId(),
		recipeCode: menu.recipeCode,
		menuName: menu.menuName,
		menuType: menuType,
		categoryId: menu.categoryId,
		qty: 1,
		price: Number(menu.price || 0),
		totalPrice: Number(menu.price || 0),
		defaultMaterials: [],
		options: []
	};
}

function handleMenuClick(menu) {
	if (unavailableRecipeCodes.includes(Number(menu.recipeCode))) {
		alert("현재 재고 부족으로 선택할 수 없는 메뉴입니다.");
		return;
	}
	const item = createBaseItem(menu);
	sessionStorage.setItem("item", JSON.stringify(item));
	if (item.menuType === "sandwich" || item.menuType === "salad") {
		window.goOptionPage(item);
		return;
	}

	addCartItem(item);
}

// ================== 장바구니 ==================
function createEmptyCart() {
	return {
		orderType: sessionStorage.getItem("orderType") || null,
		totalAmount: 0,
		items: []
	};
}

function getCart() {
	return JSON.parse(sessionStorage.getItem(cartStorageKey) || "null") || createEmptyCart();
}

function saveCart(cart) {
	cart.totalAmount = calculateTotalAmount(cart.items);
	sessionStorage.setItem(cartStorageKey, JSON.stringify(cart));
}

function calculateTotalAmount(items = []) {
	return items.reduce((total, item) => {
		return total + Number(item.price || 0) * Number(item.qty || 1);
	}, 0);
}

function isSameOptions(options1 = [], options2 = []) {
	return JSON.stringify(options1) === JSON.stringify(options2);
}

function addCartItem(item) {
	const cart = getCart();

	const sameItem = cart.items.find(cartItem =>
		cartItem.recipeCode == item.recipeCode &&
		isSameOptions(cartItem.options, item.options)
	);

	if (sameItem) {
		sameItem.qty += Number(item.qty || 1);
		sameItem.totalPrice = Number(sameItem.price) * Number(sameItem.qty);
	} else {
		cart.items.push({
			id: item.id || createId(),
			recipeCode: item.recipeCode,
			menuName: item.menuName,
			menuType: item.menuType,
			categoryId: item.categoryId,
			qty: Number(item.qty || 1),
			price: Number(item.price || 0),
			totalPrice: Number(item.price || 0) * Number(item.qty || 1),
			options: item.options || []
		});
	}

	saveCart(cart);
	renderCart();
}

function removeItem(id) {
	const cart = getCart();
	cart.items = cart.items.filter(item => item.id != id);

	saveCart(cart);
	renderCart();
}

function increaseQty(id) {
	const cart = getCart();
	const item = cart.items.find(item => item.id == id);
	if (!item) return;

	item.qty += 1;
	item.totalPrice = Number(item.price) * Number(item.qty);

	saveCart(cart);
	renderCart();
}

function decreaseQty(id) {
	const cart = getCart();
	const item = cart.items.find(item => item.id == id);
	if (!item) return;

	if (item.qty > 1) {
		item.qty -= 1;
		item.totalPrice = Number(item.price) * Number(item.qty);
	} else {
		cart.items = cart.items.filter(item => item.id != id);
	}

	saveCart(cart);
	renderCart();
}

function getTotalAmount() {
	const cart = getCart();
	return Number(cart.totalAmount || 0);
}

function renderOptionRows(options = []) {
	if (!options.length) return "";

	const grouped = {};

	options.forEach(option => {
		const group = option.groupName || option.optionGroupName || "옵션";
		const name = option.materialName || option.optionName || "";

		if (!grouped[group]) {
			grouped[group] = [];
		}

		grouped[group].push(name);
	});

	return Object.keys(grouped).map(group => `
		<div class="cart-tag-row">
			<div class="cart-tag">${group}</div>
			<div class="cart-tag-value">${grouped[group].join(", ")}</div>
		</div>
	`).join("");
}

function renderCart() {
	const cart = getCart();
	const items = cart.items || [];

	if (!items.length) {
		cartEmpty.style.display = "flex";
		cartFilled.style.display = "none";
		cartList.innerHTML = "";
		cartTotalPrice.innerText = "0원";
		return;
	}

	cartEmpty.style.display = "none";
	cartFilled.style.display = "flex";

	cartList.innerHTML = items.map(item => `
		<div class="cart-item">
			<div class="cart-tags">
				<div class="cart-tag-row">
					<div class="cart-tag">메뉴</div>
					<div class="cart-tag-value">${item.menuName || ""}</div>
				</div>

				${renderOptionRows(item.options)}
			</div>

			<div class="cart-bottom">
				<div class="cart-qty">
					<span class="cart-qty-label">수량</span>
					<button type="button" class="qty-btn" onclick="decreaseQty('${item.id}')">-</button>
					<span class="qty-value">${item.qty}</span>
					<button type="button" class="qty-btn" onclick="increaseQty('${item.id}')">+</button>
				</div>

				<div class="cart-price">
					${formatPrice(Number(item.price || 0) * Number(item.qty || 1))}
				</div>

				<button type="button" class="cart-remove" onclick="removeItem('${item.id}')">×</button>
			</div>
		</div>
	`).join("");

	cartTotalPrice.innerText = formatPrice(cart.totalAmount);
}

// ================== 이동 ==================
function moveSubTab(direction) {
	const subs = subCategoryList.filter(s => Number(s.categoryId) === currentMainId);
	const idx = subs.findIndex(s => String(s.subCategoryCode) === currentSubCode);

	if (idx === -1) return;

	const next = direction === "left"
		? (idx === 0 ? subs.length - 1 : idx - 1)
		: (idx === subs.length - 1 ? 0 : idx + 1);

	currentSubCode = String(subs[next].subCategoryCode);
	createSubTabs();
	renderMenus();
}

function render() {
	createMainTabs();
	createSubTabs();
	renderMenus();
}

// ================== 실행 ==================
leftArrow.addEventListener("click", () => moveSubTab("left"));
rightArrow.addEventListener("click", () => moveSubTab("right"));

initCurrentSubCategory();
render();
renderCart();