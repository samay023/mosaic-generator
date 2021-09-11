import Image from 'next/image';

interface ImageDisplayProps {
  image: HTMLImageElement;
}

export default function ImageDisplay({ image }: ImageDisplayProps) {
  return (
    <div className="p-1 border-2 border-blue-500 border-solid w-max h-max">
      <Image layout="fixed" src={image.src} alt="Actual Image" width={image.width} height={image.height} />
    </div>
  );
}
