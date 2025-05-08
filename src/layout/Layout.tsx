import Sidebar from "@/layout/SideBar";
import Header from "@/layout/Header";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="flex">
        <div className="bg-[#f5f5f5] min-h-[calc(100vh-60px)] h-auto">
          <Sidebar  />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
