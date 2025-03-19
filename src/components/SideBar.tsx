import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

// 選單項目
const menuItems = [
  { text: "會員帳號管理" },
  { text: "商品列表調整" },
  { text: "權限調整" },
  { text: "管理者專區", subItems: ["會員狀態管理", "隱藏指定功能"] },
];

const Sidebar: React.FC = () => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // 選單點擊事件
  const handleMenuClick = (text: string) => {
    setSelectedItem(text);
    if (text === "管理者專區") {
      setOpenSubMenu(!openSubMenu);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          backgroundColor: "#f5f5f5",
          height: "calc(100% - 60px)",
          top: "60px",
        },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map(({ text, subItems }) => (
            <React.Fragment key={text}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleMenuClick(text)}
                  selected={selectedItem === text}
                  sx={{
                    "&.Mui-selected": { backgroundColor: "#e0e0e0" }, // 選中顏色
                  }}
                >
                  <ListItemText primary={text} />
                  {subItems ? openSubMenu ? <ExpandLess /> : <ExpandMore /> : null}
                </ListItemButton>
              </ListItem>

              {/* 子選單 (管理者專區) */}
              {subItems && (
                <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {subItems.map((subItem) => (
                      <ListItem key={subItem} disablePadding>
                        <ListItemButton
                          sx={{ pl: 4 }} // 縮排
                          onClick={() => handleMenuClick(subItem)}
                          selected={selectedItem === subItem}
                        >
                          <ListItemText primary={subItem} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
