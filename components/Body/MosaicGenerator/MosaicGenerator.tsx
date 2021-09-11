import React, { useEffect, useRef, useState } from 'react';
import { useMosaic } from '../../../hooks/generateMosaic';
import { scaleAndConvertToImageElement } from '../../../imageProcess';
import ImageDisplay from './ImageDisplay';
import ImagePicker from './ImagePicker';
import MosaicImage from './MosaicImage';

const MosaicGenerator = () => {
  const [image, setImage] = useState<HTMLImageElement>();

  const imageHandler = async (image: File) => {
    createImageBitmap(image)
      .then(scaleAndConvertToImageElement)
      .then((image) => {
        setImage(image);
      });
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { startGenerating } = useMosaic(canvasRef);

  useEffect(() => {
    if (image) {
      startGenerating(image);
    }
  }, [image, startGenerating]);

  return (
    <div className="space-y-3">
      <ImagePicker onChange={imageHandler} />

      {image && (
        <div className="flex flex-row p-1 gap-x-3">
          <ImageDisplay image={image} />
          <MosaicImage ref={canvasRef} image={image} />
        </div>
      )}
    </div>
  );
};

export default MosaicGenerator;
