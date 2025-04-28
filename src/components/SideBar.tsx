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
import { Link as RouterLink } from "react-router-dom";

// 選單項目
const menuItems = [
  { text: "會員帳號管理", path: "/accountManagement" },
  { text: "商品列表調整", path: "/productList" },
  { text: "權限調整", path: "/permissions" },
  {
    text: "管理者專區",
    path: "",
    subItems: [
      { text: "會員狀態管理", path: "/admin/memberStatus" },
      // { text: "隱藏指定功能", path: "/admin/hideFeatures" },
      { text: "隱藏指定功能", path: "test" },
      { text: "Login", path: "login" },
      { text: "Login2", path: "login2" }, // 新增 Login2 選單項目
      { text: "nextedTable", path: "nextedTable" }, // 新增 nextedTable 選單項目
      { text: "userSetting", path: "userSetting" }, // 新增 nextedTable 選單項目
    ],
  },
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
        backgroundColor: "#f5f5f5",
        "& .MuiDrawer-paper": {
          width: 250,
          top: "60px",
          backgroundColor: "#f5f5f5",
          height: "calc(100vh - 60px)",
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
                  {subItems ? openSubMenu ? <ExpandLess /> : <ExpandMore /> : null}
                </ListItemButton>
              </ListItem>

              {subItems && (
                <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
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