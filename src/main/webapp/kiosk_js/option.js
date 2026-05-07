const ITEM_KEY = "item";
const CART_KEY = "cart";
const MINI_ROTISSERIE_SALAD_CODE = 2027;
const materialGroupList = window.materialGroupList || [];
const materialList = window.optionMaterialList || [];

const materialStockList = window.materialStockList || [];

const stockMap = {};

materialStockList.forEach(m => {
	stockMap[Number(m.materialCode)] = m;
});

function moveToMenu() {
	location.href = contextPath + "/kiosk/menu";
}

let item = JSON.parse(sessionStorage.getItem(ITEM_KEY) || "null");

function isLargeSizeSelected() {
	const selectedSize = getSelectedOptionByGroupName("길이");

	if (!selectedSize) return false;

	return String(selectedSize.materialCode) === ACTION_CODE.SIZE_LARGE;
}

function getDefaultMultiplier() {
	if (item.menuType === "salad") return 2;
	if (isLargeSizeSelected()) return 2;
	return 1;
}

function getOptionMultiplier() {
	// 옵션은 mapper에서 미리 2배 처리되지 않음
	// 샐러드 또는 L빵이면 2배
	if (item.menuType === "salad") return 2;
	if (isLargeSizeSelected()) return 2;

	return 1;
}

if (!item) {
	moveToMenu();
	throw new Error("item 없음");
}

const OPTION_STATE_KEY = `optionState_${item.menuType}_${item.menuName}`;

const url = `${contextPath}/kiosk/recipeDetail?recipeCode=${item.recipeCode}`;

fetch(url)
	.then(res => {
		return res.json();
	})
	.then(data => {
		item.defaultMaterials = data.map(material => {
			return {
				materialCode: material.materialCode,
				materialName: material.materialName,
				requiredQty: Number(material.requiredQty || material.deductQty || 1),
				deductQty: Number(material.deductQty || material.requiredQty || 1),
				baseRequiredQty: Number(material.requiredQty || material.deductQty || 1)
			};
		});

		recalculateDefaultMaterials();

		renderSections();
		renderSummary();
	})
	.catch(() => {
		alert("옵션 정보를 불러오지 못했습니다.");
		moveToMenu();
	});

/* ===== 공통 함수 ===== */

function formatPrice(v) {
	return Number(v || 0).toLocaleString() + "원";
}

function getCart() {
	return JSON.parse(sessionStorage.getItem(CART_KEY) || "null") || {
		items: []
	};
}

function getOptionDeductQty(materialCode) {
	const stock = stockMap[Number(materialCode)];
	return stock ? Number(stock.deductQty || 1) : 1;
}

/* ===== 옵션 상태 생성 ===== */

const ACTION_CODE = {
	NO_CHEESE: "NO_CHEESE",
	CHEESE_ADD: "CHEESE_ADD",
	MEAT_ADD: "MEAT_ADD",
	NO_EXTRA: "NO_EXTRA",
	NO_VEGETABLE: "NO_VEGETABLE",
	SIZE_REGULAR: "SIZE_REGULAR",
	SIZE_LARGE: "SIZE_LARGE"
};

