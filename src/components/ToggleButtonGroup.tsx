
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { styled } from "@mui/material/styles";

const StyledButtonGroup = styled(ButtonGroup)(() => ({
  border: "1px solid #ccc", // 灰色外框
  borderRadius: "4px",
  overflow: "hidden",
  "& .MuiButton-root": {
    border: "none", // 移除按鈕之間的邊框
    borderRadius: 0,
  },
}));

interface ToggleButtonGroupProps {
  selected: "left" | "right";
  onChange: (value: "left" | "right") => void;
}

export default function ToggleButtonGroup({ selected, onChange }: ToggleButtonGroupProps) {
  return (
    <StyledButtonGroup>
      <Button
        variant={selected === "left" ? "contained" : "outlined"}
        onClick={() => onChange("left")}
        size="large"
        sx={{
          width: "150px",
          bgcolor: selected === "left" ? "#FFEA7F" : "transparent",
          color:'#000',
          "&:hover": {
            bgcolor: selected === "left" ? "#ffe266" : "#f5f5f5",
          },
        }}
      >
        日盤
      </Button>
      <Button
        variant={selected === "right" ? "contained" : "outlined"}
        size="large"

        onClick={() => onChange("right")}
        sx={{
          width: "150px",
          color:'#000',
          bgcolor: selected === "right" ? "#B7C3FF" : "transparent",
          "&:hover": {
            bgcolor: selected === "right" ? "#aab6f7" : "#f5f5f5",
          },
        }}
      >
        夜盤
      </Button>
    </StyledButtonGroup>
  );
}
