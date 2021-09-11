interface Dimension {
  currentXAxis: number;
  currentYAxis: number;
}

interface DimensionWithImageData extends Dimension {
  imageData: ImageData;
}

interface DimensionWithHexColorCode extends Dimension {
  hexColorCode: string;
}

interface SVGWithDimension extends Dimension {
  svgBlobUrl: string;
}
