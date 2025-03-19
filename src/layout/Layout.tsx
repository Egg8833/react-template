import Sidebar from "@/components/SideBar";
import Header from "@/components/Header";
import { Box } from "@mui/material";
import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
    <Header/>
    <Box sx={{ display: "flex" }}>
      <Sidebar/>
      <Outlet /> {/* 這裡會渲染對應的子頁面 */}
        <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/greeting">greeting</Link></li>
          <li><Link to="/counter">Counter</Link></li>
        </ul>
      </nav>
    </Box >
    </>
  );
}
