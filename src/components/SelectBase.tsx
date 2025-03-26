import React from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface SelectBaseProps {
  selectName: string;
  selectId: string;
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
  options: { value: string; label: string }[];
  selectWidth?: string;
  bgColor?: string;
  showLabel?: boolean;
  labelWidth?: string;
}

const SelectBase: React.FC<SelectBaseProps> = ({
  selectName,
  selectId,
  value,
  onChange,
  options,
  selectWidth = "200px",
  bgColor = "#fff",
  showLabel = true,
  labelWidth,
}) => {
  return (
    <div className="flex items-center gap-2">
      {showLabel && <label style={{ width: labelWidth }}
      htmlFor={selectId}>{selectName}</label>}
      <Select
        id={selectId}
        value={value}
        onChange={onChange}
        displayEmpty
        sx={{
          width: selectWidth,
          backgroundColor: bgColor,
          "& .MuiInputBase-input": {
            padding: "10px",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectBase;
