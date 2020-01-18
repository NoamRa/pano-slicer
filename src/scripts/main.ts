import { loadImageToCanvas, handleDownload } from "./canvas";
export { handleDownload };

const HIDDEN_IMAGE_ID = "hidden-image";
const INPUT_ID = "image-picker";

function getHiddenImage(): HTMLImageElement {
  return document.getElementById(HIDDEN_IMAGE_ID) as HTMLImageElement;
}

function storeImage(image: File) {
  const imageEl = getHiddenImage();
  imageEl.src = window.URL.createObjectURL(image);
}

export function handleImageChange(fileInput: HTMLInputElement) {
  const file: File = fileInput.files[0];
  if (file) {
    storeImage(file);
    loadImageToCanvas(file, true);
  }
}
