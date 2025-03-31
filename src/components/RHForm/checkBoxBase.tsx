import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControlLabel, Checkbox } from "@mui/material";

interface CheckboxBaseProps {
  name: string;
  label: string;
}

const CheckboxBase: React.FC<CheckboxBaseProps> = ({ name, label }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Checkbox {...field} checked={field.value} />}
          label={label}
        />
      )}
    />
  );
};

export default CheckboxBase;
