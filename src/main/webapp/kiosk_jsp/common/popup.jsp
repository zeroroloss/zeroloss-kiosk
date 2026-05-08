<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<style>
/* =========================
   공통 키오스크 팝업
   ========================= */

.kiosk-popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;
}

.kiosk-popup-overlay.hidden {
  display: none !important;
}

.kiosk-popup-box {
  width: 720px;
  background: #ffffff;
  border-radius: 34px;
  padding: 56px 48px 44px;

  text-align: center;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.22);
}

.kiosk-popup-title {
  font-size: 44px;
  font-weight: 800;
  color: #111111;

  margin-bottom: 28px;
}

.kiosk-popup-message {
  font-size: 30px;
  line-height: 1.5;
  color: #333333;

  white-space: pre-line;

  margin-bottom: 48px;
}

.kiosk-popup-buttons {
  display: flex;
  gap: 18px;
}

.kiosk-popup-btn {
  flex: 1;
  height: 96px;

  border: none;
  border-radius: 24px;

  font-size: 30px;
  font-weight: 800;

  cursor: pointer;
}

.kiosk-popup-btn.confirm {
  background: #009223;
  color: #ffffff;
}

.kiosk-popup-btn.cancel {
  background: #e5e5e5;
  color: #111111;
}

.kiosk-popup-btn.hidden {
  display: none !important;
}
</style>

<div id="kioskPopup" class="kiosk-popup-overlay hidden">

  <div class="kiosk-popup-box">

    <div id="kioskPopupTitle" class="kiosk-popup-title">
      알림
    </div>

    <div id="kioskPopupMessage" class="kiosk-popup-message">
      내용
    </div>

    <div class="kiosk-popup-buttons">

      <button
        type="button"
        id="kioskPopupCancelBtn"
        class="kiosk-popup-btn cancel hidden">
        취소
      </button>

      <button
        type="button"
        id="kioskPopupConfirmBtn"
        class="kiosk-popup-btn confirm">
        확인
      </button>

    </div>

  </div>

</div>

<script>
function showKioskPopup(options) {
  options = options || {};

  const title = options.title || "알림";
  const message = options.message || "";
  const confirmText = options.confirmText || "확인";
  const cancelText = options.cancelText || "취소";
  const showCancel = options.showCancel || false;
  const onConfirm = options.onConfirm || null;
  const onCancel = options.onCancel || null;

  const popup = document.getElementById("kioskPopup");
  const titleEl = document.getElementById("kioskPopupTitle");
  const messageEl = document.getElementById("kioskPopupMessage");
  const confirmBtn = document.getElementById("kioskPopupConfirmBtn");
  const cancelBtn = document.getElementById("kioskPopupCancelBtn");

  titleEl.textContent = title;
  messageEl.textContent = message;

  confirmBtn.textContent = confirmText;
  cancelBtn.textContent = cancelText;

  cancelBtn.classList.toggle("hidden", !showCancel);
  popup.classList.remove("hidden");

  confirmBtn.onclick = function () {
    closeKioskPopup();

    if (typeof onConfirm === "function") {
      onConfirm();
    }
  };

  cancelBtn.onclick = function () {
    closeKioskPopup();

    if (typeof onCancel === "function") {
      onCancel();
    }
  };
}

function closeKioskPopup() {
  const popup = document.getElementById("kioskPopup");

  if (popup) {
    popup.classList.add("hidden");
  }
}
</script>