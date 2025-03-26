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
    <div className={` items-center ${labelRow ? "flex" : ""} gap-2 `}>
      {showLabel && <label style={{ width: labelWidth }}
       htmlFor={inputId}>{inputName}</label>}

      <TextField
        id={inputId}
        value={value}
        onChange={onChange}
        error={error}
        disabled={disabled}
        helperText={helperText}
        sx={dynamicStyles}
      />
      {children}
    </div>
  );
};

export default InputBase;