function createDefaultOptionConfig() {
	const sections = materialGroupList.map(group => {
		let options = materialList
			.filter(m => Number(m.materialGroupId) === Number(group.materialGroupId))

			// 빵 그룹에서는 L빵 107~112 숨김
			.filter(m => !(group.groupName === "빵" && Number(m.materialCode) >= 107 && Number(m.materialCode) <= 112))

			.filter(m => !(group.groupName === "치즈" && m.materialName === "치즈 제외"))
			.filter(m => !(group.groupName === "추가재료" && m.materialName === "치즈 추가"))
			.filter(m => !(group.groupName === "추가재료" && m.materialName === "미트추가"))
			.filter(m => !(group.groupName === "추가재료" && m.materialName === "재료 추가 없음"))
			.filter(m => !(group.groupName === "야채" && m.materialName === "야채 담지 않기"))
			.map(m => ({
				label: m.materialName,
				value: m.materialName,
				materialCode: m.materialCode,
				materialGroupId: group.materialGroupId,
				groupName: group.groupName,
				price: Number(m.price || 0),
				selected: false,
				actionOption: false
			}));

		if (group.groupName === "치즈") {
			options.unshift({
				label: "치즈 제외",
				value: "치즈 제외",
				materialCode: ACTION_CODE.NO_CHEESE,
				materialGroupId: group.materialGroupId,
				groupName: group.groupName,
				price: 0,
				selected: false,
				actionOption: true,
				deductQty: 0
			});
		}

		if (group.groupName === "야채") {
			options.unshift({
				label: "야채 담지 않기",
				value: "야채 담지 않기",
				materialCode: ACTION_CODE.NO_VEGETABLE,
				materialGroupId: group.materialGroupId,
				groupName: group.groupName,
				price: 0,
				selected: false,
				actionOption: true,
				deductQty: 0
			});
		}

		if (group.groupName === "추가재료") {
			options.unshift({
				label: "치즈 추가",
				value: "치즈 추가",
				materialCode: ACTION_CODE.CHEESE_ADD,
				materialGroupId: group.materialGroupId,
				groupName: group.groupName,
				price: 1500,
				selected: false,
				actionOption: true
			});

			options.unshift({
				label: "재료 추가 없음",
				value: "재료 추가 없음",
				materialCode: ACTION_CODE.NO_EXTRA,
				materialGroupId: group.materialGroupId,
				groupName: group.groupName,
				price: 0,
				selected: false,
				actionOption: true,
				deductQty: 0
			});

			options.splice(2, 0, {
				label: "미트추가",
				value: "미트추가",
				materialCode: ACTION_CODE.MEAT_ADD,
				materialGroupId: group.materialGroupId,
				groupName: group.groupName,
				price: 3000,
				selected: false,
				actionOption: true
			});
		}

		return {
			title: group.groupName,
			groups: [{
				key: "group_" + group.materialGroupId,
				materialGroupId: group.materialGroupId,
				title: group.groupName,
				type: Number(group.groupMax) === 1 ? "single" : "multi-limit",
				min: Number(group.groupMin || 0),
				max: Number(group.groupMax || 999),
				options: options
			}]
		};
	});

	const sizeSection = {
		title: "길이",
		groups: [{
			key: "group_size",
			materialGroupId: "SIZE",
			title: "길이",
			type: "single",
			min: 1,
			max: 1,
			options: [
				{
					label: "15cm",
					value: "15cm",
					materialCode: ACTION_CODE.SIZE_REGULAR,
					materialGroupId: "SIZE",
					groupName: "길이",
					price: 0,
					selected: true,
					actionOption: true,
					deductQty: 0
				},
				{
					label: "30cm",
					value: "30cm",
					materialCode: ACTION_CODE.SIZE_LARGE,
					materialGroupId: "SIZE",
					groupName: "길이",
					price: 6000,
					selected: false,
					actionOption: true,
					deductQty: 0
				}
			]
		}]
	};

	if (item.menuType === "sandwich") {
		sections.unshift(sizeSection);
	}

	return {
		steps: sections.map(section => section.title),
		activeStep: sections.length ? sections[0].title : "",
		sections: sections
	};
}

function restoreSelectedOptions(config) {
	if (!item.options || !item.options.length) return config;

	config.sections.forEach(section => {
		section.groups.forEach(group => {
			group.options.forEach(option => {
				option.selected = item.options.some(saved =>
					String(saved.materialCode) === String(option.materialCode)
				);
			});
		});
	});

	return config;
}

function loadOptionState() {
	try {
		const config = createDefaultOptionConfig();
		return restoreSelectedOptions(config);
	} catch (e) {
		return createDefaultOptionConfig();
	}
}

let optionConfig = loadOptionState();

if (!optionConfig.activeStep && optionConfig.steps.length > 0) {
	optionConfig.activeStep = optionConfig.steps[0];
}

/* ===== DOM ===== */

const stepTabs = document.getElementById("stepTabs");
const optionScroll = document.getElementById("optionScroll");
const summaryGrid = document.getElementById("summaryGrid");
const totalPrice = document.getElementById("totalPrice");
const menuNameTitle = document.getElementById("menuNameTitle");

if (menuNameTitle) {
	menuNameTitle.textContent = item.menuName || "";
}

