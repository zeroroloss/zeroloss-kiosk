const ITEM_KEY = "item";

const materialGroupList = window.materialGroupList || [];
const materialList = window.optionMaterialList || [];

function moveToMenu() {
	location.href = contextPath + "/kiosk/menu";
}

let item = JSON.parse(sessionStorage.getItem(ITEM_KEY) || "null");

if (!item) {
	console.error("item 없음");
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

    item.defaultMaterials = data;

    sessionStorage.setItem("item", JSON.stringify(item));

  })
  .catch(err => console.error("fetch 에러:", err));

/* ===== 공통 함수 ===== */

function formatPrice(v) {
	return Number(v || 0).toLocaleString() + "원";
}

/* ===== 옵션 상태 생성 ===== */

function createDefaultOptionConfig() {
	const sections = materialGroupList.map(group => {
		const options = materialList
			.filter(m => Number(m.materialGroupId) === Number(group.materialGroupId))
			.map(m => ({
				label: m.materialName,
				value: m.materialName,
				materialCode: m.materialCode,
				materialGroupId: group.materialGroupId,
				groupName: group.groupName,
				price: Number(m.price || 0),
				selected: false
			}));

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

	return {
		steps: materialGroupList.map(g => g.groupName),
		activeStep: materialGroupList.length ? materialGroupList[0].groupName : "",
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
		console.error("옵션 상태 로드 실패:", e);
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
					selectedOptions.push({
						materialGroupId: group.materialGroupId,
						groupName: group.title,
						materialCode: option.materialCode,
						materialName: option.label,
						price: Number(option.price || 0)
					});
				}
			});
		});
	});

	return selectedOptions;
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

			target.selected = true;
		}
	}

	renderSections();
	renderSteps();
	renderSummary();
	saveOptionState();
}

/* ===== 렌더 ===== */

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

	optionScroll.innerHTML = optionConfig.sections.map(section => {
		return `
			<section class="section" data-section="${section.title}">
				<h2 class="section-title">${section.title}</h2>
				${section.groups.map(group => {
					return `
						<div class="group">
							<div class="group-title">${group.title}</div>
							<div class="option-grid">
								${group.options.map((option, index) => {
									return `
										<button
											type="button"
											class="option-chip ${option.selected ? "active" : ""}"
											data-group="${group.key}"
											data-index="${index}"
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
			const groupKey = this.dataset.group;
			const optionIndex = Number(this.dataset.index);
			toggleOption(groupKey, optionIndex);
		});
	});
}

function renderSummary() {
	if (!summaryGrid || !totalPrice) return;

	const data = {
		메뉴: item.menuName
	};

	optionConfig.sections.forEach(section => {
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

/* ===== 이동 함수 ===== */

window.goBackMenu = function() {
	sessionStorage.removeItem(OPTION_STATE_KEY);
	sessionStorage.removeItem(ITEM_KEY);
	location.href = contextPath + "/kiosk/menu";
};

window.goNext = function() {
	if (!validateBeforeNext()) return;

	item.options = getSelectedOptions();
	item.totalPrice = Number(item.price || 0) + getExtraPrice();

	sessionStorage.setItem(ITEM_KEY, JSON.stringify(item));
	saveOptionState();

	console.log("옵션 선택 item =", item);

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