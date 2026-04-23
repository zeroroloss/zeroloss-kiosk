const kioskData = {
  '1': [
    { kioskId: 1, kioskNo: '1번' },
    { kioskId: 2, kioskNo: '2번' }
  ],
  '2': [
    { kioskId: 3, kioskNo: '1번' },
    { kioskId: 4, kioskNo: '2번' }
  ],
  '3': [
    { kioskId: 5, kioskNo: '1번' }
  ],
  '4': [
    { kioskId: 6, kioskNo: '1번' },
    { kioskId: 7, kioskNo: '2번' },
    { kioskId: 8, kioskNo: '3번' }
  ]
};

const branchSelect = document.getElementById('branchSelect');
const kioskSelect  = document.getElementById('kioskSelect');
const confirmBtn   = document.getElementById('confirmBtn');
const infoText     = document.getElementById('infoText');
const infoKiosk    = document.getElementById('infoKiosk');

function resetKioskSelect() {
  kioskSelect.innerHTML = '<option value="">키오스크를 선택하세요</option>';
  kioskSelect.disabled = true;
  confirmBtn.disabled = true;
  infoKiosk.textContent = '-';
}

function onBranchChange() {
  const branchId = branchSelect.value;
  const branchName = branchSelect.options[branchSelect.selectedIndex].text;

  resetKioskSelect();

  if (!branchId) {
    infoText.textContent = '-';
    return;
  }

  infoText.textContent = branchName;
  kioskSelect.disabled = false;

  (kioskData[branchId] || []).forEach(function (k) {
    const opt = document.createElement('option');
    opt.value = k.kioskId;
    opt.textContent = '키오스크 ' + k.kioskNo;
    kioskSelect.appendChild(opt);
  });
}

branchSelect.addEventListener('change', onBranchChange);

kioskSelect.addEventListener('change', function () {
  if (kioskSelect.value) {
    infoKiosk.textContent = kioskSelect.options[kioskSelect.selectedIndex].text;
    confirmBtn.disabled = false;
  } else {
    infoKiosk.textContent = '-';
    confirmBtn.disabled = true;
  }
});

window.goStart = function (contextPath) {
  const branchId = branchSelect.value;
  const kioskId = kioskSelect.value;

  if (!branchId || !kioskId) return;

  sessionStorage.setItem('branchId', branchId);
  sessionStorage.setItem('kioskId', kioskId);

  location.href = contextPath + '/kiosk_jsp/main/start.jsp';
};