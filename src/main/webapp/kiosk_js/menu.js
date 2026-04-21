const cartStorageKey = "cart";

/* =====================
   이미지 맵
   - 같은 이름 메뉴도 menuType_메뉴명 으로 구분
   - 너는 오른쪽 URL만 바꾸면 됨
===================== */
const imageMap = {
  // 샌드위치
  "sandwich_잠봉 플러스": "/zero/images/sandwich/잠봉플러스.png",
  "sandwich_잠봉": "/zero/images/sandwich/잠봉.png",
  "sandwich_머쉬룸": "/zero/images/sandwich/머쉬룸.png",
  "sandwich_안창 비프 & 머쉬룸": "/zero/images/sandwich/안창비프.png",
  "sandwich_스테이크 & 치즈": "/zero/images/sandwich/스테이크&치즈.png",
  "sandwich_이탈리안 비엠티": "/zero/images/sandwich/이탈리안비엠티.png",
  "sandwich_로티세리 바비큐 치킨": "/zero/images/sandwich/로티세리바비큐치킨.png",
  "sandwich_에그마요": "/zero/images/sandwich/에그마요.png",
  "sandwich_안창 비프": "/zero/images/sandwich/안창비프.png",
  "sandwich_터키 베이컨 아보카도": "/zero/images/sandwich/터키베이컨아보카도.png",
  "sandwich_스파이시 쉬림프": "/zero/images/sandwich/스파이시쉬림프.png",
  "sandwich_쉬림프": "/zero/images/sandwich/쉬림프.png",
  "sandwich_로스트 치킨": "/zero/images/sandwich/로스트치킨.png",
  "sandwich_폴드포크 바비큐": "/zero/images/sandwich/폴드포크바비큐.png",
  "sandwich_제로 클럽": "/zero/images/sandwich/제로클럽.png",
  "sandwich_치킨 데리야끼": "/zero/images/sandwich/치킨데리야끼.png",
  "sandwich_스파이시 이탈리안": "/zero/images/sandwich/스파이시이탈리안.png",
  "sandwich_비엘티": "/zero/images/sandwich/비엘티.png",
  "sandwich_터키": "/zero/images/sandwich/터키.png",
  "sandwich_참치": "/zero/images/sandwich/참치.png",
  "sandwich_햄": "/zero/images/sandwich/햄.png",
  "sandwich_에그 슬라이스": "/zero/images/sandwich/에그슬라이스.png",
  "sandwich_베지": "/zero/images/sandwich/베지.png",
  "sandwich_치킨 슬라이스": "/zero/images/sandwich/치킨슬라이스.png",
  "sandwich_치킨 베이컨 아보카도": "/zero/images/sandwich/치킨베이컨아보카도.png",
  "sandwich_웨스턴 에그&치즈": "/zero/images/sandwich/웨스턴에그&치즈.png",
  "sandwich_햄 에그&치즈": "/zero/images/sandwich/햄에그&치즈.png",

  // 샐러드
  "salad_잠봉": "/zero/images/salad/잠봉.png",
  "salad_잠봉 플러스": "/zero/images/salad/잠봉플러스.png",
  "salad_로티세리 치킨 타코": "/zero/images/salad/로티세리치킨타코샐러드.png",
  "salad_폴드포크 타코": "/zero/images/salad/풀드포크타코샐러드.png",
  "salad_스파이시 쉬림프 타코": "/zero/images/salad/스파이시쉬림프타코샐러드.png",
  "salad_안창 비프": "/zero/images/salad/안창비프.png",
  "salad_안창 비프 & new 머쉬룸": "/zero/images/salad/안창비프&new머쉬룸.png",
  "salad_new 머쉬룸": "/zero/images/salad/new머쉬룸.png",
  "salad_이탈리안 비엠티": "/zero/images/salad/이탈리안비엠티.png",
  "salad_비엘티": "/zero/images/salad/비엘티.png",
  "salad_햄": "/zero/images/salad/햄.png",
  "salad_참치": "/zero/images/salad/참치.png",
  "salad_에그마요": "/zero/images/salad/에그마요.png",
  "salad_폴드포크 바비큐": "/zero/images/salad/폴드포크바비큐.png",
  "salad_로티세리 바비큐 치킨": "/zero/images/salad/로티세리바비큐치킨.png",
  "salad_쉬림프": "/zero/images/salad/쉬림프.png",
  "salad_터키 베이컨 아보카도": "/zero/images/salad/터키베이컨아보카도.png",
  "salad_제로 클럽": "/zero/images/salad/제로클럽.png",
  "salad_에그 슬라이스": "/zero/images/salad/에그슬라이스.png",
  "salad_스파이시 쉬림프": "/zero/images/salad/스파이시쉬림프.png",
  "salad_스테이크 & 치즈": "/zero/images/salad/스테이크&치즈.png",
  "salad_로스트 치킨": "/zero/images/salad/로스트치킨.png",
  "salad_치킨 데리야끼": "/zero/images/salad/치킨데리야끼.png",
  "salad_터키": "/zero/images/salad/터키.png",
  "salad_베지": "/zero/images/salad/베지.png",
  "salad_스파이시 이탈리안": "/zero/images/salad/스파이시이탈리안.png",
  "salad_미니 로티세리 치킨 샐러드": "/zero/images/salad/미니로티세리치킨샐러드.png",

  // 사이드
  "side_베이컨 치즈 웨지 포테이토": "/zero/images/side/베이컨치즈웨지포테이토.png",
  "side_치즈 웨지 포테이토": "/zero/images/side/치즈웨지포테이토.png",
  "side_웨지 포테이토": "/zero/images/side/웨지포테이토.png",
  "side_스테이크&치즈 아보카도 랩": "/zero/images/side/스테이크치즈아보카도랩.png",
  "side_쉬림프 에그마요 랩": "/zero/images/side/쉬림프에그마요랩.png",
  "side_치킨 베이컨 미니 랩": "/zero/images/side/치킨베이컨미니랩.png",
  "side_잠봉, 에그&치즈 랩": "/zero/images/side/잠봉에그&치즈랩.png",
  "side_웨스턴 에그&치즈 랩": "/zero/images/side/웨스턴에그&치즈랩.png",
  "side_초코칩": "/zero/images/side/초코칩.png",
  "side_더블 초코칩": "/zero/images/side/더블초코칩.png",
  "side_오렌지 초코칩": "/zero/images/side/오렌지초코칩.png",
  "side_라즈베리 치즈케익": "/zero/images/side/라즈베리치즈케익.png",
  "side_오트밀 레이즌": "/zero/images/side/오트밀레이즌.png",
  "side_화이트 초코 마카다미아": "/zero/images/side/화이트초코마카다미아.png",
  "side_칩": "/zero/images/side/칩.png",

  // 음료/수프
  "drink_soup_머쉬룸 수프": "/zero/images/drink/머쉬룸수프.png",
  "drink_soup_콘 수프": "/zero/images/drink/콘수프.png",
  "drink_soup_포테이토 베이컨 수프": "/zero/images/drink/포테이토베이컨수프.png",
  "drink_soup_커피": "/zero/images/drink/커피.png",
  "drink_soup_콜라": "/zero/images/drink/탄산.png",
  "drink_soup_사이다": "/zero/images/drink/탄산.png"
};



