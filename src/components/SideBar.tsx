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
      { text: "會員狀態管理", path: "/admin/memberStatus" },
      // { text: "隱藏指定功能", path: "/admin/hideFeatures" },
      { text: "隱藏指定功能", path: "test" },
      { text: "Login", path: "login" },
      { text: "Login2", path: "login2" }, // 新增 Login2 選單項目
      { text: "nextedTable", path: "nextedTable" },
      { text: "userSetting", path: "userSetting" },
      { text: "delegation", path: "delegation" },
      { text: "autoOrder", path: "autoOrder" },
    ],
  }, {
    text: "委託/回報",
    path: "",
    subItems: [
      { text: "期貨委託(含鉅額單式)", path: "futuresOrder" },
      { text: "期貨價差委託", path: "futuresQuote" },
      { text: "選擇權委託(含鉅額單式)", path: "optionsOrder" },
      { text: "選擇權組合式委託", path: "optionsStrategyOrder" },
      { text: "鉅額組合式委託", path: "comboStrategyOrder" },
      { text: "造市者委託", path: "auctionOrder" },
      { text: "自動下單功能", path: "autoOrder" }
    ]
  },
  {
    text: "客製化委託/回報",
    path: "",
    subItems: [
      { text: "客製化期貨委託(含鉅額單式)", path: "customFuturesOrder" },
      { text: "客製化選擇權委託(含鉅額單式)", path: "customOptionsOrder" },
      { text: "客製化造市者委託", path: "customAuctionOrder" },
      { text: "客製化自動下單功能", path: "customAutoOrder" }
    ]
  },
  {
    text: "檔案傳輸",
    path: "",
    subItems: [
      { text: "檔案傳輸", path: "fileTransfer" },
      { text: "FLEX檔案傳輸", path: "flexFileTransfer" }
    ]
  },
  {
    text: "其他功能",
    path: "",
    subItems: [
      { text: "其他功能", path: "otherFunctions" }
    ]
  },
  {
    text: "連線功能/狀態查詢",
    path: "",
    subItems: [
      { text: "連線狀態查詢", path: "connectionStatus" }
    ]
  },
  {
    text: "使用者設定",
    path: "",
    subItems: [
      { text: "常用商品設定", path: "generalSettings" },
      { text: "使用者設定", path: "userSettings" },
      { text: "SFTP密碼", path: "sftpPassword" }
    ]
  }
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