/* ===== 핵심 함수 ===== */

function saveOptionState() {
	sessionStorage.setItem(OPTION_STATE_KEY, JSON.stringify(optionConfig));
}

function getSelectedLabels(group) {
	if (!group) return [];
	return group.options.filter(o => o.selected).map(o => o.value);
}

function findGroup(key) {
	for (const section of optionConfig.sections) {
		const group = section.groups.find(x => x.key === key);
		if (group) return group;
	}
	return null;
}

function getExtraPrice() {
	let price = 0;

	optionConfig.sections.forEach(section => {
		section.groups.forEach(group => {
			group.options.forEach(option => {
				if (option.selected) {
					price += Number(option.price || 0);
				}
			});
		});
	});

	return price;
}

function isGroupComplete(group) {
	if (!group) return false;

	const selectedCount = group.options.filter(option => option.selected).length;

	if (group.type === "single") return selectedCount === 1;

	if (group.type === "multi-limit") {
		const min = Number(group.min || 1);
		const max = Number(group.max || Infinity);
		return selectedCount >= min && selectedCount <= max;
	}

	return selectedCount >= 1;
}

function isStepComplete(stepName) {
	const section = optionConfig.sections.find(section => section.title === stepName);
	if (!section) return false;

	return section.groups.every(group => isGroupComplete(group));
}

function getSelectedOptions() {
	const selectedOptions = [];

	optionConfig.sections.forEach(section => {
		section.groups.forEach(group => {
			group.options.forEach(option => {
				if (option.selected) {
					const realMaterialCode =
						getRealMaterialCodeForStock(option);

					selectedOptions.push({
						materialGroupId: group.materialGroupId,
						groupName: group.title,

						materialCode: realMaterialCode || option.materialCode,
						optionMaterialCode: option.materialCode,

						materialName: option.label,

						price: Number(option.price || 0),

						deductQty: isNoDeductOption(option)
							? 0
							: getOptionDeductQty(realMaterialCode || option.materialCode) * getOptionMultiplier()
					});
				}
			});
		});
	});

	return selectedOptions;
}

function isNoDeductOption(option) {
	const code = String(option.materialCode);

	return (
		code === ACTION_CODE.NO_CHEESE ||
		code === ACTION_CODE.NO_EXTRA ||
		code === ACTION_CODE.NO_VEGETABLE ||
		code === ACTION_CODE.SIZE_REGULAR ||
		code === ACTION_CODE.SIZE_LARGE ||
		Number(code) === 309 ||
		Number(code) === 409
	);
}

function isExclusiveOption(option) {
	const code = String(option.materialCode);

	return (
		code === ACTION_CODE.NO_EXTRA ||
		code === ACTION_CODE.NO_VEGETABLE ||
		Number(code) === 309 ||
		Number(code) === 409
	);
}

function recalculateDefaultMaterials() {
	const multiplier = getDefaultMultiplier();

	item.defaultMaterials = (item.defaultMaterials || []).map(material => {
		const baseQty =
			Number(material.baseRequiredQty || material.requiredQty || 1);

		return {
			materialCode: material.materialCode,
			materialName: material.materialName,
			baseRequiredQty: baseQty,
			requiredQty: baseQty * multiplier,
			deductQty: baseQty * multiplier
		};
	});
	sessionStorage.setItem(ITEM_KEY, JSON.stringify(item));
}

function toggleOption(groupKey, optionIndex) {
	const group = findGroup(groupKey);
	if (!group) return;

	if (group.type === "single") {
		group.options.forEach((option, idx) => {
			option.selected = idx === optionIndex;
		});
	} else if (group.type === "multi-limit") {
		const target = group.options[optionIndex];
		const selectedCount = group.options.filter(option => option.selected).length;

		if (target.selected) {
			target.selected = false;
		} else {
			if (selectedCount >= Number(group.max || Infinity)) {
				alert("최대 " + group.max + "개까지 선택할 수 있습니다.");
				return;
			}

			if (isExclusiveOption(target)) {
				group.options.forEach(option => {
					option.selected = false;
				});

				target.selected = true;
			} else {
				group.options.forEach(option => {
					if (isExclusiveOption(option)) {
						option.selected = false;
					}
				});

				target.selected = true;
			}
		}
	}

	recalculateDefaultMaterials();

	removeInvalidSelectedOptions();
	renderSections();
	renderSteps();
	renderSummary();
	saveOptionState();
}

