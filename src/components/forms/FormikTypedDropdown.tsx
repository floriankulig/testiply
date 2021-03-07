import { useField } from "formik";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { DescriptiveObj } from "ts";
import {
  StyledFormInput,
  StyledMetaInputInfo,
  StyledTextField,
} from "./FormInput";

export const FormikTypedDropdown = ({ label, values, ...restProps }: any) => {
  const [field, meta, helpers] = useField(restProps);
  const showsError: boolean = meta.touched && meta.error ? true : false;
  const [search, setSearch] = useState<string>("");
  const [filteredValues, setFilteredValues] = useState<DescriptiveObj[]>([]);

  useEffect(() => {
    // if (!search) return;
    setFilteredValues(
      values.filter((value: DescriptiveObj) =>
        value.displayName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, values]);

  return (
    <StyledFormInput>
      <StyledMetaInputInfo>
        {label}
        <CSSTransition
          in={showsError}
          classNames="error"
          timeout={250}
          unmountOnExit
        >
          <span>{meta.error}</span>
        </CSSTransition>
      </StyledMetaInputInfo>
      <StyledTextField hasError={showsError}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={restProps.placeholder}
        />
      </StyledTextField>
      {filteredValues?.map((value) => (
        <div>+ {value.id}</div>
      ))}
    </StyledFormInput>
  );
};
