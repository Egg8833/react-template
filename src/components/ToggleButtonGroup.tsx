import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { styled } from "@mui/material/styles";

const StyledButtonGroup = styled(ButtonGroup)(() => ({
  border: "1px solid #ccc",
  borderRadius: "4px",
  overflow: "hidden",
  "& .MuiButton-root": {
    border: "none",
    borderRadius: 0,
  },
}));

interface ToggleButtonGroupProps {
  options: { label: string; value: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export default function ToggleButtonGroup({ options, selected, onChange }: ToggleButtonGroupProps) {
  return (
    <StyledButtonGroup>
      {options.map((option, index) => {
        const isSelected = selected === option.value;

        // 決定選中時的背景色
        let selectedBgColor = "transparent";

        if (option.value === "CALL" && isSelected) {
          selectedBgColor = "#FF7F7F"; // 紅色 (CALL)
        } else if (option.value === "PUT" && isSelected) {
          selectedBgColor = "#7FFF7F"; // 綠色 (PUT)
        } else if (isSelected) {
          selectedBgColor = index === 0 ? "#FFEA7F" : "#B7C3FF"; // 日盤夜盤 左黃右藍
        }

        // 決定 hover 時的背景色
        let hoverBgColor = "transparent";

        if (option.value === "CALL" && isSelected) {
          hoverBgColor = "#ff6666"; // CALL hover 深一點紅
        } else if (option.value === "PUT" && isSelected) {
          hoverBgColor = "#66ff66"; // PUT hover 深一點綠
        } else if (isSelected) {
          hoverBgColor = index === 0 ? "#ffe266" : "#aab6f7"; // 保留 hover 左黃右藍
        } else {
          hoverBgColor = "#f5f5f5"; // 沒選時hover灰色
        }

        return (
          <Button
            key={option.value}
            variant={isSelected ? "contained" : "outlined"}
            size="large"
            onClick={() => onChange(option.value)}
            sx={{
              width: "150px",
              color: '#000',
             textTransform: "capitalize",
              borderRight: index !== options.length - 1 ? "1px solid #ccc !important" : "none",
              bgcolor: selectedBgColor,
              "&:hover": {
                bgcolor: hoverBgColor,
              },
            }}
          >
            {option.label}
          </Button>
        );
      })}
    </StyledButtonGroup>
  );
}
