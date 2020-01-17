export const MAX_DIMENSION = 1080; // max width or height an Instagram image can be

type Dimension = {
  width: number;
  height: number;
};

type Line = {
  start: {
    x: number;
    y: number;
  };
  end: {
    x: number;
    y: number;
  };
};

function calcLinePositions(
  imageWidth: number,
  desiredParts: number
): number[] {
  const partWidth = imageWidth / desiredParts;
  const numberOfLines = desiredParts - 1;
  const lines = Array.from(
    { length: numberOfLines },
    (_, idx) => idx + 1
  ).map(partIdx => Math.round(partIdx * partWidth));
  return lines;
}

export function calcLineCoordinates(
  imageDimension: Dimension,
  parts: number
): Line[] {
  const linePositions = calcLinePositions(imageDimension.width, parts);
  return linePositions.map(pos => ({
    start: {
      x: pos,
      y: 0
    },
    end: {
      x: pos,
      y: imageDimension.height
    }
  }));
}

type Parts = number; // interger
type LetterBoxHeight = number;
type CalcPartsAndLetterBoxRet = {
  parts: Parts;
  letterBox: LetterBoxHeight;
};

export function scaler(
  { width, height }: Dimension,
  maxDimension: number = MAX_DIMENSION
): {
  scaledImageDimension: Dimension;
  canvasDimension: Dimension;
  scaleFactor: number;
  parts: Parts;
  letterBox: LetterBoxHeight;
} {
  let scaleFactor = 1;
  let scaledWidth = width;
  let scaledHeight = height;

  if (height >= maxDimension) {
    scaleFactor = height / maxDimension;
    scaledWidth = height * scaleFactor;
    scaledHeight = width * scaleFactor;
  }

  const { parts, letterBox } = calcPartsAndLetterBox({
    width: scaledWidth,
    height: scaledHeight
  });

  return {
    scaledImageDimension: { width: scaledWidth, height: scaledHeight },
    canvasDimension: {
      width: scaledWidth,
      height: scaledHeight + letterBox * 2
    },
    scaleFactor,
    parts,
    letterBox
  };
}

/**
 * @function calculates how manny parts should the pano be split to and the letterBox height to add
 * @param dimension.width - image width
 * @param dimension.height - image height
 * @var parts - Integer. The number of parts the panorama will fit in. It's round up of width / height
 * @var letterBox - Integer. The number that will be added to top and bottom in order to have n parts of 1:1 ratio
 * @returns { parts, letterBox }
 */
function calcPartsAndLetterBox({
  width,
  height
}: Dimension): CalcPartsAndLetterBoxRet {
  if (height >= width) return { parts: 1, letterBox: 0 };

  const parts = Math.trunc(width / height);
  const desiredHeight = width / parts;
  const gap = desiredHeight - height;
  const letterBox = gap / 2; // divided by two as we want LBX value for top and bottom

  console.log(
    "sanity:",
    "width:",
    width,
    "height:",
    height,
    "canvas height:",
    height + letterBox * 2
  );
  return { parts, letterBox };
}
