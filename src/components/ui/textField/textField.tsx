import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  KeyboardEvent,
  useState,
} from "react";

import { IconClose } from "../../../assets/icons/iconClose.tsx";
import { IconEye } from "../../../assets/icons/iconEye.tsx";

import st from "./textField.module.scss";

export type PropsInputBaseType = {
  sizeWidthTextField?: string;
  label?: string;
  type?: "email" | "password" | "text";
  className?: string;
  error?: string;
  setValueInput?: (valueInput: string) => void;
  valueInput?: string;
  handlerOnChange?: (valueInput: string) => void;
  showIconClose?: boolean;
} & ComponentPropsWithoutRef<"input">;

export const TextField = (props: PropsInputBaseType) => {
  const {
    showIconClose,
    sizeWidthTextField,
    type = "text",
    label,
    className,
    error,
    valueInput,
    handlerOnChange,
    setValueInput,
    ...rest
  } = props;

  const [openCloseValueInput, setOpenCloseValueInput] = useState(true);

  const handlerIconEye = () => {
    setOpenCloseValueInput(!openCloseValueInput);
  };
  let typeValue = "text";

  if (openCloseValueInput) {
    typeValue = "password";
  }
  if (type === "email") {
    typeValue = "email";
  }
  if (type === "text") {
    typeValue = "text";
  }

  const handlerCreateValueInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (setValueInput) {
      setValueInput(event.currentTarget.value);
    }
  };

  const handlerOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handlerOnChange?.(valueInput ?? "");
    }
  };

  const handlerOnClickIconClose = () => {
    if (setValueInput) {
      setValueInput("");
    }
  };

  return (
    <div className={st.div}>
      {label && <div className={st.label}>{label}</div>}

      <div
        className={error ? st.error : st.blockIconInput}
        style={{ maxWidth: sizeWidthTextField }}
      >
        <input
          className={`${st[type]}  ${className}
                    ${error ? st.errorInput : st.input}`}
          type={typeValue}
          value={valueInput}
          onChange={handlerCreateValueInput}
          onKeyDown={handlerOnKeyDown}
          {...rest}
        />

        {showIconClose && (
          <IconClose
            onClick={handlerOnClickIconClose}
            className={st.iconClose}
          />
        )}
        {type === "password" && (
          <IconEye className={st.iconEye} onClick={handlerIconEye} />
        )}
      </div>
      {error ? <div className={st.textError}>{error}</div> : <br />}
    </div>
  );
};
