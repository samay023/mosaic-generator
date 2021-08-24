import { useEffect, useRef } from 'react';
import {
  getTotalUnitsinXAndYAxis,
  getAverageHexCodeFromImageData,
  getBestDimensionForImage,
} from '../../../imageProcess';

const tileHeight = Number(process.env.NEXT_PUBLIC_TILE_WIDTH) || 16;
const tileWidth = Number(process.env.NEXT_PUBLIC_TILE_HEIGHT) || 16;

function ImageCanvas(props: ImageCanvasProps): JSX.Element {
  const { src, setHexCodeWithDimension, resetHexCodeDimensions } = props;

  const canvasRef = useRef(null);

  useEffect(() => {
    // Reset the state in the parent
    resetHexCodeDimensions();

    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const image = new Image();

    image.onload = () => {
      console.log('image height is ' + image.height);
      console.log('image width is ' + image.width);

      const { height, width } = getBestDimensionForImage(
        tileWidth,
        tileHeight,
        image.naturalHeight,
        image.naturalWidth
      );

      // Set canvas height to match the image
      canvas.height = height;
      canvas.width = width;

      console.log('new height is ' + height);
      console.log('new width is ' + width);

      const { xAxis: totalXAxisUnits, yAxis: totalYAxisUnits } = getTotalUnitsinXAndYAxis(
        height,
        width,
        tileHeight,
        tileWidth
      );

      let currentYAxis = 0;
      let currentXAxis = 0;
      let xAxisUnitCount = 0;
      let yAxistUnitCount = 0;
      let hexColorCodeWithDimensionForAllRows: HexCodeWithDimension[][] = [];

      // Draw each tile of the image using the context
      // After these tiles are drawn, we can then capture the average color of the tile
      // Start by drawing the Y Axis
      while (yAxistUnitCount !== totalYAxisUnits) {
        const hexColorCodeWithDimensionForEachRow = []; 
        while (xAxisUnitCount !== totalXAxisUnits) {
          context.drawImage(
            image,
            currentXAxis,
            currentYAxis,
            tileWidth,
            tileHeight,
            currentXAxis,
            currentYAxis,
            tileWidth,
            tileHeight
          );

          const imageData = context.getImageData(currentXAxis, currentYAxis, tileWidth, tileHeight);

          const hexColorCode = getAverageHexCodeFromImageData(imageData);

          hexColorCodeWithDimensionForEachRow.push({
            hexColorCode,
            currentXAxis,
            currentYAxis,
          });

          currentXAxis = currentXAxis + tileWidth;
          xAxisUnitCount++;
        }

        // reset variables
        xAxisUnitCount = 0;
        currentXAxis = 0;

        hexColorCodeWithDimensionForAllRows.push(hexColorCodeWithDimensionForEachRow);
        currentYAxis = currentYAxis + tileHeight;
        yAxistUnitCount++;
      }

      // Finally update the parent state
      setHexCodeWithDimension(hexColorCodeWithDimensionForAllRows);
    };

    image.src = src;
    // Cleanup
    return () => context.clearRect(0, 0, canvas.width, canvas.height);
  }, [src]);

  return (
    <>
      <canvas id="image" ref={canvasRef} />
    </>
  );
}

export default ImageCanvas;