/* ===== 렌더 ===== */

if (Number(item.recipeCode) === MINI_ROTISSERIE_SALAD_CODE) {
	optionConfig.steps = optionConfig.steps.filter(step => step === "소스");
	optionConfig.activeStep = "소스";
}

function renderSteps() {
	if (!stepTabs) return;

	stepTabs.innerHTML = optionConfig.steps.map(step => {
		const activeClass = step === optionConfig.activeStep ? "active" : "";
		const completeClass = isStepComplete(step) ? "complete" : "";

		return `
			<button class="step-tab ${activeClass} ${completeClass}" type="button" data-step="${step}">
				<span class="step-check">✓</span>
				<span>${step}</span>
			</button>
		`;
	}).join("");

	stepTabs.querySelectorAll("[data-step]").forEach(button => {
		button.addEventListener("click", function() {
			const step = this.dataset.step;
			optionConfig.activeStep = step;
			renderSteps();
			scrollToSection(step);
			saveOptionState();
		});
	});
}

function renderSections() {
	if (!optionScroll) return;

	const visibleSections = optionConfig.sections.filter(section => {
		const isMiniRotisserieSalad =
			Number(item.recipeCode) === MINI_ROTISSERIE_SALAD_CODE;

		if (isMiniRotisserieSalad) {
			return section.title === "소스";
		}

		return true;
	});

	optionScroll.innerHTML = visibleSections.map(section => {
		return `
			<section class="section" data-section="${section.title}">
				<h2 class="section-title">${section.title}</h2>
				${section.groups.map(group => {
			return `
						<div class="group">
							<div class="option-grid">
								${group.options.map((option, index) => {
				const stock = stockMap[Number(option.materialCode)];

				const isDisabled =
					stock && Number(stock.unavailableYn) === 1;

				const largeSizeBlock =
					isLargeSizeOption(option) &&
					!option.selected &&
					!canSelectLargeSize();

				const stockBlock =
					!isLargeSizeOption(option) &&
					!isExclusiveOption(option) &&
					!option.selected &&
					!canSelectByStock(option);

				const finalDisabled = isDisabled || stockBlock || largeSizeBlock;

				return `
										<button
											type="button"
											class="option-chip ${option.selected ? "active" : ""} ${finalDisabled ? "disabled" : ""}"
											data-group="${group.key}"
											data-index="${index}"
											${finalDisabled ? "disabled" : ""}
										>
											${option.label}${option.price ? ` (+${option.price.toLocaleString()}원)` : ""}
										</button>
									`;
			}).join("")}
							</div>
						</div>
					`;
		}).join("")}
			</section>
		`;
	}).join("");

	optionScroll.querySelectorAll(".option-chip").forEach(button => {
		button.addEventListener("click", function() {
			if (this.disabled) return;

			const groupKey = this.dataset.group;
			const optionIndex = Number(this.dataset.index);

			const group = findGroup(groupKey);
			if (!group) return;

			const option = group.options[optionIndex];
			if (!option) return;

			const stock = stockMap[Number(option.materialCode)];

			if (stock && Number(stock.unavailableYn) === 1) {
				alert("재고 부족으로 선택할 수 없습니다.");
				return;
			}

			if (isLargeSizeOption(option) && !canSelectLargeSize()) {
				alert("재고 부족으로 30cm를 선택할 수 없습니다.");
				return;
			}

			if (!isExclusiveOption(option) && !canSelectByStock(option)) {
				alert("재고 부족으로 선택할 수 없습니다.");
				return;
			}

			toggleOption(groupKey, optionIndex);
		});
	});
}


