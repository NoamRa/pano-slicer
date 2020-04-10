import { calcLineCoordinates, scaler, calcSlices, Slice } from "./geometry";
const CANVAS_ID = "preview-canvas";

function getMainCanvas(): HTMLCanvasElement {
  return document.getElementById(CANVAS_ID) as HTMLCanvasElement;
}

export function loadImageToCanvas(imageFile: File, drawLines: boolean) {
  let image: HTMLImageElement;
  let imageReader: FileReader;

  function createImage() {
    image = new Image();
    image.onload = imageLoaded;
    image.src = imageReader.result as string;
  }

  function createSlice(
    slice: Slice,
    index: number,
    letterBox: number,
  ): HTMLCanvasElement {
    const sliceEl: HTMLCanvasElement = document.createElement("canvas");
    sliceEl.id = `${imageFile.name}-slice-${index + 1}`;
    sliceEl.dataset.downloadName = `${imageFile.name} slice ${index + 1}`
    sliceEl.width = slice.w;
    sliceEl.height = slice.h;

    const ctx = sliceEl.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, sliceEl.width, sliceEl.height);

    // orig image coords
    const sx = index * slice.w;
    const sy = 0;
    const sWidth = slice.w;
    const sHeight = slice.h;

    // destination coords
    const dx = 0;
    const dy = letterBox;
    const dWidth = sWidth;
    const dHeight = sHeight;

    ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

    return sliceEl;
  }

  function imageLoaded() {
    const canvas = getMainCanvas();

    const { scaledImageDimension, canvasDimension, parts, letterBox } = scaler({
      width: image.width,
      height: image.height,
    });

    canvas.width = canvasDimension.width;
    canvas.height = canvasDimension.height;

    const lines = calcLineCoordinates(
      { width: canvas.width, height: canvas.height },
      parts,
    );

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
      image,
      0,
      letterBox,
      scaledImageDimension.width,
      scaledImageDimension.height,
    );

    if (drawLines) {
      ctx.strokeStyle = "rgba(255, 0, 0, 0.7)"; // red with transparency
      ctx.setLineDash([20, 5]);
      lines.forEach(({ start, end }) => {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      });
    }
    const slices = calcSlices({
      width: canvasDimension.width,
      height: canvasDimension.height,
    });

    const slicesContainer = document.getElementById("slices-container");
    while (slicesContainer.hasChildNodes()) {
      slicesContainer.removeChild(slicesContainer.lastChild);
    }
    slices.forEach((slice, index, slices) => {
      const canvasAndButtonWrapperEl: HTMLDivElement = document.createElement("div");
      canvasAndButtonWrapperEl.classList.add("column", "fit-in-parent");

      const sliceEl = createSlice(slice, index, letterBox);
      sliceEl.classList.add("slice-canvas");
      canvasAndButtonWrapperEl.appendChild(sliceEl);
      
      const buttonEl = document.createElement("button");
      buttonEl.innerText = `Download image ${index+1} / ${slices.length}`
      buttonEl.addEventListener("click", () => downloadFromCanvas(sliceEl))
      canvasAndButtonWrapperEl.appendChild(buttonEl);

      slicesContainer.appendChild(canvasAndButtonWrapperEl);
    });
  }

  imageReader = new FileReader();
  imageReader.onload = createImage;
  imageReader.readAsDataURL(imageFile);
}

enum ImageType {
  png = "png",
  jpeg = "jpg",
}
function downloadFromCanvas(
  canvas: HTMLCanvasElement,
  imgType: ImageType = ImageType.png,
) {
  const type = `image/${imgType}`;
  const img = canvas.toDataURL(type);
  // const currentHref = window.location.href;
  const link = document.createElement("a");
  link.download = `${canvas.dataset.downloadName}.${imgType}` || `canvas.${imgType}`;
  link.href = img;
  link.click();
  // window.location.href = img.replace(type, "image/octet-stream");
  // window.location.href = currentHref;
}

export function handleDownload() {
  const canvas = getMainCanvas();
  downloadFromCanvas(canvas);
}
