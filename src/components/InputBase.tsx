import React from "react";
import TextField from "@mui/material/TextField";

interface InputBaseProps {
  inputName: string;
  inputId: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  inputWidth?: string;
  showLabel?: boolean;
  labelRow?: boolean;
  children?: React.ReactNode;
  labelWidth?: string;
  disabled?: boolean;
  type?: string;
}

const InputBase: React.FC<InputBaseProps> = ({
  inputName,
  inputId,
  value,
  onChange,
  error = false,
  helperText = "",
  inputWidth = "200px",
  showLabel = true,
  labelRow = true,
  disabled = false,
  type = "text",
  labelWidth,
  children,

}) => {

  const dynamicStyles = {
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
  };

  return (
    <div className={`${labelRow ? "flex" : ""} items-center gap-2 `}>
      {showLabel && <label style={{ width: labelWidth,display: "block" }}
       htmlFor={inputId}>{inputName}</label>}

      <TextField
        id={inputId}
        value={value}
        onChange={onChange}
        error={error}
        disabled={disabled}
        helperText={helperText}
        sx={dynamicStyles}
        type={type}
      />
      {children}
    </div>
  );
};

export default InputBase;
