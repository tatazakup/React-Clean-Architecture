import { ChangeEvent, useState } from "react";

export interface ImageUploaderProps {
  name: string;
  state: string;
  setState: (image: string) => void;
}

const ImageUploader = (props: ImageUploaderProps) => {
  const { name, state, setState } = props;

  const [inputId] = useState(`${name}-image`);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file: File = e.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      const base64String: string | ArrayBuffer | null = reader.result;
      if (typeof base64String === "string") {
        console.log(base64String);
        setState(base64String);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <input
        id={inputId}
        type="file"
        style={{ display: "none" }}
        onChange={handleImageChange}
        accept="image/*"
      />
      <label data-cy="field-image" className="cursor-pointer" htmlFor={inputId}>
        {!state && "Upload Image"}
      </label>
      {state && <img className="h-100" src={state} alt="Uploaded" />}
    </>
  );
};

export default ImageUploader;
