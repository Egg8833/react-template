import React from "react";
import TextField from "@mui/material/TextField";


/**
 * 通用輸入框元件 (基於 MUI `TextField`)
 *
 * @component
 * @param {Object} props - 元件的 `props`
 * @param {string} props.inputName - 輸入框的標籤名稱
 * @param {string} props.inputId - 輸入框的 `id`，對應 `label` 的 `htmlFor`
 * @param {string} props.value - 輸入框的值
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - 值變更時的事件處理函數
 * @param {boolean} [props.error=false] - 是否顯示錯誤狀態（錯誤時變紅）
 * @param {string} [props.helperText=""] - 錯誤訊息（當 `error=true` 時顯示）
 * @param {string} [props.inputWidth="200px"] - 輸入框的寬度
 * @param {boolean} [props.showLabel=true] - 是否顯示標籤
 * @param {boolean} [props.labelRow=true] - 是否讓標籤與輸入框橫向排列（`true` 為橫向，`false` 為直向）
 * @param {string} [props.labelWidth] - 標籤寬度（如果有的話）
 * @param {boolean} [props.disabled=false] - 是否禁用輸入框
 * @param {"text" | "password" | "number" | "email"} [props.type="text"] - 設定輸入框類型
 * @param {React.ReactNode} [props.children] - 額外的 React 元件（如按鈕、圖示等）
 * @returns {JSX.Element} `InputBase` 元件
 */

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
