import { useEffect, useMemo, useState } from 'react';

const MosaicImage = ({ hexCodesWithDimensionsForEachRow }: MosaicImageProps) => {

  // Memoized version to cache the jsx element if the hex color codes are repeated
  const createImage = (hexColorCode: string) =>
    useMemo(
      () => (
        <>
          <img src={`${process.cwd()}api/colour/${hexColorCode}`} />
        </>
      ),
      [hexColorCode]
    );

  const createImagesForRow = (hexCodeForRow: HexCodeWithDimension[]) => {
    const images = hexCodeForRow.map((hexCodeWithDimension) =>
      createImage(hexCodeWithDimension.hexColorCode)
    );

    return (<div className="flex flex-flow-col gap-0">{images}</div>);
  };
  return (
    <>
      <div className="p-0 align-baseline">
        {hexCodesWithDimensionsForEachRow.map(createImagesForRow)}
      </div>
    </>
  );
};

export default MosaicImage;
