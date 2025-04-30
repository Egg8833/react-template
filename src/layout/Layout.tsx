import Sidebar from "@/components/SideBar";
import Header from "@/components/Header";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4" >
          <Outlet />
        </div>
      </div>
    </>
  );
}
