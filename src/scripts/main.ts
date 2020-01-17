import { calcLineCoordinates, scaler } from "./geometry";

const HIDDEN_IMAGE_ID = "hidden-image";
const CANVAS_ID = "canvas";
const INPUT_ID = "image-picker";

function getHiddenImage(): HTMLImageElement {
  return document.getElementById(HIDDEN_IMAGE_ID) as HTMLImageElement;
}

function getCanvas(): HTMLCanvasElement {
  return document.getElementById(CANVAS_ID) as HTMLCanvasElement;
}

function storeImage(image: File) {
  const imageEl = getHiddenImage();
  imageEl.src = window.URL.createObjectURL(image);
}

function loadImageToCanvas(imageFile: File) {
  let image: HTMLImageElement;
  let imageReader: FileReader;

  function createImage() {
    image = new Image();
    image.onload = imageLoaded;
    image.src = imageReader.result as string;
  }

  function imageLoaded() {
    const canvas = getCanvas();

    const { scaledImageDimension, canvasDimension, parts, letterBox } = scaler({
      width: image.width,
      height: image.height
    });

    canvas.width = canvasDimension.width;
    canvas.height = canvasDimension.height;

    const lines = calcLineCoordinates(
      { width: canvas.width, height: canvas.height },
      parts
    );

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
      image,
      0,
      letterBox,
      scaledImageDimension.width,
      scaledImageDimension.height
    );

    ctx.strokeStyle = "rgba(255, 0, 0, 0.7)"; // red with transparency
    ctx.setLineDash([20, 5]);
    lines.forEach(({ start, end }) => {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    });
  }

  imageReader = new FileReader();
  imageReader.onload = createImage;
  imageReader.readAsDataURL(imageFile);
}

export function handleImageChange(fileInput: HTMLInputElement) {
  const file: File = fileInput.files[0];
  if (file) {
    storeImage(file);
    loadImageToCanvas(file);
  }
}

enum ImageType {
  png = "png",
  jpeg = "jpg" 
}
export function downloadFromCanvas(imgType: ImageType = ImageType.png) {
  const type = `image/${imgType}`
  const canvas = getCanvas();
  const img = canvas.toDataURL(type);
  // const currentHref = window.location.href;
  const link = document.createElement('a');
  link.download = `canvas.${imgType}`;
  link.href = img;
  link.click();
  // window.location.href = img.replace(type, "image/octet-stream");
  // window.location.href = currentHref;
}
