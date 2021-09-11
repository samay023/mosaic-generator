import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImagePickerProps {
  onChange: (file: File) => void;
}

function ImagePicker(props: ImagePickerProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => acceptedFiles.length > 0 && props.onChange(acceptedFiles[0]),
    [props]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
    maxSize: 10000000,
  });

  return (
    <div
      {...getRootProps()}
      className="flex place-items-center justify-center text-white h-64 w-auto bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 hover:text-black">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <>
          <p>
            Drag and drop the image here, or click to select files <em>(jpeg / png)</em>
          </p>
        </>
      )}
    </div>
  );
}

export default ImagePicker;
