import React, { useState } from 'react';
import ImageCanvas from './ImageCanvas';
import ImagePicker from './ImagePicker';
import MosaicImage from './MosaicImage';

const MosaicGenerator = () => {
  const [image, setImageDetails] = useState({
    src: '',
  });

  const imageEventHandler: ImageEventHandler = (evt) => {
    if (evt.target?.files?.length > 0) {
      setImageDetails({
        src: URL.createObjectURL(evt.target.files[0]),
      });
    } else {
      // Didnt select an image
      setImageDetails({
        src: '',
      });
    }
  };

  const [averageHexCodeDimensionsPerRow, setAverageHexCodeWithDimensions] = useState<
    HexCodeWithDimension[][]
  >([]);

  const averageHexCodeDimensionHandler: AverageHexCodeDimensionHandler = (newResult) =>
    setAverageHexCodeWithDimensions(newResult);

  const resetHexCodeDimensionHandler = () => setAverageHexCodeWithDimensions([]);

  return (
    <div className="space-y-3">
      <ImagePicker onChange={imageEventHandler} />

      <p>Actual Image</p>
      {image.src && <img src={image.src} />}

      {/* For testing only */}
      <p>Resized Image for getting the average color</p>
      {image.src && (
          <ImageCanvas
            src={image.src}
            setHexCodeWithDimension={averageHexCodeDimensionHandler}
            resetHexCodeDimensions={resetHexCodeDimensionHandler}
          />
      )}

      <p>The generated photomosaic using the average color in each tile</p>
      {/* {averageHexCodeDimensions.length > 0 && (
        <PhotoMosaicImage hexCodeWithDimensions={averageHexCodeDimensions} />
      )} */}
      {averageHexCodeDimensionsPerRow.length > 0 && (
        <MosaicImage hexCodesWithDimensionsForEachRow={averageHexCodeDimensionsPerRow} />
      )}
    </div>
  );
};

export default MosaicGenerator;
