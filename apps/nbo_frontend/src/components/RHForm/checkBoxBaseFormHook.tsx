import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControlLabel, Checkbox } from "@mui/material";

interface CheckboxBaseProps {
  name?: string; // 若使用 RHF 時需要
  label: string;
  checked?: boolean; // 非 RHF 模式
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  useRHF?: boolean; // 是否使用 RHF
}

const CheckboxBase: React.FC<CheckboxBaseProps> = ({
  name,
  label,
  checked,
  onChange,
  useRHF = true,
}) => {
  const formContext = useFormContext();
  const control = formContext?.control;

  if (useRHF && name && control) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value}
                sx={{
                  '&.Mui-checked': {
                    color: 'green',
                  },
                }}
              />
            }
            label={label}
          />
        )}
      />
    );
  }

  // 非 RHF 模式
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          sx={{
            '&.Mui-checked': {
              color: 'green',
            },
          }}
        />
      }
      label={label}
    />
  );
};

export default CheckboxBase;


    // 綠色的勾選框
    //  icon={
    //           <svg width="24" height="24" viewBox="0 0 24 24">
    //             <rect width="24" height="24" fill="transparent"  stroke="#B0B0B0" />
    //           </svg>
    //         }
    //         checkedIcon={
    //           <svg width="24" height="24" viewBox="0 0 24 24">
    //             <rect width="24" height="24" fill="transparent"  stroke="#B0B0B0" />
    //             <path
    //               d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.4-1.4z"
    //               fill="green"
    //             />
    //           </svg>
    //         }