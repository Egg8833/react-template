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
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // 取得對應欄位的錯誤資訊
  const errorMessage = errors[selectId]?.message as string | undefined;
  const hasError = !!errorMessage;

  const dynamicStyles = {
    width: selectWidth,
    "& .MuiInputBase-input": {
      padding: "10px",
    },
    ...(disabled && {
      "& .MuiInputBase-input.Mui-disabled": {
        cursor: "not-allowed",
      },
    }),
  };

  return (
    <div className={`${labelRow ? "flex" : ""} items-center gap-2`}>
      {showLabel && (
        <label style={{ width: labelWidth, display: "block" }} htmlFor={selectId}>
          {selectName}
        </label>
      )}
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
      {hasError && <p className="text-red-500 text-xs">{errorMessage}</p>}
    </div>
  );
};

export default SelectBase;
