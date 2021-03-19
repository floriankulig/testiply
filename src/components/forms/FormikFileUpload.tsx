import { Button } from "components/Button";
import { useField } from "formik";
import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

export const FormikFileUpload = ({
  name,
  maxFiles,
}: {
  name: string;
  maxFiles: number;
}) => {
  const [field, meta, helpers] = useField(name);

  const [files, setFiles] = useState<File[]>(field.value);
  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    if (files.length + accFiles.length > maxFiles) {
      helpers.setError(`Can't select more than ${maxFiles} files`);
    }

    const newFiles = [...accFiles].filter(
      (newFile) => !JSON.stringify(files).includes(JSON.stringify(newFile))
    );
    setFiles((curr) => [...curr, ...newFiles].slice(0, maxFiles));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".png",
  });

  const onDelete = (file: File) => {
    setFiles((curr) => curr.filter((fw) => fw !== file));
  };

  useEffect(() => {
    if (JSON.stringify(files) === JSON.stringify(field.value)) {
      return;
    }
    helpers.setValue(files);
    helpers.setTouched(true);
  }, [files]);

  return (
    <>
      {files.length < maxFiles && (
        <div {...getRootProps()}>
          <input {...getInputProps()} name={name} />

          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      )}
      {meta.touched && meta.error && (
        <span style={{ color: "red" }}>{meta.error}</span>
      )}
      {files?.map((file) => (
        <div>
          {file.name}{" "}
          <Button
            color="red"
            transparent
            type="button"
            onClick={() => onDelete(file)}
          >
            Delete
          </Button>
        </div>
      ))}
    </>
  );
};
