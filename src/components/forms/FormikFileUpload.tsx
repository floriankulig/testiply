import { Button } from "components/Button";
import { useField } from "formik";
import { darken, rgba } from "polished";
import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { StyledMetaInputInfo } from ".";
import { StyledFormInput } from "./FormInput";

const DashedDropzone = styled.div<{ hasError: boolean }>`
  padding: 3em;
  border-radius: 0.8em;
  border: 3px
    ${(p) => (p.hasError ? "red" : darken(0.1, p.theme.layoutContentBg))} dashed;
  background: ${(p) =>
    p.hasError ? rgba(255, 0, 0, 0.05) : "var(--layout-content-background)"};
  display: grid;
  place-items: center;
  margin: 0.2em 0 1.5em;
  cursor: pointer;
  transition: 0.5s;
  transition-property: border background;
`;

const StyledFileItems = styled.ul`
  margin-top: 0.5em;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25em;
`;

export const FormikFileUpload: React.FC<{
  name: string;
  maxFiles: number;
  label: string;
}> = ({ name, maxFiles, label }) => {
  const [field, meta, helpers] = useField(name);
  const showsError: boolean = meta.touched && meta.error ? true : false;

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
    // helpers.setTouched(true);
  }, [files]);

  return (
    <StyledFormInput>
      <StyledMetaInputInfo>
        {label + ` ${field.value.length}/${maxFiles}`}
        <CSSTransition
          in={showsError}
          classNames="error"
          timeout={250}
          unmountOnExit
        >
          <span>{meta.error}</span>
        </CSSTransition>
      </StyledMetaInputInfo>
      {files.length < maxFiles && (
        <DashedDropzone {...getRootProps()} hasError={showsError}>
          <input {...getInputProps()} name={name} />

          <p>Drag 'n' drop some files here, or click to select files</p>
        </DashedDropzone>
      )}
      {!!files.length && (
        <StyledFileItems>
          {files?.map((file) => (
            <FileItem>
              {file.name.slice(0, 45)}
              {file.name.length > 45 ? "..." : " "}
              <Button
                color="red"
                transparent
                type="button"
                onClick={() => onDelete(file)}
              >
                Delete
              </Button>
            </FileItem>
          ))}
        </StyledFileItems>
      )}
    </StyledFormInput>
  );
};
