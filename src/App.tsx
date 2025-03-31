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

export default function App() {
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
        </Route>
      </Routes>
    </Router>
  );
}
