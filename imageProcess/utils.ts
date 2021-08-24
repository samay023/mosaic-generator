const getAverageRgbFromImageData = ({ data }: ImageData) => {
  let r = 0;
  let g = 0;
  let b = 0;

  for (let i = 0, l = data.length; i < l; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }

  r = Math.floor(r / (data.length / 4));
  g = Math.floor(g / (data.length / 4));
  b = Math.floor(b / (data.length / 4));

  return { r, g, b };
};

const convertRgbToHex = ({ r, g, b }: ReturnType<typeof getAverageRgbFromImageData>) => {
  return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const getAverageHexCodeFromImageData = (imageData: ImageData) => {
  const rgb = getAverageRgbFromImageData(imageData);
  return convertRgbToHex(rgb);
};

export const getTotalUnitsinXAndYAxis = (
  height: number,
  width: number,
  tileHeight: number,
  tileWidth: number
) => {
  return {
    xAxis: width / tileWidth,
    yAxis: height / tileHeight,
  };
};

const getBestPossibleImageSizeUnit = (
  imageHeightOrWidth: number,
  maxHeightOrWidth: number,
  tileHeightOrWidth: number
) => {
  if (imageHeightOrWidth > maxHeightOrWidth) {
    return maxHeightOrWidth;
  } else if (imageHeightOrWidth < maxHeightOrWidth) {
    // Divide the image / tilehegiht
    // if the remainder is 0
    // use that height
    // otherwise use the next closest possible height (which would be less than the image height resulting in cropped)
    const remainder = imageHeightOrWidth % tileHeightOrWidth;
    if (remainder === 0) {
      return imageHeightOrWidth;
    } else {
      return imageHeightOrWidth - remainder;
    }
  } else {
    // image size and max size are the same
    return imageHeightOrWidth;
  }
};

/**
 * A utility which has some built in logic to get the best appropriate dimensions for the canvas
 * @param tileWidth
 * @param tileHeight
 * @param imageHeight
 * @param imageWidth
 */
export const getBestDimensionForImage = (
  tileWidth: number,
  tileHeight: number,
  imageHeight: number,
  imageWidth: number
) => {
  const maxHeight = tileHeight > 30 ? tileHeight * 20 : tileHeight * 30;
  const maxWidth = tileWidth > 30 ? tileWidth * 20 : tileWidth * 30;

  return {
    height: getBestPossibleImageSizeUnit(imageHeight, maxHeight, tileHeight),
    width: getBestPossibleImageSizeUnit(imageWidth, maxWidth, tileWidth),
  };
};
