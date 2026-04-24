const SELECTED_MENU_KEY = 'selectedMenu';
const OPTION_EDIT_MODE_KEY = 'optionEditMode';

const materialGroupList = window.materialGroupList || [];
const materialList = window.optionMaterialList || [];

function moveToMenu() {
	location.href = '<%=request.getContextPath()%>/kiosk/menu';
}

const selectedMenu = JSON.parse(sessionStorage.getItem(SELECTED_MENU_KEY) || 'null');

if (!selectedMenu) {
	console.error('selectedMenu 없음');
	moveToMenu();
	throw new Error('selectedMenu 없음');
}

const OPTION_STATE_KEY = `optionState_${selectedMenu.menuType}_${selectedMenu.menuName}`;
const isEditMode = sessionStorage.getItem(OPTION_EDIT_MODE_KEY) === 'true';

/* ===== 공통 함수 ===== */

function deepClone(obj) {
	return JSON.parse(JSON.stringify(obj));
}

function formatPrice(v) {
	return Number(v || 0).toLocaleString() + '원';
}

/* ===== 상태 로드 ===== */

function createDefaultOptionConfig() {
	const sections = materialGroupList.map(group => {
		const options = materialList
			.filter(m => Number(m.materialGroupId) === Number(group.materialGroupId))
			.map(m => ({
				label: m.materialName,
				value: m.materialName,
				materialCode: m.materialCode,
				price: Number(m.price || 0),
				selected: false
			}));

		return {
			title: group.groupName,
			groups: [{
				key: 'group_' + group.materialGroupId,
				title: group.groupName,
				type: Number(group.groupMax) === 1 ? 'single' : 'multi-limit',
				min: Number(group.groupMin || 0),
				max: Number(group.groupMax || 999),
				options: options
			}]
		};
	});

	return {
		steps: materialGroupList.map(g => g.groupName),
		activeStep: materialGroupList.length ? materialGroupList[0].groupName : '',
		sections: sections
	};
}

function loadOptionState() {
	try {
		if (!isEditMode) {
			sessionStorage.removeItem(OPTION_STATE_KEY);
			return createDefaultOptionConfig();
		}

		const saved = JSON.parse(sessionStorage.getItem(OPTION_STATE_KEY) || 'null');
		return saved || createDefaultOptionConfig();
	} catch (e) {
		console.error('옵션 상태 로드 실패:', e);
		return createDefaultOptionConfig();
	}
}

let optionConfig = loadOptionState();

if (!optionConfig.activeStep && optionConfig.steps.length > 0) {
	optionConfig.activeStep = optionConfig.steps[0];
}

/* ===== DOM ===== */

const stepTabs = document.getElementById('stepTabs');
const optionScroll = document.getElementById('optionScroll');
const summaryGrid = document.getElementById('summaryGrid');
const totalPrice = document.getElementById('totalPrice');
const menuNameTitle = document.getElementById('menuNameTitle');