/* =====================
   메뉴 이름 통일 기준
   - 스테이크 & 치즈
   - 안창 비프 & 머쉬룸
   - 제로 클럽
   - 웨스턴 에그&치즈
   - 폴드포크 바비큐
   - 폴드포크 타코
   - 로티세리 치킨 타코
   - 스파이시 쉬림프 타코
   - new 머쉬룸
===================== */
const kioskData = {
  "샌드위치": {
    menuType: "sandwich",
    tabs: ["전체", "클래식", "프레시&라이트", "프리미엄"],
    items: {
      "전체": [
        { name: "잠봉 플러스", price: 8900 },
        { name: "잠봉", price: 7400 },
        { name: "머쉬룸", price: 6200 },
        { name: "안창 비프 & 머쉬룸", price: 8900 },
        { name: "스테이크 & 치즈", price: 7400 },
        { name: "이탈리안 비엠티", price: 7200 },
        { name: "로티세리 바비큐 치킨", price: 6200 },
        { name: "에그마요", price: 8600 },
        { name: "안창 비프", price: 10400 },
        { name: "터키 베이컨 아보카도", price: 8700 },
        { name: "스파이시 쉬림프", price: 8100 },
        { name: "쉬림프", price: 7600 },
        { name: "로스트 치킨", price: 7500 },
        { name: "폴드포크 바비큐", price: 6300 },
        { name: "제로 클럽", price: 7100 },
        { name: "치킨 데리야끼", price: 7000 },
        { name: "스파이시 이탈리안", price: 8100 },
        { name: "비엘티", price: 6600 },
        { name: "터키", price: 6900 },
        { name: "참치", price: 5800 },
        { name: "햄", price: 7100 },
        { name: "에그 슬라이스", price: 5200 },
        { name: "베지", price: 5000 },
        { name: "치킨 슬라이스", price: 6500 },
        { name: "치킨 베이컨 아보카도", price: 8000 },
        { name: "웨스턴 에그&치즈", price: 3900 },
        { name: "햄 에그&치즈", price: 3900 }
      ],
      "클래식": [
        { name: "참치", price: 5800 },
        { name: "햄", price: 7100 },
        { name: "에그마요", price: 8600 },
        { name: "비엘티", price: 6600 },
        { name: "이탈리안 비엠티", price: 7200 }
      ],
      "프레시&라이트": [
        { name: "잠봉", price: 7400 },
        { name: "머쉬룸", price: 6200 },
        { name: "터키", price: 6900 },
        { name: "터키 베이컨 아보카도", price: 8700 },
        { name: "에그 슬라이스", price: 5200 },
        { name: "치킨 슬라이스", price: 6500 },
        { name: "치킨 베이컨 아보카도", price: 8000 },
        { name: "로스트 치킨", price: 7500 },
        { name: "로티세리 바비큐 치킨", price: 6200 },
        { name: "베지", price: 5000 },
        { name: "웨스턴 에그&치즈", price: 3900 },
        { name: "햄 에그&치즈", price: 3900 }
      ],
      "프리미엄": [
        { name: "잠봉 플러스", price: 8900 },
        { name: "폴드포크 바비큐", price: 6300 },
        { name: "스파이시 이탈리안", price: 8100 },
        { name: "치킨 데리야끼", price: 7000 },
        { name: "스테이크 & 치즈", price: 7400 },
        { name: "쉬림프", price: 7600 },
        { name: "스파이시 쉬림프", price: 8100 },
        { name: "제로 클럽", price: 7100 },
        { name: "안창 비프 & 머쉬룸", price: 8900 },
        { name: "안창 비프", price: 10400 }
      ]
    }
  },

  "샐러드": {
    menuType: "salad",
    tabs: ["전체", "클래식", "프레시&라이트", "프리미엄"],
    items: {
      "전체": [
        { name: "잠봉", price: 7400 },
        { name: "잠봉 플러스", price: 8900 },
        { name: "로티세리 치킨 타코", price: 12500 },
        { name: "폴드포크 타코", price: 11900 },
        { name: "스파이시 쉬림프 타코", price: 12800 },
        { name: "안창 비프", price: 12800 },
        { name: "안창 비프 & new 머쉬룸", price: 11400 },
        { name: "new 머쉬룸", price: 8000 },
        { name: "이탈리안 비엠티", price: 7200 },
        { name: "비엘티", price: 8000 },
        { name: "햄", price: 7700 },
        { name: "참치", price: 8200 },
        { name: "에그마요", price: 7500 },
        { name: "폴드포크 바비큐", price: 9900 },
        { name: "로티세리 바비큐 치킨", price: 9100 },
        { name: "쉬림프", price: 9400 },
        { name: "터키 베이컨 아보카도", price: 11200 },
        { name: "제로 클럽", price: 9500 },
        { name: "에그 슬라이스", price: 7000 },
        { name: "스파이시 쉬림프", price: 8000 },
        { name: "스테이크 & 치즈", price: 8200 },
        { name: "로스트 치킨", price: 9100 },
        { name: "치킨 데리야끼", price: 9900 },
        { name: "터키", price: 9000 },
        { name: "베지", price: 6700 },
        { name: "스파이시 이탈리안", price: 8700 },
        { name: "미니 로티세리 치킨 샐러드", price: 2900, directCart: true }
      ],
      "클래식": [
        { name: "이탈리안 비엠티", price: 7200 },
        { name: "비엘티", price: 8000 },
        { name: "햄", price: 7700 },
        { name: "참치", price: 8200 },
        { name: "에그마요", price: 7500 }
      ],
      "프레시&라이트": [
        { name: "잠봉", price: 7400 },
        { name: "터키", price: 9000 },
        { name: "터키 베이컨 아보카도", price: 11200 },
        { name: "에그 슬라이스", price: 7000 },
        { name: "로티세리 바비큐 치킨", price: 9100 },
        { name: "로스트 치킨", price: 9100 },
        { name: "베지", price: 6700 },
        { name: "미니 로티세리 치킨 샐러드", price: 2900, directCart: true }
      ],
      "프리미엄": [
        { name: "잠봉 플러스", price: 8900 },
        { name: "로티세리 치킨 타코", price: 12500 },
        { name: "폴드포크 타코", price: 11900 },
        { name: "스파이시 쉬림프 타코", price: 12800 },
        { name: "스파이시 이탈리안", price: 8700 },
        { name: "쉬림프", price: 9400 },
        { name: "스파이시 쉬림프", price: 8000 },
        { name: "폴드포크 바비큐", price: 9900 },
        { name: "스테이크 & 치즈", price: 8200 },
        { name: "제로 클럽", price: 9500 },
        { name: "안창 비프 & new 머쉬룸", price: 11400 },
        { name: "안창 비프", price: 12800 },
        { name: "new 머쉬룸", price: 8000 },
        { name: "치킨 데리야끼", price: 9900 }
      ]
    }
  },

  "사이드": {
    menuType: "side",
    tabs: ["전체", "감자", "쿠키", "랩"],
    items: {
      "전체": [
        { name: "베이컨 치즈 웨지 포테이토", price: 2300 },
        { name: "치즈 웨지 포테이토", price: 2000 },
        { name: "웨지 포테이토", price: 1500 },
        { name: "스테이크&치즈 아보카도 랩", price: 6600 },
        { name: "쉬림프 에그마요 랩", price: 6200 },
        { name: "치킨 베이컨 미니 랩", price: 3900 },
        { name: "잠봉, 에그&치즈 랩", price: 3900 },
        { name: "웨스턴 에그&치즈 랩", price: 3900 },
        { name: "초코칩", price: 1000 },
        { name: "더블 초코칩", price: 1500 },
        { name: "오렌지 초코칩", price: 1500 },
        { name: "라즈베리 치즈케익", price: 1300 },
        { name: "오트밀 레이즌", price: 1500 },
        { name: "화이트 초코 마카다미아", price: 1500 },
        { name: "칩", price: 1500 }
      ],
      "감자": [
        { name: "베이컨 치즈 웨지 포테이토", price: 2300 },
        { name: "치즈 웨지 포테이토", price: 2000 },
        { name: "웨지 포테이토", price: 1500 },
        { name: "칩", price: 1500 }
      ],
      "쿠키": [
        { name: "초코칩", price: 1000 },
        { name: "더블 초코칩", price: 1500 },
        { name: "오렌지 초코칩", price: 1500 },
        { name: "라즈베리 치즈케익", price: 1300 },
        { name: "오트밀 레이즌", price: 1500 },
        { name: "화이트 초코 마카다미아", price: 1500 }
      ],
      "랩": [
        { name: "스테이크&치즈 아보카도 랩", price: 6600 },
        { name: "쉬림프 에그마요 랩", price: 6200 },
        { name: "치킨 베이컨 미니 랩", price: 3900 },
        { name: "잠봉, 에그&치즈 랩", price: 3900 },
        { name: "웨스턴 에그&치즈 랩", price: 3900 }
      ]
    }
  },

  "음료/수프": {
    menuType: "drink_soup",
    tabs: ["전체", "수프", "음료"],
    items: {
      "전체": [
        { name: "머쉬룸 수프", price: 3000 },
        { name: "콘 수프", price: 4100 },
        { name: "포테이토 베이컨 수프", price: 4100 },
        { name: "커피", price: 2000 },
        { name: "콜라", price: 2000 },
        { name: "사이다", price: 2000 }
      ],
      "수프": [
        { name: "머쉬룸 수프", price: 3000 },
        { name: "콘 수프", price: 4100 },
        { name: "포테이토 베이컨 수프", price: 4100 }
      ],
      "음료": [
        { name: "커피", price: 2000 },
        { name: "콜라", price: 2000 },
        { name: "사이다", price: 2000 }
      ]
    }
  }
};

