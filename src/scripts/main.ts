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
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
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
