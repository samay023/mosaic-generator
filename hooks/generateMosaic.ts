import { RefObject } from 'react';
import { APICacheForSVG } from '../apiCache/cache';
import { getTotalUnitsinXAndYAxis } from '../imageProcess';

const tileHeight = Number(process.env.NEXT_PUBLIC_TILE_WIDTH) || 16;
const tileWidth = Number(process.env.NEXT_PUBLIC_TILE_HEIGHT) || 16;

const createTile = () => {
  const tile = document.createElement('canvas');
  tile.width = tileWidth;
  tile.height = tileHeight;

  return tile.getContext('2d');
};

const getImageDataForEachRow = (tile: CanvasRenderingContext2D, image: HTMLImageElement) => {
  const { xAxis: totalXAxisUnits, yAxis: totalYAxisUnits } = getTotalUnitsinXAndYAxis(
    image.height,
    image.width,
    tileHeight,
    tileWidth
  );

  let currentYAxis = 0;
  let currentXAxis = 0;
  let xAxisUnitCount = 0;
  let yAxistUnitCount = 0;
  let dimensionWithImageData: DimensionWithImageData[][] = [];

  // Draw each tile of the image using the tile
  // After these tiles are drawn, we can then capture the average color of the tile using a worker
  while (yAxistUnitCount !== totalYAxisUnits) {
    const dimensionWithIDataForEachRow: DimensionWithImageData[] = [];
    while (xAxisUnitCount !== totalXAxisUnits) {
      tile.drawImage(
        image,
        currentXAxis,
        currentYAxis,
        tileWidth,
        tileHeight,
        0,
        0,
        tileWidth,
        tileHeight
      );

      const imageData = tile.getImageData(0, 0, tileWidth, tileHeight);

      dimensionWithIDataForEachRow.push({
        currentXAxis,
        currentYAxis,
        imageData,
      });

      currentXAxis = currentXAxis + tileWidth;
      xAxisUnitCount++;
    }

    // reset variables
    xAxisUnitCount = 0;
    currentXAxis = 0;

    dimensionWithImageData.push(dimensionWithIDataForEachRow);
    currentYAxis = currentYAxis + tileHeight;
    yAxistUnitCount++;
  }
  
  return dimensionWithImageData;
};

const getAverageHexColorFromWoker = async (
  tileImageDataForEachRow: DimensionWithImageData[][]
): Promise<DimensionWithHexColorCode[][]> => {
  return new Promise((resolve) => {
    const worker = new Worker('/worker.js');
    worker.postMessage({ tileImageDataForEachRow });
    worker.onmessage = (e) => {
      worker.terminate();
      resolve(e.data);
    };
  });
};

const getSvgForEachTile = async ({
  currentXAxis,
  currentYAxis,
  hexColorCode,
}: DimensionWithHexColorCode): Promise<SVGWithDimension> => {
  const svgBlobUrl = await APICacheForSVG().getSVGFromAPI(hexColorCode);
  return {
    svgBlobUrl,
    currentXAxis,
    currentYAxis,
  };
};

const getSVGForAllHexColorCodesInTheRow = async (
  hexColorCodeForEachRow: DimensionWithHexColorCode[]
) => {
  const allPromisesInARow: Promise<SVGWithDimension>[] = [];
  hexColorCodeForEachRow.forEach((element) => {
    const result = getSvgForEachTile(element);
    allPromisesInARow.push(result);
  });

  return await Promise.all(allPromisesInARow);
};

const displayRow = (
  svgWithDimensions: SVGWithDimension[],
  canvasRef: RefObject<HTMLCanvasElement>
) => {
  if (canvasRef.current) {
    const context = canvasRef.current.getContext('2d');
    svgWithDimensions.forEach((svgWithDimension) => {
      const svgImage = new Image();
      svgImage.onload = () => {
        if (context) {
          context.drawImage(svgImage, svgWithDimension.currentXAxis, svgWithDimension.currentYAxis);
        }
      };
      svgImage.src = svgWithDimension.svgBlobUrl;
    });
  }
};

const generateMosiac = async (
  hexColorCodesWithDimension: DimensionWithHexColorCode[][],
  canvasRef: RefObject<HTMLCanvasElement>
) => {
  for (let index = 0; index < hexColorCodesWithDimension.length; index++) {
    const element = hexColorCodesWithDimension[index];
    const allSvgsForEachRow = await getSVGForAllHexColorCodesInTheRow(element);
    displayRow(allSvgsForEachRow, canvasRef);
  }
};

export const useMosaic = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const startGenerating = async (image: HTMLImageElement) => {
    const tile = createTile();
    if (tile) {
      const scanStart1 = performance.now();
      const tileImageDataForEachRow = getImageDataForEachRow(tile, image);
      const scanEnd1 = performance.now();
      const scanPerformance1 = scanEnd1 - scanStart1;
      console.log(`Image data captured in ${scanPerformance1} ms`);

      const scanStart2 = performance.now();
      const hexColorCodesWithDimension = await getAverageHexColorFromWoker(tileImageDataForEachRow);
      const scanEnd2 = performance.now();
      const scanPerformance2 = scanEnd2 - scanStart2;
      console.log(`Average color was captured in ${scanPerformance2} ms`);

      const scanStart3 = performance.now();
      await generateMosiac(hexColorCodesWithDimension, canvasRef);
      const scanEnd3 = performance.now();
      const scanPerformance3 = scanEnd3 - scanStart3;
      console.log(`Mosaic was generated in ${scanPerformance3 / 1000} seconds`);
    }
  };

  return { startGenerating };
};
