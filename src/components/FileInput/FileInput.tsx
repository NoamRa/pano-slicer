import React, { useCallback } from "react";

const ACCEPTED_FILE_TYPES = ["image/jpg", "image/jpeg", "image/png"];

const accept = ACCEPTED_FILE_TYPES.join(",");

type FileInputProps = {
  onChange: (imageFile: Blob) => void;
};

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const handleChange = useCallback(
    evt => {
      const imageFile: Blob = evt.target.files[0];
      onChange(imageFile);
    },
    [onChange]
  );

  return (
    <input
      type="file"
      id="image-picker"
      accept={accept}
      onChange={handleChange}
    />
  );
};

export default FileInput;