function renderSummary() {
	if (!summaryGrid || !totalPrice) return;

	const data = {
		메뉴: item.menuName
	};

	const visibleSections = optionConfig.sections.filter(section => {
		const isMiniRotisserieSalad =
			Number(item.recipeCode) === MINI_ROTISSERIE_SALAD_CODE;

		if (isMiniRotisserieSalad) {
			return section.title === "소스";
		}

		return true;
	});

	visibleSections.forEach(section => {
		const values = [];

		section.groups.forEach(group => {
			values.push(...getSelectedLabels(group));
		});

		data[section.title] = values.join(", ");
	});

	summaryGrid.innerHTML = Object.entries(data).map(([key, value]) => `
		<div class="summary-item">
			<div class="summary-label">${key}</div>
			<div class="summary-value">${value || "-"}</div>
		</div>
	`).join("");

	totalPrice.textContent = formatPrice(Number(item.price || 0) + getExtraPrice());
}

function scrollToSection(stepName) {
	if (!optionScroll) return;

	const target = optionScroll.querySelector(`[data-section="${stepName}"]`);
	if (!target) return;

	optionScroll.scrollTo({
		top: target.offsetTop - 12,
		behavior: "smooth"
	});
}

function validateBeforeNext() {
	for (const step of optionConfig.steps) {
		if (!isStepComplete(step)) {
			alert(step + " 옵션을 선택해주세요.");
			optionConfig.activeStep = step;
			renderSteps();
			scrollToSection(step);
			return false;
		}
	}

	return true;
}

function calculateUsedMaterialsFromCart() {
	const cart = getCart();
	const used = {};

	(cart.items || []).forEach(cartItem => {
		const qty = Number(cartItem.qty || 1);

		(cartItem.defaultMaterials || []).forEach(m => {
			const code = String(m.materialCode);
			const deductQty = Number(m.deductQty || m.requiredQty || 1) * qty;

			used[code] = (used[code] || 0) + deductQty;
		});

		(cartItem.options || []).forEach(o => {
			const code = String(o.materialCode);
			const deductQty = Number(o.deductQty || 0) * qty;

			if (deductQty <= 0) return;

			used[code] = (used[code] || 0) + deductQty;
		});
	});

	return used;
}

function calculateUsedMaterialsFromCurrentItem(exceptMaterialCode = null) {
	const used = {};
	const itemQty = Number(item.qty || 1);

	(item.defaultMaterials || []).forEach(m => {
		const code = String(m.materialCode);
		const deductQty = Number(m.deductQty || m.requiredQty || 1) * itemQty;

		if (deductQty <= 0) return;

		used[code] = (used[code] || 0) + deductQty;
	});

	optionConfig.sections.forEach(section => {
		section.groups.forEach(group => {
			group.options.forEach(option => {
				if (!option.selected) return;
				if (isExclusiveOption(option)) return;

				const realCode = getRealMaterialCodeForStock(option);
				if (!realCode) return;

				if (
					exceptMaterialCode !== null &&
					String(exceptMaterialCode) === String(realCode)
				) {
					return;
				}

				const deductQty =
					getOptionDeductQty(realCode) *
					itemQty *
					getOptionMultiplier();

				if (deductQty <= 0) return;

				used[realCode] = (used[realCode] || 0) + deductQty;
			});
		});
	});

	return used;
}

function getSelectedOptionByGroupName(groupName) {
	for (const section of optionConfig.sections) {
		for (const group of section.groups) {
			if (group.title === groupName) {
				return group.options.find(option => option.selected) || null;
			}
		}
	}

	return null;
}

function isMeatMaterial(materialCode) {
	const code = String(materialCode);

	return (
		code === "402" || code === "403" || code === "601" || code === "602" || code === "603" ||
		code === "604" || code === "606" || code === "607" || code === "609" || code === "611" ||
		code === "612" || code === "613" || code === "614" || code === "615" || code === "617"
	);
}

function getBaseMeatMaterialCode() {
	const baseMeat = (item.defaultMaterials || []).find(m =>
		isMeatMaterial(m.materialCode)
	);

	return baseMeat ? String(baseMeat.materialCode) : null;
}

function getRealMaterialCodeForStock(option) {
	const code = String(option.materialCode);

	// 치즈 추가
	if (code === ACTION_CODE.CHEESE_ADD || Number(code) === 401) {
		const selectedCheese = getSelectedOptionByGroupName("치즈");

		if (!selectedCheese) return null;

		// 치즈 제외를 선택한 상태에서는 치즈 추가 불가
		if (String(selectedCheese.materialCode) === ACTION_CODE.NO_CHEESE) {
			return null;
		}

		return String(selectedCheese.materialCode);
	}

	// 미트 추가
	if (code === ACTION_CODE.MEAT_ADD || Number(code) === 407) {
		return getBaseMeatMaterialCode();
	}

	return String(option.materialCode);
}

