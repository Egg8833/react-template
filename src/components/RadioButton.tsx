import React from 'react';
import { Radio } from '@mui/material';

interface RadioButtonWithLabelProps {
  label: string;
  value: string;
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelShow?: boolean;
  disabled?: boolean;
}

const RadioButtonWithLabel: React.FC<RadioButtonWithLabelProps> = ({
  label,
  value,
  selectedValue,
  onChange,
  labelShow = true,
  disabled = false,
}) => {
  return (
    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <Radio
        checked={selectedValue === value}
        onChange={onChange}
        value={value}
        name="custom-radio"
        disabled={disabled}
      />
      <span className={`${labelShow ? '' : 'hidden'} ${disabled ? 'text-gray-500' : ''}`}>{label}</span>
    </label>
  );
};

export default RadioButtonWithLabel;
