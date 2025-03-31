import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function ToggleButtonGroup() {
  const [selected, setSelected] = React.useState("left"); // 設定初始選中的按鈕

  return (
    <ButtonGroup variant="contained">
      <Button
        variant={selected === "left" ? "contained" : "outlined"}

        onClick={() => setSelected("left")}
      >
        Left
      </Button>
      <Button
        onClick={() => setSelected("right")}
        variant={selected === "right" ? "contained" : "outlined"}
      >
        Right
      </Button>
    </ButtonGroup>
  );
}