function isLargeSizeOption(option) {
	return String(option.materialCode) === ACTION_CODE.SIZE_LARGE;
}

function canSelectLargeSize() {
	const cartUsed = calculateUsedMaterialsFromCart();

	return (item.defaultMaterials || []).every(m => {
		const code = String(m.materialCode);
		const dbQty = getDbQty(code);
		const cartQty = Number(cartUsed[code] || 0);

		const baseQty = Number(m.baseRequiredQty || m.requiredQty || m.deductQty || 1);
		const needQty = baseQty * 2 * Number(item.qty || 1);

		return dbQty - cartQty - needQty >= 0;
	});
}

function canSelectByStock(option) {

	const realCode = getRealMaterialCodeForStock(option);

	if (!realCode) {
		return false;
	}

	const stock = stockMap[Number(realCode)];

	if (!stock) return true;

	const dbQty = Number(stock.currentQty || 0);

	const cartUsed = calculateUsedMaterialsFromCart();

	// 현재 item에서 자기 자신 제외한 사용량
	const isAddOption =
		String(option.materialCode) === ACTION_CODE.CHEESE_ADD ||
		String(option.materialCode) === ACTION_CODE.MEAT_ADD;

	const itemUsed =
		isAddOption
			? calculateUsedMaterialsFromCurrentItem()
			: calculateUsedMaterialsFromCurrentItem(realCode);

	const alreadyUsed =
		Number(cartUsed[realCode] || 0) +
		Number(itemUsed[realCode] || 0);

	// 지금 선택하려는 옵션 추가 사용량
	let nextUse = 0;

	// 이미 선택된 옵션을 다시 검사하는 경우에는
	// 현재 사용량에 이미 포함되어 있으므로 nextUse를 또 더하면 안 됨
	if (!option.selected && !isExclusiveOption(option)) {
		nextUse =
			getOptionDeductQty(realCode) *
			Number(item.qty || 1) *
			getOptionMultiplier();
	}

	return dbQty - alreadyUsed - nextUse >= 0;
}

function removeInvalidSelectedOptions() {

	optionConfig.sections.forEach(section => {
		section.groups.forEach(group => {

			group.options.forEach(option => {

				if (!option.selected) {
					return;
				}

				if (!canSelectByStock(option)) {
					option.selected = false;
				}
			});
		});
	});
}

function getDbQty(code) {
	const stock = stockMap[String(code)] || stockMap[Number(code)];

	if (!stock) return 0;

	if (typeof stock === "object") {
		return Number(stock.currentQty || stock.qty || stock.stockQty || 0);
	}

	return Number(stock || 0);
}

/* ===== 이동 함수 ===== */

window.goBackMenu = function() {
	sessionStorage.removeItem(OPTION_STATE_KEY);
	sessionStorage.removeItem(ITEM_KEY);
	location.href = contextPath + "/kiosk/menu";
};

window.goNext = function() {
	if (!validateBeforeNext()) return;

	item.multiplier = getDefaultMultiplier();

	item.options = getSelectedOptions();
	item.totalPrice = Number(item.price || 0) + getExtraPrice();

	sessionStorage.setItem(ITEM_KEY, JSON.stringify(item));
	saveOptionState();

	location.href = contextPath + "/kiosk/optionCon";
};

/* ===== 스크롤 연동 ===== */

if (optionScroll) {
	optionScroll.addEventListener("scroll", function() {
		const sections = Array.from(optionScroll.querySelectorAll("[data-section]"));
		let current = optionConfig.activeStep;

		sections.forEach(section => {
			if (section.offsetTop - optionScroll.scrollTop <= 120) {
				current = section.dataset.section;
			}
		});

		if (current !== optionConfig.activeStep) {
			optionConfig.activeStep = current;
			renderSteps();
			saveOptionState();
		}
	});
}

/* ===== 최초 실행 ===== */

renderSteps();
renderSections();
renderSummary();