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
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { Link as RouterLink } from "react-router-dom";

// 選單項目
interface MenuItem {
  text: string;
  path: string;
  subItems?: MenuItem[];
}
const menuItems : MenuItem[] = [
  { text: "會員帳號管理", path: "/accountManagement" },
  { text: "商品列表調整", path: "/productList" },
  { text: "權限調整", path: "/permissions" },
  {
    text: "管理者專區",
    path: "",
    subItems: [
    
      { text: "隱藏指定功能", path: "test" },
      { text: "Login", path: "login" },
    ],
  }, 
];
const titleItem = menuItems.map((item) => {
  if((item.subItems ?? []).length > 0 ) return  item.text}).filter(Boolean)
console.log('titleTitle',titleItem);

const Sidebar: React.FC = () => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // 選單點擊事件
  const handleMenuClick = (text: string) => {
    setSelectedItem(text);
    if (titleItem.includes(text)) {
       setOpenMenus((prev) => ({
        ...prev,
        [text]: !prev[text], // 切換目前這個選單的開關狀態
      }));
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        backgroundColor: "#f5f5f5",
        "& .MuiDrawer-paper": {
          width: 250,
          top: "60px",
          backgroundColor: "#f5f5f5",
          height: "auto",
          position: "absolute",
          borderRight: "0px ",
          zIndex: 100,
        },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map(({ text, path, subItems }) => (
            <React.Fragment key={text}>
              <ListItem disablePadding>
                <ListItemButton
                  component={path ? RouterLink : "button"}
                  to={path || undefined}
                  onClick={() => handleMenuClick(text)}
                  selected={selectedItem === text}
                  sx={{
                    "&.Mui-selected": { backgroundColor: "#e0e0e0" },
                  }}
                >
                  <ListItemText primary={text} />
                  {subItems ? openMenus[text] ? <ExpandLess /> : <ExpandMore /> : null}
                </ListItemButton>
              </ListItem>

              {subItems && (
                <Collapse in={openMenus[text]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {subItems.map(({ text, path }) => (
                      <ListItem key={text} disablePadding>
                        <ListItemButton
                          component={RouterLink}
                          to={path}
                          sx={{ pl: 4 }}
                          onClick={() => handleMenuClick(text)}
                          selected={selectedItem === text}
                        >
                          <ListItemText primary={text} />
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