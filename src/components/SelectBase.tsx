import React from 'react'
import {Select, MenuItem, SelectChangeEvent} from '@mui/material'


/**
 * 通用下拉選單元件 (基於 MUI `Select`)
 *
 * @component
 * @param {Object} props - 元件的 `props`
 * @param {string} props.selectName - 下拉選單的標籤名稱
 * @param {string} props.selectId - 下拉選單的 `id`，對應 `label` 的 `htmlFor`
 * @param {string} props.value - 當前選中的值
 * @param {(e: SelectChangeEvent<string>) => void} props.onChange - 值變更時的事件處理函數
 * @param {{value: string; label: string}[]} props.options - 下拉選單的選項列表
 * @param {string} [props.selectWidth="200px"] - 下拉選單的寬度
 * @param {boolean} [props.disabled=false] - 是否禁用下拉選單
 * @param {boolean} [props.showLabel=true] - 是否顯示標籤
 * @param {boolean} [props.labelRow=true] - 是否讓標籤與選單橫向排列（`true` 為橫向，`false` 為直向）
 * @param {string} [props.labelWidth] - 標籤寬度（如果有的話）
 * @returns {JSX.Element} `SelectBase` 元件
 */

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
