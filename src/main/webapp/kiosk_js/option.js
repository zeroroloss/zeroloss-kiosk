const SELECTED_MENU_KEY = 'selectedMenu';
const OPTION_EDIT_MODE_KEY = 'optionEditMode';

function moveToMenu() {
  const path = location.pathname;
  const kioskIndex = path.indexOf('/kiosk_jsp/');
  const basePath = kioskIndex >= 0 ? path.substring(0, kioskIndex) : '';
  location.href = basePath + '/kiosk_jsp/menu/menu.jsp';
}

const selectedMenu = JSON.parse(sessionStorage.getItem(SELECTED_MENU_KEY) || 'null');

if (!selectedMenu) {
  alert('메뉴 정보 없음');
  moveToMenu();
  throw new Error('selectedMenu not found in sessionStorage');
}

const OPTION_STATE_KEY = `optionState_${selectedMenu.menuType}_${selectedMenu.menuName}`;
const isEditMode = sessionStorage.getItem(OPTION_EDIT_MODE_KEY) === 'true';

/* ===== 옵션 템플릿 ===== */

const commonCheeseSection = {
  key: 'cheese',
  title: '치즈',
  groups: [
    {
      key: 'cheeseType',
      title: '치즈 종류를 선택하세요',
      type: 'single',
      options: [
        { label: '슈레드치즈', value: '슈레드치즈', selected: false },
        { label: '아메리칸치즈', value: '아메리칸치즈', selected: false },
        { label: '모차렐라치즈', value: '모차렐라치즈', selected: false },
        { label: '치즈 제외', value: '치즈 제외', selected: false }
      ]
    }
  ]
};

const commonVegetableSection = {
  key: 'vegetable',
  title: '야채',
  groups: [
    {
      key: 'vegetableType',
      title: '야채 선택',
      type: 'multi-exclude',
      options: [
        { label: '야채 담지 않기', value: '없음', selected: false },
        { label: '피클', value: '피클', selected: false },
        { label: '오이', value: '오이', selected: false },
        { label: '양파', value: '양파', selected: false },
        { label: '올리브', value: '올리브', selected: false },
        { label: '토마토', value: '토마토', selected: false },
        { label: '양상추', value: '양상추', selected: false },
        { label: '피망', value: '피망', selected: false },
        { label: '할라피뇨', value: '할라피뇨', selected: false }
      ]
    }
  ]
};

const commonExtraSection = {
  key: 'extra',
  title: '재료 추가',
  groups: [
    {
      key: 'extraType',
      title: '재료 추가 선택',
      type: 'multi-exclude',
      options: [
        { label: '재료 추가 없음', value: '없음', selected: false, price: 0 },
        { label: '치즈추가', value: '치즈추가', selected: false, price: 1500 },
        { label: '베이컨', value: '베이컨', selected: false, price: 1500 },
        { label: '페퍼로니', value: '페퍼로니', selected: false, price: 1500 },
        { label: '아보카도', value: '아보카도', selected: false, price: 1500 },
        { label: '에그마요', value: '에그마요', selected: false, price: 1500 },
        { label: '오믈렛', value: '오믈렛', selected: false, price: 1500 },
        { label: '미트 추가', value: '미트 추가', selected: false, price: 2000 },
        { label: '에그 슬라이스', value: '에그 슬라이스', selected: false, price: 1500 }
      ]
    }
  ]
};

const commonSauceSection = {
  key: 'sauce',
  title: '소스',
  groups: [
    {
      key: 'sauceType',
      title: '소스 선택 (최소 1개, 최대 3개)',
      type: 'multi-limit',
      min: 1,
      max: 3,
      options: [
        { label: '랜치', value: '랜치', selected: false },
        { label: '홀스래디쉬', value: '홀스래디쉬', selected: false },
        { label: '저당 크리미 어니언', value: '저당 크리미 어니언', selected: false },
        { label: '스위트 어니언', value: '스위트 어니언', selected: false },
        { label: '마요네즈', value: '마요네즈', selected: false },
        { label: '스위트 칠리', value: '스위트 칠리', selected: false },
        { label: '스모크 바비큐', value: '스모크 바비큐', selected: false },
        { label: '핫칠리', value: '핫칠리', selected: false },
        { label: '허니 머스타드', value: '허니 머스타드', selected: false },
        { label: '사우스웨스트 치폴레', value: '사우스웨스트 치폴레', selected: false },
        { label: '엑스트라 버진 올리브 오일', value: '엑스트라 버진 올리브 오일', selected: false },
        { label: '레드 와인 식초', value: '레드 와인 식초', selected: false },
        { label: '후추', value: '후추', selected: false },
        { label: '소금', value: '소금', selected: false }
      ]
    }
  ]
};

