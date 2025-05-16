import React, { useMemo } from "react";
import { Select, MenuItem } from "@mui/material";

interface SelectBaseProps {
  selectName: string;
  selectId: string;
  options: { value: string; label: string }[];
  selectWidth?: string;
  disabled?: boolean;
  showLabel?: boolean;
  labelRow?: boolean;
  labelWidth?: string;

  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  error?: boolean;
  helperText?: string;
}

const SelectBase: React.FC<SelectBaseProps> = ({
  selectName,
  selectId,
  options,
  selectWidth = "200px",
  disabled = false,
  showLabel = true,
  labelRow = true,
  labelWidth,

  value,
  onChange,
  error = false,
  helperText,
}) => {
  const hasError = error;
  const errorMessage = helperText;

  const dynamicStyles = useMemo(() => ({
    width: selectWidth,
    "& .MuiInputBase-input": {
      padding: "10px",
    },
    ...(disabled && {
      "& .MuiInputBase-input.Mui-disabled": {
        cursor: "not-allowed",
      },
    }),
  }), [selectWidth, disabled]);

  return (
    <div className={`${labelRow ? "flex" : ""} items-center gap-2`}>
      {showLabel && (
        <label style={{ width: labelWidth, display: "block" }} htmlFor={selectId}>
          {selectName}
        </label>
      )}
      <Select
        id={selectId}
        value={value}
        onChange={(event) => onChange(event as React.ChangeEvent<{ value: unknown }>)}
        error={hasError}
        displayEmpty
        disabled={disabled}
        sx={dynamicStyles}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {hasError && <p className="text-red-500 text-xs">{errorMessage}</p>}
    </div>
  );
};

export default SelectBase;