const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = 1200;
const HEIGHT = 675;

// Fix mờ trên mobile
const dpr = window.devicePixelRatio || 1;
canvas.width = WIDTH * dpr;
canvas.height = HEIGHT * dpr;
canvas.style.width = WIDTH + "px";
canvas.style.height = HEIGHT + "px";
ctx.scale(dpr, dpr);

// Load ảnh nền
const bg = new Image();
bg.src = "bg.png";

function buildImage() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT);

  const file = document.getElementById("avatar").files[0];
  if (!file) {
    alert("Chọn ảnh đại diện trước!");
    return;
  }

  const img = new Image();
  img.onload = () => {
    drawAvatar(img);
    drawText();
    exportImage();
  };
  img.src = URL.createObjectURL(file);
}

function drawAvatar(img) {
  const x = 140;
  const y = 260;
  const r = 90;

  ctx.save();
  ctx.beginPath();
  ctx.arc(x + r, y + r, r, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(img, x, y, r * 2, r * 2);
  ctx.restore();
}

function drawText() {
  // Kỳ vọng
  ctx.fillStyle = "#0b4fd6";
  ctx.font = "48px Arial";
  wrapText(
    ctx,
    document.getElementById("wish").value,
    420,
    300,
    650,
    56
  );

  // Tên
  ctx.font = "bold 32px Arial";
  ctx.fillStyle = "#e53935";
  ctx.fillText(
    document.getElementById("name").value,
    140,
    520
  );

  // Chức vụ
  ctx.font = "28px Arial";
  ctx.fillStyle = "#ff9800";
  ctx.fillText(
    document.getElementById("role").value,
    140,
    560
  );
}

// Xuống dòng cho đoạn dài
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    if (ctx.measureText(testLine).width > maxWidth && i > 0) {
      ctx.fillText(line, x, y);
      line = words[i] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

function exportImage() {
  const link = document.getElementById("download");
  link.href = canvas.toDataURL("image/png");
}
