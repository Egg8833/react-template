import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function ToggleButtonGroup() {
  const [selected, setSelected] = React.useState("left"); // 設定初始選中的按鈕

  return (
    <ButtonGroup variant="contained">
      <Button
        onClick={() => setSelected("left")}
        sx={{
          backgroundColor: selected === "left" ? "#333" : "#1976d2", // 選中時深色，否則預設顏色
          "&:hover": {
            backgroundColor: selected === "left" ? "#222" : "#1565c0", // 滑鼠懸停時的顏色
          },
        }}
      >
        Left
      </Button>
      <Button
        onClick={() => setSelected("right")}
        sx={{
          backgroundColor: selected === "right" ? "#333" : "#1976d2", // 選中時深色
          "&:hover": {
            backgroundColor: selected === "right" ? "#222" : "#1565c0",
          },
        }}
      >
        Right
      </Button>
    </ButtonGroup>
  );
}
