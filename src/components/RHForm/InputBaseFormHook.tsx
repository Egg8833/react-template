import React, { useMemo } from "react";
import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";

interface InputBaseProps {
  inputName: string;
  inputId: string;
  inputWidth?: string;
  showLabel?: boolean;
  labelRow?: boolean;
  children?: React.ReactNode;
  labelWidth?: string;
  disabled?: boolean;
  type?: "text" | "password" | "number" | "email";
  errorStyleMb?: boolean;
  labelStyle?: React.CSSProperties;
  placeholder?: string;
  useRHF?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBase: React.FC<InputBaseProps> = ({
  placeholder = "請輸入...",
  inputName,
  inputId,
  inputWidth = "200px",
  showLabel = true,
  labelRow = true,
  labelWidth,
  disabled = false,
  errorStyleMb = true,
  type = "text",
  children,
  labelStyle,
  useRHF = true,
  value,
  onChange,
}) => {

  const formContext =  useFormContext()
  const register = formContext?.register;
  const errors = formContext?.formState.errors;
  const errorMessage = errors?.[inputId]?.message as string | undefined;
  const hasError = Boolean(errorMessage);

  const dynamicStyles = useMemo(
    () => ({
      width: inputWidth,
      "& .MuiInputBase-input": {
        padding: "10px",
      },
      ...(disabled && {
        "& .MuiInputBase-input.Mui-disabled": {
          cursor: "not-allowed",
          backgroundColor: "#EBEBEB",
        },
      }),
    }),
    [inputWidth, disabled]
  );

  const helperTextStyles = useMemo(
    () => ({
      formHelperText: {
        sx: {
          position: "absolute",
          bottom: "-24px",
          whiteSpace: "nowrap",
        },
      },
    }),
    []
  );

  return (
    <div
      className={`items-center gap-2 ${labelRow ? "flex" : ""} ${
        hasError && errorStyleMb ? "mb-5" : ""
      }`}
    >
      {showLabel && inputId && (
        <label
          htmlFor={inputId}
          style={{ width: labelWidth, display: "block", ...labelStyle }}
        >
          {inputName}
        </label>
      )}

      <TextField
        id={inputId}
        error={hasError}
        helperText={errorMessage}
        disabled={disabled}
        sx={dynamicStyles}
        type={type}
        autoComplete="off"
        slotProps={helperTextStyles}
        placeholder={placeholder}
        {...(useRHF && register
          ? register(inputId)
          : {
              value: value ?? "",
              onChange: onChange,
            })}
      />

      {children}
    </div>
  );
};

export default InputBase;