const optionTemplates = {
  sandwich: {
    steps: ['빵', '치즈', '야채', '재료', '소스'],
    activeStep: '빵',
    sections: [
      {
        key: 'bread',
        title: '빵',
        groups: [
          {
            key: 'length',
            title: '길이 선택',
            type: 'single',
            options: [
              { label: '15cm (기본)', value: '15cm (기본)', price: 0, selected: false },
              { label: '30cm + 6,000', value: '30cm', price: 6000, selected: false }
            ]
          },
          {
            key: 'breadType',
            title: '종류 선택',
            type: 'single',
            options: [
              { label: '플랫', value: '플랫', selected: false },
              { label: '위트', value: '위트', selected: false },
              { label: '그레인', value: '그레인', selected: false },
              { label: '파마산 오레가노', value: '파마산 오레가노', selected: false },
              { label: '화이트', value: '화이트', selected: false },
              { label: '허니오트', value: '허니오트', selected: false }
            ]
          },
          {
            key: 'toasting',
            title: '토스팅 선택',
            type: 'single',
            options: [
              { label: '토스팅 안 함', value: '토스팅 안 함', selected: false },
              { label: '토스팅', value: '토스팅', selected: false }
            ]
          }
        ]
      },
      commonCheeseSection,
      commonVegetableSection,
      commonExtraSection,
      commonSauceSection
    ]
  },
  salad: {
    steps: ['치즈', '야채', '재료', '소스'],
    activeStep: '치즈',
    sections: [
      commonCheeseSection,
      commonVegetableSection,
      commonExtraSection,
      commonSauceSection
    ]
  }
};

/* ===== 공통 함수 ===== */

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function formatPrice(v) {
  return Number(v || 0).toLocaleString() + '원';
}

/* ===== 상태 로드 ===== */

function createDefaultOptionConfig() {
  const template = optionTemplates[selectedMenu.menuType];
  return template ? deepClone(template) : { steps: [], activeStep: '', sections: [] };
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

function isStepComplete(stepName) {
  if (stepName === '빵') {
    return ['length', 'breadType', 'toasting'].every(key => isGroupComplete(findGroup(key)));
  }
  if (stepName === '치즈') return isGroupComplete(findGroup('cheeseType'));
  if (stepName === '야채') return isGroupComplete(findGroup('vegetableType'));
  if (stepName === '재료') return isGroupComplete(findGroup('extraType'));
  if (stepName === '소스') return isGroupComplete(findGroup('sauceType'));
  return false;
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
    button.addEventListener('click', function () {
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
    button.addEventListener('click', function () {
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
    치즈: getSelectedLabels(findGroup('cheeseType')).join(', '),
    야채: getSelectedLabels(findGroup('vegetableType')).join(', '),
    재료: getSelectedLabels(findGroup('extraType')).join(', '),
    소스: getSelectedLabels(findGroup('sauceType')).join(', ')
  };

  if (selectedMenu.menuType === 'sandwich') {
    data.빵 = getBreadText();
  }

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
  sessionStorage.removeItem('pendingCartItem');
  location.href = contextPath + '/kiosk_jsp/menu/menu.jsp';
};

window.goNext = function(contextPath) {
  if (!validateBeforeNext()) return;

  const item = {
    id: Date.now(),
    menu: selectedMenu.menuName,
    menuType: selectedMenu.menuType,
    bread: selectedMenu.menuType === 'sandwich' ? getBreadText() : '',
    cheese: getSelectedLabels(findGroup('cheeseType')).join(', '),
    vegetable: getSelectedLabels(findGroup('vegetableType')).join(', '),
    sauce: getSelectedLabels(findGroup('sauceType')).join(', '),
    extra: getSelectedLabels(findGroup('extraType')).join(', '),
    basePrice: Number(selectedMenu.price || 0),
    extraPrice: getExtraPrice(),
    totalPrice: Number(selectedMenu.price || 0) + getExtraPrice(),
    quantity: 1
  };

  sessionStorage.setItem(OPTION_EDIT_MODE_KEY, 'true');
  saveOptionState();
  sessionStorage.setItem('pendingCartItem', JSON.stringify(item));
  location.href = contextPath + '/kiosk_jsp/menu/option_confirm.jsp';
};

/* ===== 스크롤 연동 ===== */

if (optionScroll) {
  optionScroll.addEventListener('scroll', function () {
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