if (menuNameTitle) {
	menuNameTitle.textContent = selectedMenu.menuName || '';
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
		const g = section.groups.find(x => x.key === key);
		if (g) return g;
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

function getBreadText() {
	if (selectedMenu.menuType !== 'sandwich') return '';

	return [
		...getSelectedLabels(findGroup('length')),
		...getSelectedLabels(findGroup('breadType')),
		...getSelectedLabels(findGroup('toasting'))
	].join(' / ');
}

function isGroupComplete(group) {
	if (!group) return false;

	const selectedCount = group.options.filter(option => option.selected).length;

	if (group.type === 'single') return selectedCount === 1;
	if (group.type === 'multi-exclude') return selectedCount >= 1;
	if (group.type === 'multi') return selectedCount >= 1;
	if (group.type === 'multi-limit') {
		const min = group.min || 1;
		const max = group.max || Infinity;
		return selectedCount >= min && selectedCount <= max;
	}

	return false;
}

function getSelectedMaterialCodes() {
	const codes = [];

	optionConfig.sections.forEach(section => {
		section.groups.forEach(group => {
			group.options.forEach(option => {
				if (option.selected) {
					codes.push(option.materialCode);
				}
			});
		});
	});

	return codes;
}

function isStepComplete(stepName) {
	const section = optionConfig.sections.find(section => section.title === stepName);
	if (!section) return false;

	return section.groups.every(group => isGroupComplete(group));
}

function toggleOption(groupKey, optionIndex) {
	const group = findGroup(groupKey);
	if (!group) return;

	if (group.type === 'single') {
		group.options.forEach((option, idx) => {
			option.selected = idx === optionIndex;
		});
	} else if (group.type === 'multi') {
		group.options[optionIndex].selected = !group.options[optionIndex].selected;
	} else if (group.type === 'multi-exclude') {
		const target = group.options[optionIndex];

		if (target.value === '없음') {
			const nextState = !target.selected;
			group.options.forEach(option => {
				option.selected = false;
			});
			target.selected = nextState;
		} else {
			group.options.forEach(option => {
				if (option.value === '없음') option.selected = false;
			});
			target.selected = !target.selected;
		}
	} else if (group.type === 'multi-limit') {
		const target = group.options[optionIndex];
		const selectedCount = group.options.filter(option => option.selected).length;

		if (target.selected) {
			target.selected = false;
		} else {
			if (selectedCount >= (group.max || Infinity)) {
				alert('최대 ' + group.max + '개까지 선택할 수 있습니다.');
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
		const activeClass = step === optionConfig.activeStep ? 'active' : '';
		const completeClass = isStepComplete(step) ? 'complete' : '';

		return `
      <button class="step-tab ${activeClass} ${completeClass}" type="button" data-step="${step}">
        <span class="step-check">✓</span>
        <span>${step}</span>
      </button>
    `;
	}).join('');

	stepTabs.querySelectorAll('[data-step]').forEach(button => {
		button.addEventListener('click', function() {
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
                      class="option-chip ${option.selected ? 'active' : ''}"
                      data-group="${group.key}"
                      data-index="${index}"
                    >
                      ${option.label}${option.price ? ` (+${option.price.toLocaleString()}원)` : ''}
                    </button>
                  `;
			}).join('')}
              </div>
            </div>
          `;
		}).join('')}
      </section>
    `;
	}).join('');

	optionScroll.querySelectorAll('.option-chip').forEach(button => {
		button.addEventListener('click', function() {
			const groupKey = this.dataset.group;
			const optionIndex = Number(this.dataset.index);
			toggleOption(groupKey, optionIndex);
		});
	});
}

function renderSummary() {
	if (!summaryGrid || !totalPrice) return;

	const data = {
		메뉴: selectedMenu.menuName,
	}

	optionConfig.sections.forEach(section => {
		const values = [];

		section.groups.forEach(group => {
			values.push(...getSelectedLabels(group));
		});

		data[section.title] = values.join(', ');
	});

	summaryGrid.innerHTML = Object.entries(data).map(([k, v]) => `
    <div class="summary-item">
      <div class="summary-label">${k}</div>
      <div class="summary-value">${v || '-'}</div>
    </div>
  `).join('');

	totalPrice.textContent = formatPrice(Number(selectedMenu.price || 0) + getExtraPrice());
}

function scrollToSection(stepName) {
	if (!optionScroll) return;

	const target = optionScroll.querySelector(`[data-section="${stepName}"]`);
	if (!target) return;

	optionScroll.scrollTo({
		top: target.offsetTop - 12,
		behavior: 'smooth'
	});
}

function validateBeforeNext() {
	for (const step of optionConfig.steps) {
		if (!isStepComplete(step)) {
			alert(step + ' 옵션을 선택해주세요.');
			optionConfig.activeStep = step;
			renderSteps();
			scrollToSection(step);
			return false;
		}
	}
	return true;
}

/* ===== 이동 함수 ===== */

window.goBackMenu = function(contextPath) {
	sessionStorage.removeItem(OPTION_EDIT_MODE_KEY);
	sessionStorage.removeItem(OPTION_STATE_KEY);
	sessionStorage.removeItem('item');
	location.href = contextPath + '/kiosk_jsp/menu/menu.jsp';
};

window.goNext = function(contextPath) {
	if (!validateBeforeNext()) return;

	const item = {
	id: Date.now(),
	recipeCode: selectedMenu.recipeCode,
	menu: selectedMenu.menuName,
	menuType: selectedMenu.menuType,
	basePrice: Number(selectedMenu.price || 0),
	extraPrice: getExtraPrice(),
	totalPrice: Number(selectedMenu.price || 0) + getExtraPrice(),
	qty: 1,
	materialCodes: getSelectedMaterialCodes()
};

optionConfig.sections.forEach(section => {
	const values = [];

	section.groups.forEach(group => {
		values.push(...getSelectedLabels(group));
	});

	item[section.title] = values.join(', ');
});

	console.log("옵션 선택 item =", item);
alert(JSON.stringify(item, null, 2));

	sessionStorage.setItem(OPTION_EDIT_MODE_KEY, 'true');
	saveOptionState();
	sessionStorage.setItem('item', JSON.stringify(item));
	/*location.href = contextPath + '/kiosk_jsp/menu/option_confirm.jsp';*/
};

/* ===== 스크롤 연동 ===== */

if (optionScroll) {
	optionScroll.addEventListener('scroll', function() {
		const sections = Array.from(optionScroll.querySelectorAll('[data-section]'));
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