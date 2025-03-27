import React from 'react'
import {Select, MenuItem, SelectChangeEvent} from '@mui/material'

interface SelectBaseProps {
  selectName: string
  selectId: string
  value: string
  onChange: (e: SelectChangeEvent<string>) => void
  options: {value: string; label: string}[]
  selectWidth?: string
  disabled?: boolean
  showLabel?: boolean
  labelRow?: boolean;
  labelWidth?: string
}

const SelectBase: React.FC<SelectBaseProps> = ({
  selectName,
  selectId,
  value,
  onChange,
  options,
  selectWidth = '200px',
  disabled = false,
  showLabel = true,
   labelRow = true,
  labelWidth,
}) => {
  const dynamicStyles = {
    width: selectWidth,

    '& .MuiInputBase-input': {
      padding: '10px',
    },
    ...(disabled && {
      '& .MuiInputBase-input.Mui-disabled': {
        cursor: 'not-allowed',
      },
    }),
  }

  return (
    <div className={`${labelRow ? "flex" : ""} items-center  gap-2 `}>
      {showLabel && (
        <label style={{width: labelWidth,display: 'block'}} htmlFor={selectId}>
          {selectName}
        </label>
      )}
      <Select
        id={selectId}
        value={value}
        onChange={onChange}
        displayEmpty
        disabled={disabled}
        sx={dynamicStyles}>
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default SelectBase
