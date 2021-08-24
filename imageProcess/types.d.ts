
interface HexCodeWithDimension {
    hexColorCode: string;
    currentXAxis: number;
    currentYAxis: number;
  }
  type DrawCanvasAndGetAverageWithDimensions = (
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    totalXAxisUnits: number,
    totalYAxisUnits: number,
    tileWidth: number,
    tileHeight: number
  ) => HexCodeWithDimension[];