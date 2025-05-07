import Sidebar from "@/components/SideBar";
import Header from "@/components/Header";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="flex ">
        <div className="bg-#f5f5f5">
          <Sidebar  />
        </div>
        <div className="flex-1 p-4" >
          <Outlet />
        </div>
      </div>
    </>
  );
}
