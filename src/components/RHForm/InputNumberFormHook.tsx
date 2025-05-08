import * as React from 'react';
import { styled } from '@mui/system';
import { useFormContext } from 'react-hook-form';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const blue = {
  50: '#F0F7FF',
  800: '#004c99',
};

const grey = {
  100: '#E5EAF2',
  200: '#DAE2ED',
};

interface CustomNumberInputProps {
  name: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  inputWidth?: string;
  value?: number; // 可選，讓獨立使用
  onChange?: (value: number) => void;
}

const NumberInput = React.forwardRef<HTMLDivElement, CustomNumberInputProps>(function CustomNumberInput(
  { name, min = 1, max = 99, disabled = false, inputWidth, value, onChange },
  ref
) {
  const { register, setValue, watch,trigger } = useFormContext();
  const fieldValue = watch(name);

  const isControlled = typeof value === 'number' && typeof onChange === 'function';
  const currentValue = isControlled ? value : fieldValue ?? min;

  const handleChange = (newVal: number) => {
    const limitedValue = Math.min(Math.max(newVal, min), max);
    if (isControlled) {
      onChange(limitedValue);
    } else {
      setValue(name, limitedValue, { shouldValidate: true }); // 更新且觸發驗證
    }
  };

  const handleIncrement = () => {
    if (currentValue < max) {
      handleChange(currentValue + 1);
    }
  };

  const handleDecrement = () => {
    if (currentValue > min) {
      handleChange(currentValue - 1);
    }
  };

  const fieldProps = register(name, {
    valueAsNumber: true,
    min,
    max,
    onBlur(e) {
       const parsed = parseInt(e.target.value, 10);
       console.log('onBlur', parsed);
      if (!isNaN(parsed)) {
        handleChange(parsed);
      } else {
        handleChange(min); // 如果空白或亂打，設最小值
      }
      trigger(name); // 手動觸發 RHF 驗證
    },
  });

  return (
    <StyledInputRoot ref={ref} className={disabled ? 'disabled' : ''}>
      <StyledButton
        type="button"
        onClick={handleDecrement}
        className='decrement'
        disabled={disabled || currentValue <= min}
      >
        <RemoveIcon fontSize="medium" />
      </StyledButton>

      <StyledInput
        type="number"
        disabled={disabled}
        inputWidth={inputWidth}
        {...fieldProps}
      />

      <StyledButton
        type="button"
        onClick={handleIncrement}
        className="increment"
        disabled={disabled || currentValue >= max}
      >
        <AddIcon fontSize="medium" />
      </StyledButton>
    </StyledInputRoot>
  );
});


const StyledInputRoot = styled('div')`
  font-family: 'IBM Plex Sans', sans-serif;
  display: flex;
  align-items: stretch;
  border: 1px solid ${grey[200]};
  border-radius: 4px;
  overflow: hidden;
  width: fit-content;

  &.disabled {
    opacity: 0.6;
    background: ${grey[100]};
  }
`;

const StyledInput = styled('input')<{ inputWidth?: string }>(({ inputWidth }) => ({
  fontSize: '0.875rem',
  fontFamily: 'inherit',
  fontWeight: 400,
  lineHeight: 1.375,
  color: '#000',
  border: 'none',
  outline: 0,
  width: inputWidth ?? '5rem',
  textAlign: 'center',
  padding: '8px 0',
  background: 'transparent',

  '&:focus': {
    outline: 'none',
    boxShadow: 'none',
  },
  '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  '&:disabled': {
    backgroundColor: grey[100],
    cursor: 'not-allowed',
    color: 'rgba(0, 0, 0, 0.38)',
  },
}));

const StyledButton = styled('button')`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  border: none;
  background: #fff;
  color: ${blue[800]};
  min-width: 25px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 120ms ease;

  &:hover {
    background: ${blue[50]};
    cursor: pointer;
  }

  &:focus-visible {
    outline: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.increment {
    border-left: 1px solid ${grey[200]};
  }
  &.decrement {
    border-right: 1px solid ${grey[200]};
`;



export default NumberInput;


