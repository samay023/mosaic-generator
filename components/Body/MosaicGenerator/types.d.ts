interface HexCodeWithDimension {
  hexColorCode: string;
  currentXAxis: number;
  currentYAxis: number;
}

type AverageHexCodeDimensionHandler = (newResult: HexCodeWithDimension[][]) => void;

type ResetHexCodeDimensionHandler = () => void;

type ImageEventHandler = (evt: any) => void;

interface ImageCanvasProps {
  src: string;
  setHexCodeWithDimension: AverageHexCodeDimensionHandler;
  resetHexCodeDimensions: ResetHexCodeDimensionHandler;
}

interface ImagePickerProps {
  onChange: ImageEventHandler;
}

interface MosaicImageProps {
  hexCodesWithDimensionsForEachRow: HexCodeWithDimension[][];
}
