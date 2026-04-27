function bindImageFallback(imageId, fallbackId, displayType) {
  const imageEl = document.getElementById(imageId);
  const fallbackEl = document.getElementById(fallbackId);

  if (!imageEl || !fallbackEl) return;

  imageEl.addEventListener('error', function () {
    imageEl.style.display = 'none';
    fallbackEl.style.display = displayType;
  });
}

window.addEventListener('DOMContentLoaded', function () {
  bindImageFallback('logoImg', 'logoFallback', 'block');
  bindImageFallback('eatInImg', 'eatInFallback', 'flex');
  bindImageFallback('takeOutImg', 'takeOutFallback', 'flex');
  bindImageFallback('adImg', 'adFallback', 'block');
  
  function resetSession() {
    sessionStorage.removeItem("cart");
    sessionStorage.removeItem("totalAmount");
    sessionStorage.removeItem("item");
  }
  
  const eatInBtn = document.getElementById("eatInBtn");
  const takeOutBtn = document.getElementById("takeOutBtn");

  if (eatInBtn) {
    eatInBtn.addEventListener("click", resetSession);
  }

  if (takeOutBtn) {
    takeOutBtn.addEventListener("click", resetSession);
  }
});
function closePopup() {
    document.getElementById('welcomePopup').style.display = 'none';
}

// 5초 후 자동으로 닫기
setTimeout(closePopup, 5000);