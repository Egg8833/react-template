import React, { useMemo } from "react";
import { Select, MenuItem } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

interface SelectBaseProps {
  selectName: string;
  selectId: string;
  options: { value: string; label: string }[];
  selectWidth?: string;
  disabled?: boolean;
  showLabel?: boolean;
  labelRow?: boolean;
  labelWidth?: string;
  useRHF?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<{ value: unknown }>) => void;
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
  useRHF = true,
  value,
  onChange,
}) => {

  const formContext = useFormContext();
  const control = formContext?.control;
  const errors = formContext?.formState.errors;

  const errorMessage = useRHF ? (errors[selectId]?.message as string | undefined) : undefined;
  const hasError = !!errorMessage;

  const dynamicStyles = useMemo(
    () => ({
      width: selectWidth,
      "& .MuiInputBase-input": {
        padding: "10px",
      },
      ...(disabled && {
        "& .MuiInputBase-input.Mui-disabled": {
          cursor: "not-allowed",
        },
      }),
    }),
    [selectWidth, disabled]
  );

  const baseClass = `${labelRow ? "flex" : ""} items-center gap-2`;

  return (
    <div className={baseClass}>
      {showLabel && (
        <label style={{ width: labelWidth, display: "block" }} htmlFor={selectId}>
          {selectName}
        </label>
      )}

      {useRHF ? (
        <Controller
          name={selectId}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              id={selectId}
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
          )}
        />
      ) : (
        <Select
          id={selectId}
          value={value}
          onChange={(event) => onChange?.(event as React.ChangeEvent<{ value: unknown }>)}
          disabled={disabled}
          displayEmpty
          sx={dynamicStyles}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}

      {hasError && <p className="text-red-500 text-xs">{errorMessage}</p>}
    </div>
  );
};

export default SelectBase;
