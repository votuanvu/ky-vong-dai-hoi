// AVATAR PREVIEW
const avatarInput = document.getElementById("avatar");
const avatarPreview = document.getElementById("avatarPreview");

avatarInput.addEventListener("change", () => {
  const file = avatarInput.files[0];
  if (file) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

// TEXT BINDING
document.getElementById("name").addEventListener("input", e => {
  document.querySelector(".name").innerText = e.target.value;
});

document.getElementById("position").addEventListener("input", e => {
  document.querySelector(".position").innerText = e.target.value;
});

document.getElementById("wish").addEventListener("input", e => {
  document.querySelector(".wish").innerText = e.target.value;
});

// DOWNLOAD IMAGE
function downloadImage() {
  const el = document.getElementById("canvas-area");

  html2canvas(el, { scale: 2 }).then(canvas => {
    const link = document.createElement("a");
    link.download = "ky-vong-dai-hoi.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast();
  });
}

// TOAST
function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}
