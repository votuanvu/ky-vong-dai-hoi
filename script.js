const avatar = document.getElementById("avatar");
const avatarPreview = document.getElementById("avatarPreview");

avatar.onchange = () => {
  const file = avatar.files[0];
  avatarPreview.src = URL.createObjectURL(file);
};

["name", "position", "wish"].forEach(id => {
  document.getElementById(id).oninput = e => {
    document.querySelector("." + id).innerText = e.target.value;
  };
});

function downloadImage() {
  html2canvas(document.getElementById("canvas-area")).then(canvas => {
    const link = document.createElement("a");
    link.download = "ky-vong-dai-hoi.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
