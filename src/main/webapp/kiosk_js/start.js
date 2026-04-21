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
});