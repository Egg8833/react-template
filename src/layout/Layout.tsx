import Sidebar from "@/components/SideBar";
import Header from "@/components/Header";
import { Box } from "@mui/material";
import {  Outlet } from "react-router";

export default function Layout() {
  return (
    <>
    <Header/>
    <Box sx={{ display: "flex"}}>
      <Sidebar/>
      <div className="flex-1 p-4 " >
      <Outlet />
      </div>
    </Box >
    </>
  );
}
