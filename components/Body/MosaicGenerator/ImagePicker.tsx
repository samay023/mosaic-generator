function ImagePicker(props: ImagePickerProps) {
  return (
    <>
      <input id="imageFile" type="file" accept="image/png, image/jpeg" onChange={props.onChange} />
    </>
  );
}

export default ImagePicker;
