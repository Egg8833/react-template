import * as React from 'react';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

// 顏色表
const blue = {
  50: '#F0F7FF',
  400: '#3399ff',
  800: '#004c99',
};

const grey = {
  100: '#E5EAF2',
  200: '#DAE2ED',
};

// 元件
interface CustomNumberInputProps {
  min?: number;
  max?: number;
  value: number;
  inputWidth?: string;
  onChange: (value: number) => void;
  disabled?: boolean; 
}

const NumberInput = React.forwardRef<HTMLDivElement, CustomNumberInputProps>(function CustomNumberInput(
  { min = 1, max = 99, value, onChange, inputWidth, disabled = false },
  ref
) {
  const [inputValue, setInputValue] = React.useState(String(value));

  React.useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // 只改文字，不動外部 value
  };

  const handleBlur = () => {
    let parsed = parseInt(inputValue, 10);

    if (isNaN(parsed)) {
      parsed = min; // 空白或無效數字 → 設最小
    }

    parsed = Math.min(Math.max(parsed, min), max);
    onChange(parsed);
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(Math.min(value + 1, max));
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(Math.max(value - 1, min));
    }
  };

  return (
    <StyledInputRoot ref={ref} className={disabled ? 'disabled' : ''}>
      <StyledButton
        type="button"
        onClick={handleDecrement}
        className="decrement"
        disabled={disabled || value <= min}
      >
        <RemoveIcon fontSize="medium" />
      </StyledButton>

      <StyledInput
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputWidth={inputWidth}
        disabled={disabled}
      />

      <StyledButton
        type="button"
        onClick={handleIncrement}
        className="increment"
        disabled={disabled || value >= max}
      >
        <AddIcon fontSize="medium" />
      </StyledButton>
    </StyledInputRoot>
  );
});

export default NumberInput;


const StyledInputRoot = styled('div')`
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;
  border: 1px solid ${grey[200]};
  border-radius: 4px;
  overflow: hidden;
  width: fit-content;

  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${grey[100]};
  }
`;

const StyledInput = styled('input')<{ inputWidth?: string }>(({ inputWidth }) => ({
  fontSize: '0.875rem',
  fontFamily: 'inherit',
  fontWeight: 400,
  lineHeight: 1.375,
  color: '#000',
  // background: grey[100],
  border: 'none',
  outline: 0,
  minWidth: 0,
  width: inputWidth ?? '1rem',
  textAlign: 'center',
  padding: '8px 0',

  '&:focus': {
    outline: 'none',
    boxShadow: 'none',
  },

  '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },

  '&:disabled': {
    cursor: 'not-allowed',
    color: 'rgba(0, 0, 0, 0.38)',
    backgroundColor: grey[100],
  },
}));

const StyledButton = styled('button')`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: none;
  background: #fff;
  color: ${blue[800]};
  min-width: 25px;
  padding: 8px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition: all 120ms ease;
 

  &:hover {
    cursor: pointer;
    background: ${blue[50]};
    color: ${blue[800]};
  }

  &:focus-visible {
    outline: 0;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.increment {
    order: 1;
    border-left: 1px solid ${grey[200]};
  }
&.decrement {
    border-right: 1px solid ${grey[200]};
    }
`;
