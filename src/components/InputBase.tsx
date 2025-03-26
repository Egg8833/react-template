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
  bgColor?: string;
  showLabel?: boolean;
  labelRow?: boolean;
  children?: React.ReactNode;
  labelWidth?: string;
}

const InputBase: React.FC<InputBaseProps> = ({
  inputName,
  inputId,
  value,
  onChange,
  error = false,
  helperText = "",
  inputWidth = "200px",
  bgColor = "#fff",
  showLabel = true,
  labelRow = true,
  labelWidth,
  children,
}) => {
  return (
    <div className={` items-center ${labelRow ? "flex" : ""} gap-2 `}>
      {showLabel && <label style={{ width: labelWidth }}
       htmlFor={inputId}>{inputName}</label>}
      <TextField
        id={inputId}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        sx={{
          width: inputWidth,
          "& .MuiInputBase-input": {
            padding: "10px",
            backgroundColor: bgColor,
          },
        }}
      />
      {children}
    </div>
  );
};

export default InputBase;