let currentMain = "샌드위치";
let currentSub = "전체";

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

function formatPrice(value) {
  return `${Number(value || 0).toLocaleString()}원`;
}

function getCart() {
  try {
    return JSON.parse(sessionStorage.getItem(cartStorageKey)) || [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  sessionStorage.setItem(cartStorageKey, JSON.stringify(cart));
}

function getCartTotal(cart) {
  return cart.reduce((sum, item) => {
    const unitPrice = Number(item.totalPrice || item.basePrice || 0);
    const quantity = Number(item.quantity || 1);
    return sum + unitPrice * quantity;
  }, 0);
}

function createMainTabs() {
  const mains = Object.keys(kioskData);
  mainTabs.innerHTML = mains.map(name => `
    <button class="tab ${name === currentMain ? "active" : ""}" data-main="${name}">${name}</button>
  `).join("");

  mainTabs.querySelectorAll("[data-main]").forEach(btn => {
    btn.addEventListener("click", () => {
      currentMain = btn.dataset.main;
      currentSub = kioskData[currentMain].tabs[0];
      render();
    });
  });
}

function createSubTabs() {
  const tabs = kioskData[currentMain].tabs;
  subTabs.style.gridTemplateColumns = `repeat(${tabs.length}, 1fr)`;

  subTabs.innerHTML = tabs.map(name => `
    <button class="tab sub ${name === currentSub ? "active" : ""}" data-sub="${name}">${name}</button>
  `).join("");

  subTabs.querySelectorAll("[data-sub]").forEach(btn => {
    btn.addEventListener("click", () => {
      currentSub = btn.dataset.sub;
      createSubTabs();
      renderMenus();
    });
  });
}

function renderMenus() {
  headerHighlight.textContent = currentMain;

  const items = kioskData[currentMain].items[currentSub] || [];
  const menuType = kioskData[currentMain].menuType;

  menuGrid.innerHTML = items.map(item => {
    const imageKey = `${menuType}_${item.name}`;
    const imagePath = imageMap[imageKey];

    return `
      <article class="menu-card"
               data-menu-name="${item.name}"
               data-menu-price="${item.price}"
               data-direct-cart="${item.directCart ? "true" : "false"}">
        <div class="menu-thumb">
          ${imagePath
            ? `<img src="${imagePath}" alt="${item.name}">`
            : `<div class="placeholder">이미지</div>`}
        </div>
        <div class="menu-name">${item.name}</div>
        <div class="menu-price">${formatPrice(item.price)}</div>
      </article>
    `;
  }).join("");

  menuGrid.querySelectorAll(".menu-card").forEach(card => {
    card.addEventListener("click", () => {
      handleMenuClick(
        card.dataset.menuName,
        Number(card.dataset.menuPrice),
        card.dataset.directCart === "true"
      );
    });
  });
}

function buildDirectCartItem(menuName, price, menuType) {
  return {
    id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
    menu: menuName,
    menuType: menuType,
    bread: "",
    cheese: "",
    vegetable: "",
    sauce: "",
    extra: "",
    quantity: 1,
    basePrice: price,
    extraPrice: 0,
    totalPrice: price
  };
}

function isSameCartItem(a, b) {
  return (
    (a.menu || "") === (b.menu || "") &&
    (a.menuType || "") === (b.menuType || "") &&
    (a.bread || "") === (b.bread || "") &&
    (a.cheese || "") === (b.cheese || "") &&
    (a.vegetable || "") === (b.vegetable || "") &&
    (a.sauce || "") === (b.sauce || "") &&
    (a.extra || "") === (b.extra || "") &&
    Number(a.basePrice || 0) === Number(b.basePrice || 0) &&
    Number(a.extraPrice || 0) === Number(b.extraPrice || 0) &&
    Number(a.totalPrice || 0) === Number(b.totalPrice || 0)
  );
}

function addCartItem(newItem) {
  const cart = getCart();
  const foundIndex = cart.findIndex(item => isSameCartItem(item, newItem));

  if (foundIndex >= 0) {
    cart[foundIndex].quantity = Number(cart[foundIndex].quantity || 1) + Number(newItem.quantity || 1);
  } else {
    cart.push({
      ...newItem,
      id: newItem.id || `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      quantity: Number(newItem.quantity || 1)
    });
  }

  saveCart(cart);
  renderCart();
}

function handleMenuClick(menuName, price, directCart) {
  const menuType = kioskData[currentMain].menuType;

  if ((menuType === "sandwich" || menuType === "salad") && !directCart) {
    if (typeof window.goOptionPage === "function") {
      window.goOptionPage(menuType, menuName, price);
    } else {
      console.error("goOptionPage 함수가 없습니다.");
    }
    return;
  }

  addCartItem(buildDirectCartItem(menuName, price, menuType));
}

function makeTagRows(item) {
  const rows = [{ label: "메뉴", value: item.menu }];

  if (item.menuType === "sandwich" && item.bread) {
    rows.push({ label: "빵", value: item.bread });
  }
  if (item.cheese) rows.push({ label: "치즈", value: item.cheese });
  if (item.vegetable) rows.push({ label: "야채", value: item.vegetable });
  if (item.sauce) rows.push({ label: "소스", value: item.sauce });
  if (item.extra) rows.push({ label: "추가", value: item.extra });

  return rows;
}

function renderCart() {
  const cart = getCart();

  if (!cart.length) {
    cartEmpty.style.display = "flex";
    cartFilled.style.display = "none";
    cartList.innerHTML = "";
    cartTotalPrice.textContent = "0원";
    return;
  }

  cartEmpty.style.display = "none";
  cartFilled.style.display = "block";

  cartList.innerHTML = cart.map(item => {
    const rows = makeTagRows(item);

    return `
      <div class="cart-item" data-cart-id="${String(item.id)}">
        <div class="cart-tags">
          ${rows.map(row => `
            <div class="cart-tag-row">
              <div class="cart-tag">${row.label}</div>
              <div class="cart-tag-value">${row.value}</div>
            </div>
          `).join("")}
        </div>

        <div class="cart-bottom">
          <div class="cart-qty">
            <span class="cart-qty-label">수량</span>
            <button type="button" class="qty-btn" data-action="minus">−</button>
            <span class="qty-value">${item.quantity || 1}</span>
            <button type="button" class="qty-btn" data-action="plus">+</button>
          </div>

          <div class="cart-price">${formatPrice((item.totalPrice || item.basePrice || 0) * (item.quantity || 1))}</div>

          <button type="button" class="cart-remove" data-action="remove">×</button>
        </div>
      </div>
    `;
  }).join("");

  cartTotalPrice.textContent = formatPrice(getCartTotal(cart));

  cartList.querySelectorAll(".cart-item").forEach(itemEl => {
    const id = itemEl.dataset.cartId;

    itemEl.querySelector('[data-action="minus"]').addEventListener("click", () => updateCartQty(id, -1));
    itemEl.querySelector('[data-action="plus"]').addEventListener("click", () => updateCartQty(id, 1));
    itemEl.querySelector('[data-action="remove"]').addEventListener("click", () => removeCartItem(id));
  });
}

function updateCartQty(id, delta) {
  const cart = getCart().map(item => {
    if (String(item.id) !== String(id)) return item;

    const nextQty = Math.max(1, Number(item.quantity || 1) + delta);
    return { ...item, quantity: nextQty };
  });

  saveCart(cart);
  renderCart();
}

function removeCartItem(id) {
  const cart = getCart().filter(item => String(item.id) !== String(id));
  saveCart(cart);
  renderCart();
}

function moveSubTab(direction) {
  const tabs = kioskData[currentMain].tabs;
  const currentIndex = tabs.indexOf(currentSub);
  let nextIndex = currentIndex;

  if (direction === "left") {
    nextIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
  } else {
    nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
  }

  currentSub = tabs[nextIndex];
  createSubTabs();
  renderMenus();
}

function syncPendingCartItem() {
  try {
    const pending = JSON.parse(sessionStorage.getItem("pendingCartItem") || "null");
    if (!pending) return;

    addCartItem({
      quantity: pending.quantity || 1,
      ...pending
    });

    sessionStorage.removeItem("pendingCartItem");
  } catch (error) {
    sessionStorage.removeItem("pendingCartItem");
  }
}

function render() {
  createMainTabs();
  createSubTabs();
  renderMenus();
  renderCart();
}

leftArrow.addEventListener("click", () => moveSubTab("left"));
rightArrow.addEventListener("click", () => moveSubTab("right"));

syncPendingCartItem();
render();