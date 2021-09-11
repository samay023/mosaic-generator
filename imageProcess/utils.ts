export const MAX_IMAGE_WIDTH = 700;

export const getTotalUnitsinXAndYAxis = (
  height: number,
  width: number,
  tileHeight: number,
  tileWidth: number
) => {
  return {
    xAxis: Math.ceil(width / tileWidth),
    yAxis: Math.ceil(height / tileHeight),
  };
};

export const scaleAndConvertToImageElement = (image: ImageBitmap) => {
  const newImageElement = new Image();

  if (image.width > MAX_IMAGE_WIDTH) {
    newImageElement.height = image.height * (MAX_IMAGE_WIDTH / image.width);
    newImageElement.width = MAX_IMAGE_WIDTH;
  } else {
    newImageElement.height = image.height;
    newImageElement.width = image.width;
  }

  // Use a canvas to scale the image
  const scalingCanvas = document.createElement('canvas');
  scalingCanvas.width = newImageElement.width;
  scalingCanvas.height = newImageElement.height;

  const scalingContext = scalingCanvas.getContext('2d');

  if (scalingContext) {
    scalingContext.drawImage(image, 0, 0, newImageElement.width, newImageElement.height);
    newImageElement.src = scalingCanvas.toDataURL();
    return newImageElement;
  }
};
