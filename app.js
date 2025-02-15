let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");

function generateQR() {
  if (qrText.value.length > 0) {
    qrImage.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
      qrText.value;
    imgBox.classList.add("show-img");
  } else {
    qrText.classList.add("error");
    setTimeout(() => {
      qrText.classList.remove("error");
    }, 1000);
  }
}
document.getElementById("downloadBtn").addEventListener("click", function () {
  if (qrText.value.length > 0) {
    let canvas = document.getElementById("qrCanvas");
    let ctx = canvas.getContext("2d");

    let qrImageTemp = new Image();
    qrImageTemp.crossOrigin = "anonymous"; // حل مشکل CORS
    qrImageTemp.src = qrImage.src;

    qrImageTemp.onload = function () {
      canvas.width = qrImageTemp.width;
      canvas.height = qrImageTemp.height;
      ctx.drawImage(qrImageTemp, 0, 0, canvas.width, canvas.height);

      let link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qrcode.png";
      link.click();
    };
  }
});
