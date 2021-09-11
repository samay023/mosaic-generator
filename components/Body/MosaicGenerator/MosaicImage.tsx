import { ForwardedRef, forwardRef } from 'react';

interface MosaicImageProps {
  image: HTMLImageElement;
}

const MosaicImage = forwardRef(
  ({ image }: MosaicImageProps, canvasRef: ForwardedRef<HTMLCanvasElement>) => {
    return (
      <div className="p-1 border-2 border-yellow-500 border-solid">
        <canvas
          ref={canvasRef}
          className="mr-auto ml-auto"
          width={image.width+5}
          height={image.height+5}
        />
      </div>
    );
  }
);

MosaicImage.displayName = 'MosaicImage';

export default MosaicImage;
