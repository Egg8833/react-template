import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import AccountManagement from "@/pages/AccountManagement";
import ProductList from "@/pages/ProductList";
import MemberStatus from "@/pages/MemberStatus";
import Permissions from "@/pages/Permissions";
import Test from "@/pages/Test";
import Login from "@/pages/Login";
import Login2 from "@/pages/Login2"; // 新增 Login2 匯入
import NextedTable from "@/pages/NextedTable"; // 新增 nextedTable 匯入
import UserSetting from "@/pages/UserSetting";
import Delegation from "@/pages/DelegationAndReward/Delegation";
import AutoOrder from "@/pages/DelegationAndReward/autoOrder"; // 新增 AutoOrder 匯入


export default function App() {
  console.log(import.meta.env.VITE_APP_ENV)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="test" element={<Test />} />
          <Route path="login" element={<Login />} />
          <Route path="login2" element={<Login2 />} /> {/* 新增 login2 路由 */}
          <Route path="accountManagement" element={<AccountManagement />} />
          <Route path="productList" element={<ProductList  />} />
          <Route path="permissions" element={<Permissions  />} />
          <Route path="admin/memberStatus" element={<MemberStatus  />} />
          <Route path="admin/hideFeatures" element={<MemberStatus  />} />
          <Route path="nextedTable" element={<NextedTable  />} />
          <Route path="userSetting" element={<UserSetting  />} />
          <Route path="delegation" element={<Delegation />} /> {/* 新增 delegation 路由 */}
          <Route path="autoOrder" element={<AutoOrder />} />

        </Route>
      </Routes>
    </Router>
  );
}
